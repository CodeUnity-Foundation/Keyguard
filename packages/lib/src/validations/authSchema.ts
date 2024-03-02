import { z } from "zod";

/**
 * Todo: Improve this validation schema
 */
export const authSchema = z.object({
  name: z.string().trim().min(3, { message: "Minimum 3 character required" }).max(100),
  email: z.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }).trim().min(6).max(25),
  confirm_password: z.string({ required_error: "Confirm password is required" }).trim().min(6).max(25),
  profile: z.string().trim().optional(),
  emailVerification: z
    .object({
      otp: z
        .number({ required_error: "OTP is required", invalid_type_error: "OTP must be a number" })
        .refine((otp) => Number.isInteger(otp) && otp > 111111 && otp < 999999, {
          message: "OTP must be a 6 digit number",
        }),
      otp_expiry: z.date(),
    })
    .optional()
    .nullable(),
  is_verified: z.boolean(),
  master_password: z.string().trim().min(6).max(25).optional(),
  confirm_master_password: z.string().trim().min(6).max(25).optional(),
  is_remember: z.boolean().optional(),
});

export type AuthSchemaType = z.infer<typeof authSchema>;

export const signupSchema = authSchema.pick({
  name: true,
  email: true,
  password: true,
  confirm_password: true,
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = authSchema.pick({
  email: true,
  password: true,
  is_remember: true,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
  otp: z
    .number({ required_error: "OTP is required", invalid_type_error: "OTP must be a number" })
    .refine((otp) => Number.isInteger(otp) && otp > 100000 && otp < 999999, {
      message: "OTP must be a 6 digit number",
    }),
});

export type OTPSchemaType = z.infer<typeof otpSchema>;

export const emailInputSchema = authSchema.pick({
  email: true,
});

export type EmailInputSchemaType = z.infer<typeof emailInputSchema>;

export const createMasterPasswordSchema = z.object({
  master_password: z.string({ required_error: "Master password is required" }).min(6).max(25),
  confirm_master_password: z.string({ required_error: "Confirm master password is required" }).min(6).max(25),
});

export type MasterPasswordSchemaType = z.infer<typeof createMasterPasswordSchema>;

export const verifyMasterPasswordSchema = z.object({
  master_password: z.string({ required_error: "Master password is required" }).min(6).max(25),
});

export type VerifyMasterPasswordSchemaType = z.infer<typeof verifyMasterPasswordSchema>;

export const resetPasswordSchema = z.object({
  requestToken: z.string(),
  password: z.string({ required_error: "Password is required" }).min(6).max(25),
  confirm_password: z.string({ required_error: "Confirm password is required" }).min(6).max(25),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
