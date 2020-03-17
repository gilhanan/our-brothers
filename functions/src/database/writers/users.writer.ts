import { admin } from '../../services/firebase-admin';
import { Donation } from '../../../../types/models';

export async function remove(userId: string) {
  console.log(`Removing user {${userId}} from database.`);

  try {
    await admin
      .database()
      .ref(`/users/${userId}`)
      .remove();

    console.log(`Succesfully removed user {${userId}} from database.`);
  } catch (error) {
    console.error(`Failed to remove user {${userId}} from database.`, error);
  }
}

export async function setRegisteredDate(userId: string, date: number) {
  console.log(
    `Setting user {${userId}} registered date {${date}} to database.`
  );

  try {
    await admin
      .database()
      .ref(`/users/${userId}/registered`)
      .set(date);
  } catch (error) {
    console.error(
      `Failed to set user {${userId}} registered date {${date}} to database.`,
      error
    );

    throw error;
  }

  console.log(
    `Succesfully set user {${userId}} registered date {${date}} to database.`
  );
}

export async function linkDonation(
  userId: string,
  donationId: string,
  donation: Donation
) {
  console.log(
    `Linking donation id {${donationId}} to user id {${userId}}.`,
    donation
  );

  try {
    await admin
      .database()
      .ref(`/users/${userId}/donations/${donationId}`)
      .set(donation);
  } catch (error) {
    console.error(
      `Failed to link donation {${donationId}} user id {${userId}}.`,
      error
    );

    throw error;
  }
}
