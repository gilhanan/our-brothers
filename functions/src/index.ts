import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

import { Contact } from 'models';
import { mailCredentials } from '../config';

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: mailCredentials,
});

admin.initializeApp();

const app = express();

app.use(cors({ origin: true }));

interface TwilioWebhook {
  Body: string;
  From: string;
  SmsMessageSid: string;
  SmsSid: string;
}

interface ParsedSms {
  from: string;
  body: string;
  timestamp: number;
}

app.post('/sms/reply', (req: express.Request, res: express.Response) => {

  console.log('Storing SMS to database', req.body);

  const body: TwilioWebhook = req.body;

  const { From: smsFrom, Body: smsBody, SmsMessageSid, SmsSid } = body;

  const smsId = SmsMessageSid || SmsSid;

  if (!smsFrom || !smsBody || !smsId) {

    console.warn('Missing SMS from or body or id');

    return res.status(400).send({
      code: 400,
      message: `Missing SMS from or body or id.`
    });

  } else {

    const parsedSmsBody: ParsedSms = {
      from: smsFrom,
      body: smsBody,
      timestamp: Date.now()
    }

    return admin.database()
      .ref(`/sms/replies/${smsFrom}/${smsId}`)
      .set(parsedSmsBody)
      .then(() => res.send({
        code: 200,
        message: 'Susccessfully stored SMS'
      }));
  }
});

export const api = functions.https.onRequest(app);

// ========================= Auth =========================

export const removeUserFromDatabase = functions.auth.user()
  .onDelete((event, context) => {
    console.log(`Deleting user {${event.uid}} from database.`);
    return admin.database().ref(`/users/${event.uid}`).remove()
      .then(() => {
        console.log(`Succesfully deleted user {${event.uid}} from database.`);
      }).catch((error) => {
        console.error(`Failed to delete user {${event.uid}} from database.`, error);
      });
  });

export const addUserToDatabase = functions.auth.user()
  .onCreate((event, context) => {
    const now = Date.now();

    console.log(`Setting user {${event.uid}} registered date {${now}} to database.`);

    return admin.database().ref(`/users/${event.uid}/registered`)
      .set(now)
      .then(() => {
        console.log(`Succesfully set user {${event.uid}} registered date {${now}} to database.`);
      }).catch((error) => {
        console.error(`Failed to set user {${event.uid}} registered date {${now}} to database.`, error);
      });
  });

// ========================= Database =========================

// ============ User Participations ============

export const onParticipateParticipationDelete = functions.database.ref('/users/{userId}/participateParticipation/{year}/meetings/{hostId}/{meetingId}')
  .onDelete((event, context) => {
    const { userId, year, hostId, meetingId } = context.params;

    console.log(`Removing participate {${userId}} from meeting {${meetingId} year {$${year}} of host {${hostId}}.`);
    return admin.database()
      .ref(`eventsParticipates/${year}/${hostId}/${meetingId}/${userId}`)
      .remove()
      .then(() => {
        console.log(`Succesfully removed participate {${userId}} from meeting {${meetingId} year {$${year}} of host {${hostId}}.`);
      }).catch((error) => {
        console.error(`Failed to removed participate {${userId}} from meeting {${meetingId} year {$${year}} of host {${hostId}}.`, error);
      });
  });

export const onBereavedParticipationDelete = functions.database.ref('/users/{userId}/bereavedParticipation/{year}/meetings/{hostId}/{meetingId}')
  .onDelete((event, context) => {
    const { userId, year, hostId, meetingId } = context.params;

    console.log(`Removing bereaved {${userId}} from meeting {${meetingId}} year {$${year}} of host {${hostId}}.`);
    return admin.database()
      .ref(`events/${year}/${hostId}/${meetingId}/bereaved`)
      .remove()
      .then(() => {
        console.log(`Succesfully removed bereaved {${userId}} from meeting {${meetingId} year {$${year}} of host {${hostId}}.`);
      }).catch((error) => {
        console.error(`Failed to removed bereaved {${userId}} from meeting {${meetingId} year {$${year}} of host {${hostId}}.`, error);
      });
  });

export const onHostParticipationDelete = functions.database.ref('/users/{userId}/hostParticipation/{year}/meetings/{meetingId}')
  .onDelete((event, context) => {
    const { userId, year, meetingId } = context.params;

    console.log(`Removing meeting {${meetingId}} year {$${year}} of host {${userId}}.`);
    return admin.database()
      .ref(`events/${year}/${userId}/${meetingId}`)
      .remove()
      .then(() => {
        console.log(`Succesfully removed meeting {${meetingId}} year {$${year}} of host {${userId}}.`);
      }).catch((error) => {
        console.error(`Failed to remove meeting {${meetingId}} year {$${year}} of host {${userId}}.`, error);
      });
  });

// ============ Meetings ============

export const onMeetingCreate = functions.database.ref('/events/{year}/{hostId}/{meetingId}')
  .onCreate((event, context) => {

    const meeting = event.val();

    const { year, hostId, meetingId } = context.params;

    console.log(`Linked meeting {${meetingId}} year {$${year}} of host {${hostId}}.`);

    return admin.database()
      .ref(`/users/${hostId}/hostParticipation/${year}/meetings/${meetingId}`)
      .set({ title: meeting.title })
      .then(() => {
        console.log(`Succesfully linked meeting {${meetingId}} year {$${year}} of host {${hostId}}.`);
      }).catch((error) => {
        console.error(`Failed to link meeting {${meetingId}} year {$${year}} of host {${hostId}}.`, error);
      });
  });

export const onMeetingDelete = functions.database.ref('/events/{year}/{hostId}/{meetingId}')
  .onDelete((event, context) => {

    const { year, hostId, meetingId } = context.params;

    console.log(`Removing meeting {${meetingId}} year {$${year}} of host {${hostId}} from host participation.`);

    return admin.database()
      .ref(`/users/${hostId}/hostParticipation/${year}/meetings/${meetingId}`)
      .remove()
      .then(() => {
        console.log(`Succesfully removed meeting {${meetingId}} year {$${year}} of host {${hostId}} from host participation.`);
      }).catch((error) => {
        console.error(`Failed to remove meeting {${meetingId}} year {$${year}} of host {${hostId}} from host participation.`, error);
      });
  });

// ========================= Volunteer Claims =========================

export const updateUserVolunteer = functions.database.ref('/users/{userId}/isVolunteer')
  .onWrite((event, context) => {

    const { userId } = context.params;
    const volunteer = !!event.after.val();

    console.log(`Setting user {${userId}} volunteering value {${volunteer}} to claims.`);

    return admin.auth().setCustomUserClaims(userId, { volunteer })
      .then(() => {
        console.log(`Succesfully set user {${userId}} volunteering value {${volunteer}} to claims.`);
      }).catch((error) => {
        console.error(`Failed to set user {${userId}} volunteering value {${volunteer}} to claims.`, error);
      });
  });

// ========================= SMS Reply =========================

export const smsReply = functions.database.ref('/sms/replies/{number}/{messageId}')
  .onWrite((event, context) => {

    const { number, messageId } = context.params;

    console.log(`Parsing SMS reply from phone number {${number}}, messageId {${messageId}}.`);

    const messageObject: ParsedSms = event.after.val();

    if (number && messageObject && messageObject.body && messageObject.body.trim() === 'הסר') {
      console.log(`Unsubscribing phone number {${number}}.`)

      return admin.database()
        .ref(`/sms/unsubscribed/${number}`)
        .set(true)
        .then(() => {
          console.log(`Succesfully unsubscribe phone number {${number}}.`);
        }).catch((error) => {
          console.error(`Failed to unsubscribe phone number {${number}}.`, error);
        });
    }

    console.log(`Done parsing SMS reply from phone number {${number}}, messageId {${messageId}}.`, messageObject);

    return true;
  });

// ========================= Contact =========================

export const onUserContactCreate = functions.database.ref('/contacts/{userId}/{contactId}')
  .onCreate((event, context) => {

    const contact: Contact = event.val();

    const { email, name, subject } = contact;

    const { userId, contactId } = context.params;

    if (!(email && name && subject)) {

      console.warn(`Missing requirement fields for contact id {${contactId}}. email {${email}}. name {${name}} subject {${subject}}`)

      return false;

    } else {

      const mailOptions = buildMail(contact, userId);

      console.log(`Sending email for contact id {${contactId}}.`);

      return mailTransport.sendMail(mailOptions)
        .then(() => console.log(`Successfully sent email for contact id {${contactId}}.`))
        .catch((error) => console.error(`Failed to send email for contact id {${contactId}}.`, error));
    }
  });

// ========================= Utils =========================

function buildMail(contact: Contact, userId: string): Mail.Options {
  const mailOptions: Mail.Options = {
    from: '"האחים שלנו" <website@ourbrothers.org>',
    to: contact.email,
    cc: 'info@ourbrothers.org'
  };

  mailOptions.subject = 'האחים שלנו - ' + contact.subject;
  mailOptions.text = 'שלום, ' + contact.name + '.' + '\n\n' + '.קיבלנו בהצלחה את פניתך ונחזור אליך בהקדם האפשרי';

  if (contact.body) {
    mailOptions.text += '\n\n' + 'תוכן פניתך:' + '\n' + contact.body;
  }

  if (contact.phoneNumber) {
    mailOptions.text += '\n\n' + 'טלפון ליצירת קשר: ' + contact.phoneNumber;
  }

  if (userId) {
    mailOptions.text += '\n\n' + 'מזהה משתמש: ' + userId;
  }

  return mailOptions
}
