const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

import { paypalCredentials } from '../../../config';

export async function verifyDonation(
  donationId: string,
  amount: string
): Promise<boolean> {
  console.log(`Verifying donation id {${donationId}}, amount {${amount}}.`);

  const request = new checkoutNodeJssdk.orders.OrdersGetRequest(donationId);

  let donation;
  try {
    donation = await client().execute(request);
  } catch (error) {
    console.error(
      `Failed to execute orders get request for donation id {${donationId}}, amount {${amount}}.`,
      error
    );

    throw error;
  }

  if (donation.result.purchase_units[0].amount.value !== amount) {
    return false;
  }

  return true;
}

function environment() {
  const clientId = paypalCredentials.client;
  const clientSecret = paypalCredentials.secret;

  return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}
