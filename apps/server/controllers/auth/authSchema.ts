import { z } from 'zod';

export const authSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2).max(100),
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password is required' }).min(6).max(25),
  profile: z.string().optional(),
  otp: z.number().optional(),
  otp_expiry: z.date().optional(),
  is_verified: z.boolean(),
  master_password: z.string().optional(),
});
