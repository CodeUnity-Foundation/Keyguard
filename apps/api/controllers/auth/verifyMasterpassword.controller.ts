import { TRPCError } from '@trpc/server';
import { TRPCContext } from '../../createContext';
import { IUser } from '../../models/types';
import { userExisted, verifyPassword } from '../../queries/user.query';
import { VerifyMasterPasswordSchemaType } from './authSchema';
import { Response } from '../../constants';
import { generateJWT } from '../../utils/generateJWT';
import { sendAccountLoginSuccessEmail } from '@repo/emails';

type VerifyMasterPasswordProps = {
  input: VerifyMasterPasswordSchemaType;
  ctx: TRPCContext;
};

// This api will call at masterpassword login time
export const verifyMasterPasswordController = async ({ input, ctx }: VerifyMasterPasswordProps) => {
  const { master_password } = input;

  const email = ctx.user?.email ?? '';

  const user = (await userExisted({ email })) as IUser;

  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: Response.USER_NOT_FOUND });
  }

  // verify the password
  if (user.master_password) {
    await verifyPassword({ password: master_password, existedPassword: user.master_password });
  }

  const accessToken = generateJWT({
    payload: { userId: user.email, email: user._id },
    duration: 3,
    durationUnit: 'minutes',
  });

  // Send mail to user that account is logged in
  sendAccountLoginSuccessEmail({
    name: user.name,
    email: user.email,
    ip: ctx.req?.headers['x-forwarded-for'] ?? '',
    browser: ctx.req?.headers['user-agent'] ?? '',
    time: new Date().toLocaleString(),
  });

  return { success: true, message: `Welcome back, ${user.name}. Good to see you again.`, accessToken };
};
