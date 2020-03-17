import * as functions from 'firebase-functions';
import { Donation } from '../../../../types/models';
import * as usersWriter from '../writers/users.writer';

export const onDonationCreate = functions.database
  .ref('/donations/users/{userId}/{donationId}')
  .onCreate(async (event, context) => {
    const donation: Donation = event.val();

    const { userId, donationId } = context.params;

    return usersWriter.linkDonation(userId, donationId, donation);
  });
