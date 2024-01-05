import { TRPCError } from '@trpc/server';
import { OTPSchemaType } from './authSchema';
import User from '../../models/user';
import { IUser } from '../../models/types';

type VerifyOTPProps = {
  input: OTPSchemaType;
};

export const verifyOTPController = async ({ input }: VerifyOTPProps) => {
  const { email, otp } = input;

  const isUserExist = User.findOne({ email }) as unknown as IUser;
  if (!isUserExist) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'User does not exist!' });
  }

  /**
   * @TODO - Complete this controller
   */
  const { emailVerification } = isUserExist;

  return isUserExist;
};
