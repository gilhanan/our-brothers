import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

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
