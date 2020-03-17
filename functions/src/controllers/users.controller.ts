import * as express from 'express';
import { admin } from '../services/firebase-admin';
import * as usersWriter from '../database/writers/users.writer';

export async function deleteUser(req: express.Request, res: express.Response) {
  const { userId } = req.params;

  if (!req.user?.admin) {
    console.warn(
      `Unauthorized deleting request user id {${userId}} for admin id {${req.user?.user_id}}.`
    );
    return res.status(403).send();
  }

  console.log(
    `Deleting user id {${userId}} for admin id {${req.user?.user_id}}.`
  );

  try {
    await admin.auth().deleteUser(userId);

    console.log(
      `Susccessfully deleted user id {${userId}} for admin id {${req.user?.user_id}}.`
    );
  } catch (error) {
    if (error && error.code === 'auth/user-not-found') {
      console.warn(`User id {${userId}} were not found.`, error);
    } else {
      console.error(
        `Failed to delete user id {${userId}} for admin id {${req.user?.user_id}}.`,
        error
      );
      return res.status(500).send();
    }
  }

  await usersWriter.remove(userId);

  return res.status(200).send();
}
