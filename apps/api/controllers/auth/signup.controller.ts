import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';
import { sendOTPVarificationEmail } from '@repo/emails';
import { generateJWT } from '../../utils/generateJWT';
import { generateOTP } from '../../utils/generateOTP';
import { otpExpireTime, verifyOTPTimeLimit } from '../../utils/constant';
import { sanatizedUser, userExisted } from '../../queries/user.query';
import { AuthSchemaType } from './authSchema';
import User from '../../models/user';

type SignUpProps = {
  input: AuthSchemaType;
};

/**
 *
 * TODO: Handle the profile image upload
 */
export const signupController = async ({ input }: SignUpProps) => {
  const existingUser = await userExisted({ email: input.email });

  if (existingUser) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'User already exists!' });
  }

  const { password, confirm_password } = input;

  if (password !== confirm_password) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Passwords do not matched!' });
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = await User.create({ ...input, password: hashedPassword });

  // send otp
  const otp = generateOTP();

  const { emailVerification } = user;

  if (emailVerification?.otp && emailVerification.otp_expiry && verifyOTPTimeLimit(emailVerification.otp_expiry)) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'OTP already sent!' });
  }

  // send otp to email
  await sendOTPVarificationEmail({
    name: input.name,
    email: input.email,
    otp: otp,
    expire: '2 minutes',
  });

  user.emailVerification = {
    otp: +otp,
    otp_expiry: otpExpireTime,
  };

  await user.save();

  // return the user
  const userResponse = await sanatizedUser({ email: user.email });

  if (!userResponse) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found!' });
  }

  const token = generateJWT({
    payload: { userId: userResponse._id, email: userResponse.email },
    duration: 7,
    durationUnit: 'days',
  });

  const userData = { user: userResponse, token };

  return {
    success: true,
    message: 'Account created successfully. Check your email for OTP verification!',
    ...userData,
  };
};
