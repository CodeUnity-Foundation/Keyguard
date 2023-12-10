import nodemailer from 'nodemailer';
import { logger } from './logger';
import { EMAIL, EMAIL_PASSWORD } from '../config';
import { EMAIL_FAILED, EMAIL_SUCCESS } from '../constants';

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
        logger.error(error);
        return reject(EMAIL_FAILED);
      } else {
        logger.error(`Email sent: ${EMAIL_SUCCESS}`);
        return resolve(EMAIL_SUCCESS);
      }
    });
  });
}

export default mailSender;
