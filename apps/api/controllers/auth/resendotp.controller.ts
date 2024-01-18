import { TRPCError } from '@trpc/server';
import { sendOTPVarificationEmail } from '@repo/emails';
import { generateOTP } from '../../utils/generateOTP';
import { otpExpireTime, verifyOTPTimeLimit } from '../../utils/constant';
import { checkUserVerifiedStatus, userExisted } from '../../queries/user.query';

type ResendOTPProps = {
  email: string;
};

export const resendOTPController = async ({ input }: { input: ResendOTPProps }) => {
  const user = await userExisted({ email: input.email });

  if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found!' });

  await checkUserVerifiedStatus({ email: user.email });

  const otp = generateOTP();

  const { emailVerification } = user;

  if (
    emailVerification?.otp &&
    emailVerification.otp_expiry &&
    verifyOTPTimeLimit(emailVerification.otp_expiry, true)
  ) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'OTP already sent!' });
  }

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
