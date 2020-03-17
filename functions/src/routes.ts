import * as express from 'express';

import { admin } from './services/firebase-admin';

import * as donationsController from './controllers/donations.controller';
import * as smsController from './controllers/sms.controller';
import * as usersController from './controllers/users.controller';

const router = express.Router();

router.route('/donation').post(donationsController.postDonation);
router.route('/sms/reply').post(smsController.postReplySms);
router
  .route('/user/:userId')
  .delete(validateFirebaseIdToken, usersController.deleteUser);

export default router;

async function validateFirebaseIdToken(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    console.warn('Unauthorized request.');
    return res.status(403).send();
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.warn('Unauthorized request.');
    return res.status(403).send();
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken as any;
    return next();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    return res.status(403).send();
  }
}
