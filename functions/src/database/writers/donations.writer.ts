import { Donation, ServerDonation } from '../../../../types/models';
import { admin } from '../../services/firebase-admin';

export async function create(donation: ServerDonation) {
  console.log(
    `Saving donation id {${donation.donationId}} to database.`,
    donation
  );

  const path = donation.userId ? `users/${donation.userId}` : 'anonymous';

  try {
    await admin
      .database()
      .ref(`/donations/${path}/${donation.donationId}`)
      .push({
        amount: donation.amount,
        date: donation.date
      } as Donation);
  } catch (error) {
    console.error(
      `Failed to save donation id {${donation.donationId}} to database.`,
      error
    );

    throw error;
  }

  console.log(
    `Succesfully saved donation id {${donation.donationId}} to database.`
  );
}
