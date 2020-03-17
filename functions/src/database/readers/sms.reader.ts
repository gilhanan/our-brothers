import * as functions from 'firebase-functions';
import { SMSMessage } from '../../../../types/models';
import { admin } from '../../services/firebase-admin';

export const onSMSMessageCreated = functions.database
  .ref('/sms/replies/{number}/{messageId}')
  .onCreate(async (event, context) => {
    const { number, messageId } = context.params;

    const messageObject: SMSMessage = event.val();

    console.log(
      `Parsing SMS reply from phone number {${number}}, messageId {${messageId}}.`,
      messageObject
    );

    if (number && messageObject?.body?.trim() === 'הסר') {
      console.log(`Unsubscribing phone number {${number}}.`);

      try {
        await admin
          .database()
          .ref(`/sms/unsubscribed/${number}`)
          .set(true);
      } catch (error) {
        console.error(`Failed to unsubscribe phone number {${number}}.`, error);

        throw error;
      }

      console.log(`Succesfully unsubscribe phone number {${number}}.`);
    }
  });
