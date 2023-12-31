import bcrypt from 'bcrypt';
import { authSchema } from './authSchema';
import { publicProcedure } from '../../trpc';
import { sendOTPVarificationEmail } from '@repo/emails';

import User from '../../models/user';
import { IUser } from '../../models/types';

import { generateJWT } from '../../utils/generateJWT';
import { generateOTP } from '../../utils/generateOTP';
import { asyncHandler } from '../../utils/asyncHandler';
import { BAD_REQUEST, OK } from '../../constants';

export const signupController = publicProcedure.input(authSchema).mutation(async ({ input }) => {
  return asyncHandler(async () => {
    const payload = input;
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return { statusCode: BAD_REQUEST, success: false, message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const otp = generateOTP();
    const newUser = new User({ ...payload, password: hashedPassword, emailVerification: { otp } });
    const savedUser = await newUser.save();

    const user: IUser = await User.findById(savedUser._id).select('-password');
    const token = generateJWT(user._id, user.email);

    if (!user) return { statusCode: BAD_REQUEST, success: false, message: 'Something went wrong!' };
    const emailResposne = await sendOTPVarificationEmail({ email: user.email, otp });

    const userData = { user, token, emailResposne };
    return {
      statusCode: OK,
      success: true,
      message: 'User created successfully',
      data: userData,
    };
  });
});
