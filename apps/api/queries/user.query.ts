import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';
import User from '../models/user';
import { Response } from '../constants';

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
 * @param email
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
  const user = await userExisted({ email });
  return user?.is_verified;
};

/**
 * Check compared password using bcrypt
 * @param password @param existedPassword
 */
export const comparePassword = async ({
  password,
  existedPassword,
}: {
  password: string;
  existedPassword: string;
}): Promise<boolean> => {
  const isSame = await bcrypt.compare(password, existedPassword);
  if (!isSame) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: Response.INVALID_CREDENTIALS });
  }
  return isSame;
};

/**
 * Check that password and confirm password are same
 * @param password OR @param masterPassword
 * @param confirmPassword OR @param confirmMasterPassword
 */
export const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}): boolean => {
  if (password !== confirmPassword) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: Response.PASSWORD_NOT_MATCHED });
  }
  return true;
};
