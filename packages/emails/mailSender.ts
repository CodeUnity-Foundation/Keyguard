import nodemailer from 'nodemailer';
import { logger } from '@vaultmaster/lib/logger';
import { EMAIL, EMAIL_PASSWORD } from './config';

const EMAIL_SUCCESS = 'Email sent successfully';
const EMAIL_FAILED = 'Unable to send email';

async function mailSender(mailerPayload: nodemailer.SendMailOptions) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

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
