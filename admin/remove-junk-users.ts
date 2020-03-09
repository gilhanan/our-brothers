import * as admin from 'firebase-admin';
import { firebaseAdmin } from '../config';

admin.initializeApp({
    credential: admin.credential.cert(firebaseAdmin as any),
    databaseURL: 'https://our-brothers.firebaseio.com'
});

const db = admin.database();

db.ref('/users').once('value')
    .then((usersSnapshot) => {
        const promises = [];
        const deletePromises = [];

        const users = usersSnapshot.val();
        for (let userId in users) {
            const user = users[userId];
            let deleteUser = false;

            promises.push(new Promise(async (resolve, reject) => {
                deleteUser = deleteUser || (user?.profile?.firstName?.includes('בדיקה') || user?.profile?.lastName?.includes('בדיקה'));
                deleteUser = deleteUser || (user?.profile?.firstName?.includes('asd') || user?.profile?.lastName?.includes('asd'));
                deleteUser = deleteUser || (user?.profile?.firstName?.includes('qwe') || user?.profile?.lastName?.includes('qwe'));
                deleteUser = deleteUser || (user?.profile?.firstName?.includes('שדג') || user?.profile?.lastName?.includes('שדג'));

                deleteUser = deleteUser && !userId.startsWith('-');

                try {
                    await admin.auth().getUser(userId)
                } catch (error) {
                    if (error.code === 'auth/user-not-found') {
                        deleteUser = true;
                    }
                }

                if (deleteUser) {
                    deletePromises.push(admin.auth().deleteUser(userId).catch(() => { }));
                    deletePromises.push(db.ref(`users/${userId}`).remove().catch(() => { }));
                }

                resolve();
            }));
        }

        return Promise.all(promises)
            .then(() => {
                console.log(`${deletePromises.length / 2} users will be delete`);
                Promise.all(deletePromises).then(() => {
                    console.log('Successfully');
                });
            });
    });
