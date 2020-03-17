import * as express from 'express';

import { ClientDonation } from '../../../types/models';
import * as paypalService from '../services/paypal.service';
import * as donationsWriter from '../database/writers/donations.writer';

export async function postDonation(req: express.Request, res: express.Response) {
  const { donationId, amount, userId, payerId } = req.body as ClientDonation;

  if (!donationId) {
    console.warn('Missing donationId.');

    return res.status(400).send({
      code: 400,
      message:
        'Missing donationId. Please add donationId: {"donationId": "ABCDEF"}.'
    });
  }

  if (!amount) {
    console.warn('Missing amount.');

    return res.status(400).send({
      code: 400,
      message: 'Missing amount. Please add amount: {"amount": "220.00"}.'
    });
  }

  console.log(
    `Verifying donation id {${donationId}} amount {${amount}} user id {${userId}} payer id {${payerId}}.`
  );

  let verified: boolean;
  try {
    verified = await paypalService.verifyDonation(donationId, amount);
  } catch (error) {
    return res.status(500).send({
      code: 500,
      message: 'Failed to execute donates request.'
    });
  }

  if (!verified) {
    return res.status(400).send({
      code: 400,
      message: `Wrong amout value for donation id {${donationId}} amount {${amount}} user id {${userId}} payer id {${payerId}}.`
    });
  }

  try {
    await donationsWriter.create({
      donationId,
      amount,
      userId,
      payerId,
      date: Date.now()
    });
  } catch (error) {
    return res.status(500).send({
      code: 500,
      message: `Failed to save donation id {${donationId}} amount {${amount}} user id {${userId}} payer id {${payerId}} to database.`
    });
  }

  return res.status(200).send({
    code: 200,
    message: `Successfully saved donation id {${donationId}} amount {${amount}} user id {${userId}} payer id {${payerId}} to database.`
  });
}
