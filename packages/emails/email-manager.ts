import { EMAIL } from './config';
import mailSender from './mailSender';
import renderEmail from './src/renderEmail';

interface IOTPVerificationEvent {
  name: string;
  email: string;
  otp: string;
}

export const sendOTPVarificationEmail = async (otpVerificationEvent: IOTPVerificationEvent) => {
  const mailerPayload = {
    from: EMAIL,
    to: otpVerificationEvent.email,
    subject: 'Email verification with OTP!',
    html: renderEmail('OTPVerification', {
      name: otpVerificationEvent.name,
      otp: otpVerificationEvent.otp,
    }),
  };
  return await mailSender(mailerPayload);
};
