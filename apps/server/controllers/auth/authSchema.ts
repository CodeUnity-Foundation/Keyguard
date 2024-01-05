import { z } from 'zod';

export const authSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2).max(100),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' }).min(6).max(25),
  confirm_password: z.string({ required_error: 'Confirm password is required' }).min(6).max(25),
  profile: z.string().optional(),
  /**
   * @TODO - Take otp and otp_expiry in a object as taken in User model
   */
  otp: z.number().optional(),
  otp_expiry: z.date().optional(),
  is_verified: z.boolean(),
  master_password: z.string().optional(),
});

export type AuthSchemaType = z.infer<typeof authSchema>;

export const otpSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  otp: z.number({ required_error: 'OTP is required', invalid_type_error: 'OTP must be a number' }),
  /**
   * @TODO - Add min and max otp length to 6
   */
});

export type OTPSchemaType = z.infer<typeof otpSchema>;
