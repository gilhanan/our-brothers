import * as admin from 'firebase-admin';
import { firebaseAdmin } from '../config';

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdmin as any),
  databaseURL: 'https://our-brothers.firebaseio.com'
});

const db = admin.database();

db.ref('/users').once('value')
  .then((usersSnapshot) => {
    let updates = {};
    let promises = [];
    const users = usersSnapshot.val();
    for (let userId in users) {
      const user = users[userId];
      if (user.profile && !user.lastSignInDate) {
        promises.push(
          admin.auth()
            .getUser(userId)
            .then((userRecord) => {
              updates['/users/' + userId + '/lastSignInDate'] = (new Date(userRecord.metadata.lastSignInTime)).getTime();
            })
        );
      }
    }
    console.log(promises.length + ' users.');
    Promise.all(promises).then(() => {
      return db.ref()
        .update(updates)
        .then(() => {
          console.log('Successfully');
        });
    }).catch((error) => {
      console.error(error);
    });
  }).catch((error) => {
  });