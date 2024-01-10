import { TRPCError } from '@trpc/server';
import { sendOTPVarificationEmail } from '@repo/emails';
import { SendVerifyOTPSchemaType } from './authSchema';
import User from '../../models/user';
import { IUser } from '../../models/types';

type SendVerifyOTP = {
  input: SendVerifyOTPSchemaType;
};

// incorrect
export const sendVerifyOTPController = async ({ input }: SendVerifyOTP) => {
  const storedUser = (await User.findOne({ email: input.email })) as IUser;
  if (!storedUser) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found!' });
  }

  const { emailVerification } = storedUser;
  if (!emailVerification?.otp) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'OTP not found!' });
  }

  const currentDateTime = new Date();
  if (emailVerification?.otp_expiry && emailVerification.otp_expiry > currentDateTime) {
    console.log('otp is valid and not expired!');
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'OTP already sent!' });
  }

  const emailResponse = await sendOTPVarificationEmail({
    name: input.name,
    email: input.email,
    otp: String(emailVerification?.otp),
  });

  return { success: true, message: emailResponse };
};
