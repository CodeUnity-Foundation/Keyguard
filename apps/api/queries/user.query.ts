import { TRPCError } from '@trpc/server';
import User from '../models/user';

/**
 * Check if the user already exists
 * @param email
 * @returns existing user
 */
export const userExisted = async ({ email }: { email: string }) => {
  const user = await User.findOne({ email });
  return user;
};

/**
 * Get the user by email or id and return the sanatized user. This is for the response
 * @param email or _id
 * @returns sanatized user
 */
export const sanatizedUser = async ({ email }: { email: string }) => {
  const user = await User.findOne({ email }).select('-password -emailVerification -__v');
  return user;
};

/**
 * Check if the user is already verified
 * @param email
 */
export const checkUserVerifiedStatus = async ({ email }: { email: string }) => {
  const user = await User.findOne({ email });
  if (user?.is_verified) throw new TRPCError({ code: 'BAD_REQUEST', message: 'User already verified!' });
};
