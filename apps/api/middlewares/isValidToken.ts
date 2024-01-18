import Jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';
import { JWT_SECRET } from '../config';
import User from '../models/user';
import { UserJWTData, UserRequest } from './type';

export const isValidToken = middleware(async ({ ctx, next }) => {
  const context = ctx as unknown as UserRequest;

  let authToken: string = ctx.req.headers['authorization'] ?? '';

  if (!authToken) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Token not found!' });
  }

  authToken = authToken.replace('Bearer ', '');

  const verified = Jwt.verify(authToken, JWT_SECRET) as UserJWTData;

  if (!verified) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid token!' });
  }

  const user = await User.findOne({ email: verified.email });

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized access, Please login again!' });
  }

  if (!user.is_verified) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized access, You are not verified user!' });
  }

  if (user.master_password) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Master password already exists!' });
  }

  context.user = user;

  return next();
});
