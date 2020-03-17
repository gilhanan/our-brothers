import * as express from 'express';
import { SMSMessage } from '../../../types/models';
import * as smsWriter from '../database/writers/sms.writer';

interface TwilioWebhook {
  Body: string;
  From: string;
  SmsMessageSid: string;
  SmsSid: string;
}

export async function postReplySms(
  req: express.Request,
  res: express.Response
) {
  const {
    From: from,
    Body: body,
    SmsMessageSid,
    SmsSid
  } = req.body as TwilioWebhook;

  const id = SmsMessageSid || SmsSid;

  if (!from || !body || !id) {
    console.warn('Missing SMS from or body or id');

    return res.status(400).send();
  }

  console.log('Storing SMS to database', req.body);

  const smsMessage: SMSMessage = {
    body,
    date: Date.now()
  };

  try {
    await smsWriter.create(from, id, smsMessage);
  } catch (error) {
    return res.status(500).send();
  }
  return res.status(200).send();
}
