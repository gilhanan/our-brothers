import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

import { Contact, MeetingBereaved, Meeting, MeetingParticipate, ParticipateParticipationMeeting, UserParticipationMeeting, PayPalOrder } from '../../types/models';
import { mailCredentials } from '../config';
import payPalClient from './paypal-client';

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


// ========================= API =========================

app.post('/order/capture', async (req: express.Request, res: express.Response) => {

  const { orderId, amount, userId, payerId } = req.body as PayPalOrder;

  if (!orderId) {

    console.warn('Missing order id.');

    return res.status(400).send({
      code: 400,
      message: 'Missing order id. Please add order id: {"orderId": "ABCDEF"}.'
    });
  }

  if (!amount) {

    console.warn('Missing amount value.');

    return res.status(400).send({
      code: 400,
      message: 'Missing amount value. Please add amount value: {"amount": "220.00"}.'
    });
  }

  console.log(`Generating Orders API request for order id {${orderId}}, amount {${amount}}, user id {${userId}}, payer id {${payerId}}.`);

  const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

  let order;
  try {
    order = await payPalClient().execute(request);
  } catch (error) {

    console.error('Failed to execute orders request.', error);

    return res.status(500).send({
      code: 500,
      message: 'Failed to execute orders request.'
    });

  }

  if (order.result.purchase_units[0].amount.value !== amount) {
    return res.status(400).send({
      code: 400,
      message: `Wrong amout value ${amount}.`
    });
  }

  console.log(`Saving order id {${orderId}}, amount {${amount}}, user id {${userId}}, payer id {${payerId}} to database.`);

  const path = userId ? `users/${userId}` : 'anonymous';

  try {
    await admin.database().ref(`/donations/${path}`).push({
      payerId,
      orderId,
      amount
    } as PayPalOrder);
  } catch (error) {

    console.error(`Failed to save order id {${orderId}}, amount {${amount}}, user id {${userId}}, payer id {${payerId}} to database.`, error);

    return res.status(500).send({
      code: 500,
      message: 'Failed to save order to database.'
    });
  }

  console.log(`Successfully saved order id {${orderId}}, amount {${amount}}, user id {${userId}}, payer id {${payerId}} to database.`);

  return res.status(200).send({
    code: 200,
    message: `Successfully saved order id {${orderId}}, amount {${amount}}, user id {${userId}}, payer id {${payerId}} to database.`
  });
});

app.post('/sms/reply', async (req: express.Request, res: express.Response) => {

  const body: TwilioWebhook = req.body;

  const { From: smsFrom, Body: smsBody, SmsMessageSid, SmsSid } = body;

  const smsId = SmsMessageSid || SmsSid;

  if (!smsFrom || !smsBody || !smsId) {

    console.warn('Missing SMS from or body or id');

    return res.status(400).send('Missing SMS from or body or id.');

  }

  console.log('Storing SMS to database', req.body);

  const parsedSmsBody: ParsedSms = {
    from: smsFrom,
    body: smsBody,
    timestamp: Date.now()
  }

  try {
    await admin.database()
      .ref(`/sms/replies/${smsFrom}/${smsId}`)
      .set(parsedSmsBody)
  } catch (error) {

    console.log('Failed to store SMS to database.', error);

    return res.status(500).send('Failed to store SMS to database.');
  }

  return res.status(200).send('Susccessfully stored SMS');
});

export const api = functions.region('europe-west1').https.onRequest(app);

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

// ============ Donations============

export const onDonationCreate = functions.database.ref('/donations/users/{userId}/{donationId}')
  .onCreate((event, context) => {

    const donation: PayPalOrder = event.val();

    const { userId, donationId } = context.params;

    console.log(`Linking donation {${donationId}} user {${userId}}.`, donation);

    return admin.database()
      .ref(`/users/${userId}/donations/${donationId}`)
      .set(donation)
      .then(() => {
        console.log(`Succesfully linked donation {${donationId}} user {${userId}}.`, donation);
      }).catch((error) => {
        console.error(`Failed to link donation {${donationId}} user {${userId}}.`, error);
      });
  });

// ============ User Participations ============

export const onParticipateParticipationDelete = functions.database.ref('/users/{userId}/participateParticipation/{year}/meetings/{hostId}/{meetingId}')
  .onDelete((event, context) => {
    const { userId, year, hostId, meetingId } = context.params;

    console.log(`Removing participate {${userId}} from meeting {${meetingId} year {$${year}} host {${hostId}}.`);
    return admin.database()
      .ref(`eventsParticipates/${year}/${hostId}/${meetingId}/${userId}`)
      .remove()
      .then(() => {
        console.log(`Succesfully removed participate {${userId}} from meeting {${meetingId} year {$${year}} host {${hostId}}.`);
      }).catch((error) => {
        console.error(`Failed to removed participate {${userId}} from meeting {${meetingId} year {$${year}} host {${hostId}}.`, error);
      });
  });

export const onBereavedParticipationDelete = functions.database.ref('/users/{userId}/bereavedParticipation/{year}/meetings/{hostId}/{meetingId}')
  .onDelete((event, context) => {
    const { userId, year, hostId, meetingId } = context.params;

    console.log(`Removing bereaved {${userId}} from meeting {${meetingId}} year {$${year}} host {${hostId}}.`);
    return admin.database()
      .ref(`events/${year}/${hostId}/${meetingId}/bereaved`)
      .remove()
      .then(() => {
        console.log(`Succesfully removed bereaved {${userId}} from meeting {${meetingId} year {$${year}} host {${hostId}}.`);
      }).catch((error) => {
        console.error(`Failed to removed bereaved {${userId}} from meeting {${meetingId} year {$${year}} host {${hostId}}.`, error);
      });
  });

export const onHostParticipationDelete = functions.database.ref('/users/{userId}/hostParticipation/{year}/meetings/{meetingId}')
  .onDelete((event, context) => {
    const { userId, year, meetingId } = context.params;

    console.log(`Removing meeting {${meetingId}} year {$${year}} host {${userId}}.`);
    return admin.database()
      .ref(`events/${year}/${userId}/${meetingId}`)
      .remove()
      .then(() => {
        console.log(`Succesfully removed meeting {${meetingId}} year {$${year}} host {${userId}}.`);
      }).catch((error) => {
        console.error(`Failed to remove meeting {${meetingId}} year {$${year}} host {${userId}}.`, error);
      });
  });

// ============ Meetings ============

export const onMeetingCreate = functions.database.ref('/events/{year}/{hostId}/{meetingId}')
  .onCreate((event, context) => {

    const meeting = event.val();

    const { year, hostId, meetingId } = context.params;

    const hostParticipationMeeting: UserParticipationMeeting = {
      title: meeting.title
    }

    console.log(`Linking meeting {${meetingId}} year {$${year}} host {${hostId}}.`, hostParticipationMeeting);

    return admin.database()
      .ref(`/users/${hostId}/hostParticipation/${year}/meetings/${meetingId}`)
      .set(hostParticipationMeeting)
      .then(() => {
        console.log(`Succesfully linked meeting {${meetingId}} year {$${year}} host {${hostId}}.`);
      }).catch((error) => {
        console.error(`Failed to link meeting {${meetingId}} year {$${year}} host {${hostId}}.`, error);
      });
  });

export const onMeetingDelete = functions.database.ref('/events/{year}/{hostId}/{meetingId}')
  .onDelete((event, context) => {

    const { year, hostId, meetingId } = context.params;

    console.log(`Removing meeting {${meetingId}} year {$${year}} host {${hostId}} from host participation.`);

    return admin.database()
      .ref(`/users/${hostId}/hostParticipation/${year}/meetings/${meetingId}`)
      .remove()
      .then(() => {
        console.log(`Succesfully removed meeting {${meetingId}} year {$${year}} host {${hostId}} from host participation.`);

        console.log(`Removing meeting {${meetingId}} year {$${year}} host {${hostId}} participates.`);

        return admin.database()
          .ref(`/eventsParticipates/${year}/${hostId}/${meetingId}`)
          .remove()
          .then(() => {

            console.log(`Succesfully removed meeting {${meetingId}} year {$${year}} host {${hostId}} participates.`);

          }).catch((error) => {

            console.error(`Failed to remove meeting {${meetingId}} year {$${year}} host {${hostId}} participates.`, error);

          });

      }).catch((error) => {
        console.error(`Failed to remove meeting {${meetingId}} year {$${year}} host {${hostId}} from host participation.`, error);
      });
  });

export const onMeetingBereavedWrite = functions.database.ref('/events/{year}/{hostId}/{meetingId}/bereaved')
  .onWrite((event, context) => {
    const { year, hostId, meetingId } = context.params;

    if (event.after.exists()) {

      const bereavedParticipation: MeetingBereaved = event.after.val();

      const bereavedId = bereavedParticipation.id;

      if (!bereavedId) {

        throw new Error(`Meeting {${meetingId}} year {$${year}} host {${hostId}} bereaved id was not found.`);

      } else {

        console.log(`Getting meeting {${meetingId}} year {$${year}} host {${hostId}}.`);

        return event.after.ref.parent?.once('value').then(meetingSnapshot => {

          const meeting: Meeting = meetingSnapshot.val();

          if (!meeting.title) {

            throw new Error(`Failed to get meeting {${meetingId}} year {$${year}} host {${hostId}}.`);

          } else {

            console.log(`Successfully got meeting {${meetingId}} year {$${year}} host {${hostId}}.`);

            const bereavedParticipationMeeting: UserParticipationMeeting = {
              title: meeting.title
            }

            console.log(`Linking meeting {${meetingId}} year {$${year}} host {${hostId}} to bereaved {${bereavedParticipation.id}}`, bereavedParticipationMeeting);

            return admin.database()
              .ref(`/users/${bereavedId}/bereavedParticipation/${year}/meetings/${hostId}/${meetingId}`)
              .set(bereavedParticipationMeeting).then(() => {

                console.log(`Successfully linked meeting {${meetingId}} year {$${year}} host {${hostId}} to bereaved {${bereavedParticipation.id}}`);

              }).catch((error) => {

                console.error(`Failed to link meeting {${meetingId}} year {$${year}} host {${hostId}} to bereaved {${bereavedParticipation.id}}`, error);

              });
          }
        })
      }

    } else {

      const bereavedParticipation: MeetingBereaved = event.before.val();

      const bereavedId = bereavedParticipation.id;

      console.log(`Removing bereaved {${bereavedId}} from meeting {${meetingId}} year {$${year}} host {${hostId}}.`);
      return admin.database()
        .ref(`/users/${bereavedId}/bereavedParticipation/${year}/meetings/${hostId}/${meetingId}`)
        .remove()
        .then(() => {
          console.log(`Succesfully removed bereaved {${bereavedId}} from meeting {${meetingId} year {$${year}} host {${hostId}}.`);
        }).catch((error) => {
          console.error(`Failed to removed bereaved {${bereavedId}} from meeting {${meetingId} year {$${year}} host {${hostId}}.`, error);
        });
    }
  })

// ========================= Meetings Participates =========================

export const onEventParticipatesWrite = functions.database.ref('/eventsParticipates/{year}/{hostId}/{meetingId}')
  .onWrite((event, context) => {

    const { year, hostId, meetingId } = context.params;

    console.log(`Getting meeting {${meetingId}} year {$${year}} host {${hostId}}.`);

    return admin.database()
      .ref(`/events/${year}/${hostId}/${meetingId}`)
      .once('value')
      .then((meetingSnapshot) => {

        console.log(`Succesfully got meeting {${meetingId}} year {$${year}} host {${hostId}}.`);

        if (!meetingSnapshot.exists()) {

          console.log(`Meeting {${meetingId}} year {$${year}} host {${hostId}} is not exists, no need to caluclate participates count.`);

          return;

        } else {
          console.log(`Meeting {${meetingId}} year {$${year}} host {${hostId}} is exists, caluclating participates count.`);

          console.log(`Calculating meeting {${meetingId}} year {$${year}} host {${hostId}} participates count.`);

          const participateParticipations: { [userId: string]: MeetingParticipate } = event.after.val() || {};

          const count = calcParticipatesCount(participateParticipations);

          console.log(`Updating meeting {${meetingId}} year {$${year}} host {${hostId}} count to: ${count}.`);

          return admin.database()
            .ref(`/events/${year}/${hostId}/${meetingId}/count`)
            .set(count).then(() => {

              console.log(`Succesfully updated meeting {${meetingId}} year {$${year}} host {${hostId}} count to: ${count}.`);

            }).catch((error) => {

              console.error(`Failed to update meeting {${meetingId}} year {$${year}} host {${hostId}} count to: ${count}.`, error);

            });

        }

      }).catch((error) => {
        console.error(`Failed to get meeting {${meetingId}} year {$${year}} host {${hostId}}.`, error);
      });
  });

export const onEventParticipatesParticipationWrite = functions.database.ref('/eventsParticipates/{year}/{hostId}/{meetingId}/{participateId}')
  .onWrite((event, context) => {

    const { year, hostId, meetingId, participateId } = context.params;

    if (event.after.exists()) {

      const participateParticipation: ParticipateParticipationMeeting = event.after.val();

      console.log(`Getting meeting {${meetingId}} year {$${year}} host {${hostId}}, in order to link meeting to participate id {${participateId}}.`);

      return admin.database()
        .ref(`/events/${year}/${hostId}/${meetingId}`)
        .once('value')
        .then((meetingSnapshot) => {
          if (!meetingSnapshot.exists()) {

            throw new Error(`Meeting {${meetingId}} year {$${year}} host {${hostId}} is not exists, failed to link participate id {${participateId}} to meeting.`);

          } else {

            const meeting: Meeting = meetingSnapshot.val();

            console.log(`Succesfully got meeting {${meetingId}} year {$${year}} host {${hostId}}.`);

            const participateParticipationMeeting: ParticipateParticipationMeeting = {
              title: meeting.title,
              accompanies: participateParticipation.accompanies
            };

            console.log(`Linking user id {${participateId}} to meeting {${meetingId}} year {$${year}} host {${hostId}}.`, participateParticipation);

            return admin.database()
              .ref(`/users/${participateId}/participateParticipation/${year}/meetings/${hostId}/${meetingId}`)
              .set(participateParticipationMeeting).then(() => {

                console.log(`Succesfully linked meeting {${meetingId}} year {$${year}} host {${hostId}} to participate id ${participateId}.
                Meeting title {${meeting.title}} accompanies {${participateParticipation.accompanies}}`);

              }).catch((error) => {

                console.error(`Failed to link meeting {${meetingId}} year {$${year}} host {${hostId}} to participate id ${participateId}.
                Meeting title {${meeting.title}} accompanies {${participateParticipation.accompanies}}`, error);

              });

          }
        });

    } else {

      console.log(`Removing meeting {${meetingId}} year {$${year}} host {${hostId}} from participate id {${participateId}}.`);

      return admin.database()
        .ref(`/users/${participateId}/participateParticipation/${year}/meetings/${hostId}/${meetingId}`)
        .remove()
        .then(() => {

          console.log(`Succesfully removed meeting {${meetingId}} year {$${year}} host {${hostId}} from participate id {${participateId}}.`);

        }).catch((error) => {

          console.error(`Failed to remove meeting {${meetingId}} year {$${year}} host {${hostId}} from participate id {${participateId}}.`, error);

        });
    }
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

function calcParticipatesCount(participates: { [userId: string]: MeetingParticipate }): number {
  return Object.keys(participates)
    .map((id) => participates[id])
    .reduce((acc, participation) => acc + 1 + (participation.accompanies || 0), 0)
}
