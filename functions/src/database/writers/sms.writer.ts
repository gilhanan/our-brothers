import { SMSMessage } from '../../../../types/models';
import admin = require('firebase-admin');

export async function create(from: string, id: string, smsMessage: SMSMessage) {
  console.log(`Storing SMS from {${from}} id {${id}} to database`, smsMessage);

  try {
    await admin
      .database()
      .ref(`/sms/replies/${from}/${id}`)
      .set(smsMessage);
  } catch (error) {
    console.error(
      `Failed to store SMS from {${from}} id {${id}} to database.`,
      error
    );

    throw error;
  }

  console.log(
    `Succesfully sotred SMS from {${from}} id {${id}} to database.`,
    smsMessage
  );
}

export async function unsubscribed(phoneNumber: string) {
  console.log(`Unsubscribing phone number {${phoneNumber}}.`);

  try {
    await admin
      .database()
      .ref(`/sms/unsubscribed/${phoneNumber}`)
      .set(true);
  } catch (error) {
    console.error(
      `Failed to unsubscribe phone number {${phoneNumber}}.`,
      error
    );

    throw error;
  }

  console.log(`Succesfully unsubscribe phone number {${phoneNumber}}.`);
}
