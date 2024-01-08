import { sendOTPVarificationEmail } from '@repo/emails';
import { SendVerifyOTPSchemaType } from './authSchema';

type SendVerifyOTP = {
  input: SendVerifyOTPSchemaType;
};

export const sendVerifyOTPController = async ({ input }: SendVerifyOTP) => {
  const email = await sendOTPVarificationEmail({
    name: input.name,
    email: input.email,
    otp: String(input.otp),
  });

  return { success: true, message: 'OTP sent successfully!', email };
};
