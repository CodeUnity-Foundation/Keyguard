import Jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';
import { JWT_SECRET } from '../config';
import { UserJWTData, UserRequest } from './type';
import { checkUserVerifiedStatus, userExisted } from '../queries/user.query';
import { Response } from '../constants';

export const userAuthMiddleware = middleware(async ({ ctx, next }) => {
  let authToken: string = ctx.req?.headers['authorization'] ?? '';

  if (!authToken) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Token not found!' });
  }

  authToken = authToken.replace('Bearer ', '');

  const decoded = Jwt.verify(authToken, JWT_SECRET) as UserJWTData;

  if (!decoded) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid token!' });
  }

  const user = await userExisted({ email: decoded.email });

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized access, Please login again!' });
  }

  const isUserVerified = await checkUserVerifiedStatus({ email: user.email });

  if (!isUserVerified) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: Response.USER_NOT_VERIFIED });
  }

  if (user.master_password) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Master password already exists!' });
  }

  ctx.user = user;

  return next();
});
