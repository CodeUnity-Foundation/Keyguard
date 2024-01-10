import mailSender from './mailSender';
import renderEmail from './src/renderEmail';
import { FROM_EMAIL } from './config';

interface IOTPVerificationEvent {
  name: string;
  email: string;
  otp: string;
}

export const sendOTPVarificationEmail = async (otpVerificationEvent: IOTPVerificationEvent) => {
  const mailerPayload = {
    from: FROM_EMAIL ?? '',
    to: otpVerificationEvent.email,
    subject: 'Email verification with OTP!',
    html: renderEmail('OTPVerification', {
      name: otpVerificationEvent.name,
      otp: otpVerificationEvent.otp,
    }),
    responseMessage: 'OTP sent successfully!',
  };
  return await mailSender(mailerPayload);
};
