import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const removeUserFromDatabase = functions.auth.user()
  .onDelete((event, context) => {
    console.log('Deleting user ' + event.uid + ' from database.');
    return admin.database().ref('/users/' + event.uid).remove();
  });

export const addUserToDatabase = functions.auth.user()
  .onCreate((event, context) => {
    console.log('Setting user ' + event.uid + ' registered date to database.');
    return admin.database().ref('/users/' + event.uid + '/registered')
      .set(Date.now());
  });
