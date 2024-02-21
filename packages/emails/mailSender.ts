import { logger } from "@vaultmaster/lib/logger";
import nodemailer from "nodemailer";

import { MODE } from "./../../apps/api/config/index";
import { PASSWORD, USER } from "./config";

const EMAIL_SUCCESS = "Email sent successfully";
const EMAIL_FAILED = "Unable to send email";

type MailSender = {
  from: string;
  to: string;
  subject: string;
  html: string;
  responseMessage: string;
};

async function mailSender(mailerPayload: nodemailer.SendMailOptions & MailSender) {
  return new Promise((resolve, reject) => {
    const isDevMode = MODE === "prod";

    const config = {
      host: isDevMode ? "smtp.gmail.com" : "sandbox.smtp.mailtrap.io",
      port: isDevMode ? 465 : 2525,
      secure: isDevMode,
      auth: { user: USER, pass: PASSWORD },
    };

    const transporter = nodemailer.createTransport(config);

    transporter.sendMail(mailerPayload, (error) => {
      if (error) {
        logger.error("Unable to send mail because =>", error);
        return reject(EMAIL_FAILED);
      } else {
        logger.info(`Email sent: ${mailerPayload.responseMessage}`);
        return resolve(mailerPayload.responseMessage);
      }
    });
  });
}

export default mailSender;
