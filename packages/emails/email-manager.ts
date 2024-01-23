import mailSender from './mailSender';
import renderEmail from './src/renderEmail';
import { FROM_EMAIL } from './config';

interface OTPVerificationEvent {
  name: string;
  email: string;
  otp: string;
  expire: string;
}

export const sendOTPVarificationEmail = async (otpVerificationEvent: OTPVerificationEvent) => {
  const mailerPayload = {
    from: FROM_EMAIL ?? '',
    to: otpVerificationEvent.email,
    subject: 'Email verification with OTP!',
    html: renderEmail('OTPVerification', {
      name: otpVerificationEvent.name,
      otp: otpVerificationEvent.otp,
      expire: otpVerificationEvent.expire,
    }),
    responseMessage: 'OTP sent successfully!',
  };
  return await mailSender(mailerPayload);
};

interface PasswordConfirmationEvent {
  name: string;
  email: string;
}

export const sendPasswordConfirmationEmail = async (passwordConfirmationEvent: PasswordConfirmationEvent) => {
  const mailerPayload = {
    from: FROM_EMAIL ?? '',
    to: passwordConfirmationEvent.email,
    subject: 'Password confirmation!',
    html: renderEmail('PasswordConfirmation', {
      name: passwordConfirmationEvent.name,
    }),
    responseMessage: 'Password confirmation email sent successfully!',
  };
  return await mailSender(mailerPayload);
};

interface AccountLoginSuccessEvent {
  name: string;
  email: string;
  ip: string | string[];
  time: string;
  browser: string;
}

export const sendAccountLoginSuccessEmail = async (accountLoginSuccessEvent: AccountLoginSuccessEvent) => {
  const mailerPayload = {
    from: FROM_EMAIL ?? '',
    to: accountLoginSuccessEvent.email,
    subject: 'Account login success!',
    html: renderEmail('AccountLoginSuccess', {
      name: accountLoginSuccessEvent.name,
      email: accountLoginSuccessEvent.email,
      ip: accountLoginSuccessEvent.ip,
      browser: accountLoginSuccessEvent.browser,
      time: accountLoginSuccessEvent.time,
    }),
    responseMessage: 'Account login success email sent successfully!',
  };
  return await mailSender(mailerPayload);
};
