import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';
import { sendOTPVarificationEmail } from '@repo/emails';

import User from '../../models/user';

import { generateJWT } from '../../utils/generateJWT';
import { generateOTP } from '../../utils/generateOTP';
import { AuthSchemaType } from './authSchema';

type SignUpProps = {
  input: AuthSchemaType;
};

/**
 * @TODO - Remove password, createdAt, updatedAt and deletedAt from response
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

  const otp = generateOTP();
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const newUser = new User({
    ...input,
    password: hashedPassword,
    emailVerification: { otp },
  });
  const savedUser = await newUser.save();

  // const user: IUser = await User.findById(savedUser._id).select('-password');
  // if (!user) throw new TRPCError({ code: 'BAD_REQUEST', message: 'User not found!' });

  const token = generateJWT(savedUser._id, savedUser.email);
  // const emailResposne = await sendOTPVarificationEmail({ email: savedUser.email, otp });

  const userData = { savedUser, token, emailResposne: 'Service stopped' };
  return { success: true, message: 'User created successfully', ...userData };
};
