import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';
import User from '../../models/user';
import { generateJWT } from '../../utils/generateJWT';
import { generateOTP } from '../../utils/generateOTP';
import { AuthSchemaType } from './authSchema';
import { SIXTY, THOUSAND, TWO, verifyOTPTimeLimit } from '../../utils/constant';
import { sendOTPVarificationEmail } from '@repo/emails';

type SignUpProps = {
  input: AuthSchemaType;
};

/**
 *
 * TODO: Handle the profile image upload
 */
export const signupController = async ({ input }: SignUpProps) => {
  const existingUser = await User.findOne({ email: input.email });
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

  const otpExpireTime = new Date(Date.now() + TWO * SIXTY * THOUSAND); // 2 minutes from now

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

  const sanatizedUser = await User.findById(user._id).select('-password -emailVerification -__v');
  if (!sanatizedUser) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found!' });

  const token = generateJWT(sanatizedUser._id, sanatizedUser.email);

  const userData = { user: sanatizedUser, token };
  return {
    success: true,
    message: 'Account created successfully. Check your email for OTP verification!',
    ...userData,
  };
};
