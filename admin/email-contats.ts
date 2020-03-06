import * as admin from 'firebase-admin';
import { firebaseAdmin, mailCredentials } from '../config';
import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: mailCredentials
});

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdmin as any),
  databaseURL: 'https://our-brothers.firebaseio.com'
});

const db = admin.database();

const contactsIds = {
  '-M1XMl7mJlrwW3KPNUJC': true,
  '-M1XMYO6dWG40OD0Ou31': true,
  '-M1XL0dxvYufsMKluovl': true,
  '-M1WDsuSS44apQhFKN2j': true,
  '-M1W0mnaVkpJlHPJS5Ib': true,
  '-M1VcYxfdlkN95ZSK8dv': true,
  '-M1VcEG73MaDsaY188vQ': true,
  '-M1VH4-i8PrxUwuY4roY': true,
  '-M1Uyb9rNrdBpEpB88EY': true,
  '-M1Rw3KZ8R5c-KBqk1pg': true,
  '-M10xT6szsCd5WSdjP30': true,
  '-M0vNTZUX_r_hs6GwL35': true,
  '-M0lwYEjH54kjIHA4zjd': true,
  '-M0lZdPgpbLQxgWDeMRm': true,
  '-M0kpZQmY9AifaH3feRh': true,
  '-M0gnJDhTOvrjQR-5MMN': true,
  '-M0gd4EwJYXYmKAf47Hg': true,
  '-M0XQ14cbj1IKO_XozIh': true,
  '-M0SM5uqh0cGG8zoOcsj': true
};

db.ref('/contacts')
  .once('value')
  .then(contactsSnapshot => {
    const promises = [];

    const contacts = contactsSnapshot.val();

    for (let userId in contacts) {
      const userContacts = contacts[userId];

      for (let contactId in userContacts) {
        if (contactsIds[contactId]) {
          const userContact = userContacts[contactId];

          const mailOptions = buildMail(userContact, contactId, userId);

          promises.push(
            mailTransport
              .sendMail(mailOptions)
              .then(() =>
                console.log(
                  `Successfully sent email for contact id {${contactId}}.`
                )
              )
              .catch(error =>
                console.error(
                  `Failed to send email for contact id {${contactId}}.`,
                  error
                )
              )
          );
        }
      }
    }

    Promise.all(promises)
      .then(() => {
        console.log('Successfully.');
      })
      .catch(error => {
        console.error(error);
      });
  });

function buildMail(contact, contactId, userId): Mail.Options {
  const mailOptions: Mail.Options = {
    from: '"האחים שלנו" <website@ourbrothers.org>',
    to: contact.email,
    cc: 'info@ourbrothers.org',
    bcc: 'ourbrothers.noreply@gmail.com'
  };

  mailOptions.subject =
    'האחים שלנו - ' + contact.subject || 'ללא נושא ' + contactId;
  mailOptions.text =
    'שלום, ' +
    contact.name +
    '.' +
    '\n\n' +
    '.קיבלנו בהצלחה את פניתך ונחזור אליך בהקדם האפשרי';

  if (contact.body) {
    mailOptions.text += '\n\n' + 'תוכן פניתך:' + '\n' + contact.body;
  }

  if (contact.phoneNumber) {
    mailOptions.text += '\n\n' + 'טלפון ליצירת קשר: ' + contact.phoneNumber;
  }

  if (userId !== 'anonymous') {
    mailOptions.text += '\n\n' + 'מזהה משתמש: ' + userId;
  }

  return mailOptions;
}
