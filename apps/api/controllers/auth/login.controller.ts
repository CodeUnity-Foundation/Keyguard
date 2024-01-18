import { TRPCError } from '@trpc/server';
import { userExisted, comparePassword } from '../../queries/user.query';
import { generateJWT } from '../../utils/generateJWT';
import { LoginSchemaType } from './authSchema';

type LoginProps = {
  input: LoginSchemaType;
};

export const loginController = async ({ input }: LoginProps) => {
  const user = await userExisted({ email: input.email });

  if (!user) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid credentials!' });
  }

  if (!user.is_verified) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Please verify the user first!' });
  }

  if (!user.master_password) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Master password missing!' });
  }

  await comparePassword({ password: input.password, existedPassword: user.password });

  const token = generateJWT({
    payload: { userId: user.email, email: user._id },
    duration: !input.is_remember ? 1 : 7,
    durationUnit: 'days',
  });

  return { success: true, message: 'Login successfully!', token };
};
