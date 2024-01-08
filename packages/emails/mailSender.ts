import nodemailer from 'nodemailer';
import { logger } from '@vaultmaster/lib/logger';
import { MODE } from './../../apps/server/config/index';
import { EMAIL, EMAIL_PASSWORD } from './config';

const EMAIL_SUCCESS = 'Email sent successfully';
const EMAIL_FAILED = 'Unable to send email';

async function mailSender(mailerPayload: nodemailer.SendMailOptions) {
  return new Promise((resolve, reject) => {
    const isDevMode = MODE === 'dev';

    const config = {
      host: isDevMode ? 'smtp.gmail.com' : 'sandbox.smtp.mailtrap.io',
      port: isDevMode ? 465 : 2525,
      secure: isDevMode,
      auth: { user: EMAIL, pass: EMAIL_PASSWORD },
    };

    const transporter = nodemailer.createTransport(config);

    transporter.sendMail(mailerPayload, (error) => {
      if (error) {
        logger.error('Unable to send mail because =>', error);
        return reject(EMAIL_FAILED);
      } else {
        logger.info(`Email sent: ${EMAIL_SUCCESS}`);
        return resolve(EMAIL_SUCCESS);
      }
    });
  });
}

export default mailSender;
