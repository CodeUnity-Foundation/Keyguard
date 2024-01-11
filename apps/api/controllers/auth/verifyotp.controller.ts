import { TRPCError } from '@trpc/server';
import { OTPSchemaType } from './authSchema';
import User from '../../models/user';
import { verifyOTPTimeLimit } from '../../utils/constant';

type VerifyOTPProps = {
  input: OTPSchemaType;
};

export const verifyOTPController = async ({ input }: VerifyOTPProps) => {
  const { email, otp } = input;

  const user = await User.findOne({ email }).select('-password -createdAt -updatedAt -deletedAt -__v');

  if (!user) throw new TRPCError({ code: 'BAD_REQUEST', message: 'User does not exist!' });

  let { emailVerification } = user;

  if (!emailVerification) throw new TRPCError({ code: 'NOT_FOUND', message: 'OTP not found!' });

  const { otp: storedOTP, otp_expiry: storedOTPExpiry } = emailVerification;

  if (verifyOTPTimeLimit(storedOTPExpiry)) throw new TRPCError({ code: 'BAD_REQUEST', message: 'OTP expired!' });

  if (otp !== storedOTP) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid OTP!' });

  user.is_verified = true;
  user.emailVerification = null;

  await user.save();

  /**
   * TODO: Send mail to user that OTP is verified
   */

  return { success: true, message: 'OTP verified successfully' };
};
