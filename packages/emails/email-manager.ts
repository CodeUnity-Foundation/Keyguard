import { EMAIL } from './config';
import mailSender from './mailSender';
import renderEmail from './src/renderEmail';

interface IOTPVerificationEvent {
  email: string;
  otp: string;
}

export const sendOTPVarificationEmail = async (otpVerificationEvent: IOTPVerificationEvent) => {
  const mailerPayload = {
    from: EMAIL,
    to: otpVerificationEvent.email,
    subject: 'Email verification with OTP!',
    html: renderEmail('OTPVerification', { otp: otpVerificationEvent.otp }),
  };
  return await mailSender(mailerPayload);
};
