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
