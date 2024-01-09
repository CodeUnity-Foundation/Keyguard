import jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';
import { middleware } from '../trpc';
import { JWT_SECRET } from '@repo/emails/config';

export const isValidToken = middleware(async ({ ctx, next }) => {
  const token: string = ctx.req.headers['authorization'] ?? '';

  if (!token) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Token not found!' });
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('decoded =>', decoded);

  if (!decoded) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid token!' });
  }

  return next();
});
