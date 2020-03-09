import * as admin from 'firebase-admin';
import { firebaseAdmin } from '../config';

admin.initializeApp({
    credential: admin.credential.cert(firebaseAdmin as any),
    databaseURL: 'https://our-brothers.firebaseio.com'
});


// const email = 'noyaperryf@gmail.com';
// const email = 'roni@ourbrothers.org';
const email = 'gil.hanan@gmail.com';
admin.auth().getUserByEmail(email).then((user) => admin.auth()
    .setCustomUserClaims(user.uid, {
        admin: true,
        volunteer: true
    })).then((result) => {
        console.log('Set ' + email + ' admin successfully');
    })
    .catch((error) => {
        console.log(error);
    });
