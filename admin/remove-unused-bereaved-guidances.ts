import * as admin from 'firebase-admin';
import { firebaseAdmin } from '../config';
import { User, BereavedGuidanceGeneral } from '../types/models';

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdmin as any),
  databaseURL: 'https://our-brothers.firebaseio.com'
});

const year = 2020;

const db = admin.database();

db.ref('/users').once('value')
  .then((usersSnapshot) => {
    let updates = {};
    let promises = [];
    const users = usersSnapshot.val();
    for (let userId in users) {
      const user: User = users[userId];
      if (user.bereavedParticipation &&
        user.bereavedParticipation[year] &&
        user.bereavedParticipation[year].guidance &&
        user.bereavedParticipation[year].guidance.general &&
        user.bereavedParticipation[year].guidance.general.length) {

        const oldValue = user.bereavedParticipation[year].guidance.general;

        const newValue = oldValue.filter(g => g in BereavedGuidanceGeneral);

        const path = `/users/${userId}/bereavedParticipation/${year}/guidance/general`;

        console.log(`Updating ${path} from ${oldValue} to ${newValue}`);

        updates[path] = newValue;
      }
    }
    console.log(Object.keys(updates).length + ' updates.');

    return db.ref()
      .update(updates)
      .then(() => {
        console.log('Successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  });