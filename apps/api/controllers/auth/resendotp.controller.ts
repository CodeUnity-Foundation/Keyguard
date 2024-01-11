import { TRPCError } from '@trpc/server';
import { sendOTPVarificationEmail } from '@repo/emails';
import { generateOTP } from '../../utils/generateOTP';
import { verifyOTPTimeLimit } from '../../utils/constant';
import User from '../../models/user';

type ResendOTPInput = {
  email: string;
};

export const resendOTPController = async ({ input }: { input: ResendOTPInput }) => {
  const user = await User.findOne({ email: input.email }).select('-password -createdAt -updatedAt -deletedAt -__v');

  if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found!' });

  if (user.is_verified) throw new TRPCError({ code: 'BAD_REQUEST', message: 'User already verified!' });

  const otp = generateOTP();

  const { emailVerification } = user;

  if (
    emailVerification?.otp &&
    emailVerification.otp_expiry &&
    verifyOTPTimeLimit(emailVerification.otp_expiry, true)
  ) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'OTP already sent!' });
  }

  const otpExpireTime = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

  user.emailVerification = {
    otp: +otp,
    otp_expiry: otpExpireTime,
  };

  await sendOTPVarificationEmail({
    name: user.name,
    email: user.email,
    otp: otp,
    expire: '2 minutes',
  });

  await user.save();

  return { success: true, message: 'OTP sent successfully!' };
};
