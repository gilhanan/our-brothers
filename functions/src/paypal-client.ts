const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

import { paypalCredentials } from '../../config';

function environment() {
    const clientId = paypalCredentials.client;
    const clientSecret = paypalCredentials.secret;

    return new checkoutNodeJssdk.core.LiveEnvironment(
        clientId, clientSecret
    );
}

export default function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}