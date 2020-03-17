import * as functions from 'firebase-functions';
import * as usersWriter from '../writers/users.writer';

export const onAuthUserCreate = functions.auth
  .user()
  .onCreate((event, context) => {
    return usersWriter.setRegisteredDate(event.uid, Date.now());
  });

export const onAuthUserDelete = functions.auth
  .user()
  .onDelete((event, context) => {
    return usersWriter.remove(event.uid);
  });
