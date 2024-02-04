import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';
import { logger } from '@vaultmaster/lib/logger';
import { sendPasswordConfirmationEmail } from '@vaultmaster/emails';
import { ResetPasswordSchemaType } from './authSchema';
import { comparePassword, userExisted } from '../../queries/user.query';
import { Response } from '../../constants';
import { JWT_SECRET } from '../../config';
import { UserJWTData } from '../../@types';
import User from '../../models/user';

interface ResetPassword {
  input: ResetPasswordSchemaType;
}

export const resetPasswordController = async ({ input }: ResetPassword) => {
  let decode: UserJWTData | null = null;

  try {
    decode = jwt.verify(input.requestToken, JWT_SECRET) as UserJWTData;
  } catch (error) {
    logger.error('Error in resetPasswordController: ', error);
    throw new TRPCError({ code: 'FORBIDDEN', message: Response.RESET_LINK_EXPIRED });
  }

  if (!decode) {
    throw new TRPCError({ code: 'FORBIDDEN', message: Response.RESET_LINK_EXPIRED });
  }

  const user = await userExisted({ email: decode.email });

  if (!user) {
    throw new TRPCError({ code: 'FORBIDDEN', message: Response.RESET_LINK_EXPIRED });
  }

  comparePassword({ password: input.password, confirmPassword: input.confirm_password });

  const hashedPassword = await bcrypt.hash(input.password, 10);

  await User.updateOne(
    { email: decode.email },
    {
      $set: {
        password: hashedPassword,
        isLinkExpired: true,
      },
    },
  );

  // send email to user
  sendPasswordConfirmationEmail({
    name: user.name,
    email: user.email,
    type: 'update_password',
  });

  return { success: true, message: 'Password reset successfully!' };
};
