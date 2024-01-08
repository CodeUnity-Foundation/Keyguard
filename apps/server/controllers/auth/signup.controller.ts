import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';
import User from '../../models/user';
import { generateJWT } from '../../utils/generateJWT';
import { generateOTP } from '../../utils/generateOTP';
import { AuthSchemaType } from './authSchema';

type SignUpProps = {
  input: AuthSchemaType;
};

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

  const user = await User.findById(savedUser._id).select(
    '-password -emailVerification -createdAt -updatedAt -deletedAt -__v',
  );
  if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found!' });

  const token = generateJWT(user._id, user.email);

  const userData = { user, token };
  return { success: true, message: 'User created successfully', ...userData };
};
