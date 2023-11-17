import bcrypt from 'bcrypt';
import User from '../../models/user';
import { authSchema } from './authSchema';
import { publicProcedure } from '../../trpc';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR_CODE, OK } from '../../constants';
import { generateJWT } from '../../utils/generateJWT';
import { IUser } from '../../models/types';

export const signupController = publicProcedure.input(authSchema).mutation(async ({ input }) => {
  try {
    const payload = input;
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return { statusCode: BAD_REQUEST, success: false, message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = new User({ ...payload, password: hashedPassword });
    const savedUser = await newUser.save();

    const userWithoutPassword: IUser = await User.findById(savedUser._id).select('-password');
    const token = generateJWT(userWithoutPassword._id, userWithoutPassword.email);
    const userData = { user: userWithoutPassword, token };

    return {
      statusCode: OK,
      success: true,
      message: 'User created successfully',
      data: userData,
    };
  } catch (error) {
    return {
      statusCode: INTERNAL_SERVER_ERROR_CODE,
      message: error,
    };
  }
});
