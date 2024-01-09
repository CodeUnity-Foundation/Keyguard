import { TRPCError } from '@trpc/server';
import { OTPSchemaType } from './authSchema';
import User from '../../models/user';

type VerifyOTPProps = {
  input: OTPSchemaType;
};

export const verifyOTPController = async ({ input }: VerifyOTPProps) => {
  const { email, otp } = input;

  const storedUser = await User.findOne({ email }).select(
    '-password -createdAt -updatedAt -deletedAt -__v',
  );

  if (!storedUser) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'User does not exist!' });
  }

  let { emailVerification } = storedUser;
  if (!emailVerification) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'OTP not found!' });
  }

  const { otp: storedOTP, otp_expiry: storedOTPExpiry } = emailVerification;
  if (otp !== storedOTP) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid OTP!' });
  } else if (storedOTPExpiry) {
    const currentTime = new Date();
    if (currentTime > storedOTPExpiry) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'OTP expired!' });
    }
  }
  storedUser.is_verified = true;
  storedUser.emailVerification = null;
  await storedUser.save();

  return { success: true, message: 'OTP verified successfully' };
};
