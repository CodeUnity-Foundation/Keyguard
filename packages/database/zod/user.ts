import { z } from "zod";

import { passwordValidation, stringValidation } from "./common";

export const rootAuthSchema = z.object({
  name: stringValidation("Name is required")
    .regex(new RegExp("^[a-zA-Z0-9 ]*$"), { message: "Special characters not allowed" })
    .min(3, { message: "Minimum 3 characters required" })
    .max(100),
  email: stringValidation("Email is required").email({ message: "Invalid email" }),
  password: passwordValidation("Password is required"),
  current_password: passwordValidation("Current password is required"),
  confirm_password: passwordValidation("Confirm password is required"),
  profile: stringValidation().optional(),
  otp: stringValidation().length(6).regex(/^\d+$/),
  is_verified: z.boolean().default(false),
  master_password: passwordValidation("Master password is required"),
  current_master_password: passwordValidation("Current master password is required"),
  confirm_master_password: passwordValidation("Confirm master password is required"),
  is_remember: z.boolean(),
  request_token: stringValidation("Request token is required"),
});

export const signupSchema = rootAuthSchema.pick({
  name: true,
  email: true,
  password: true,
  confirm_password: true,
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = rootAuthSchema.pick({
  email: true,
  password: true,
  is_remember: true,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const otpSchema = rootAuthSchema.pick({
  email: true,
  otp: true,
});

export type OTPSchemaType = z.infer<typeof otpSchema>;

export const emailInputSchema = rootAuthSchema.pick({
  email: true,
});

export type EmailInputSchemaType = z.infer<typeof emailInputSchema>;

export const createMasterPasswordSchema = rootAuthSchema.pick({
  master_password: true,
  confirm_master_password: true,
});

export type MasterPasswordSchemaType = z.infer<typeof createMasterPasswordSchema>;

export const verifyMasterPasswordSchema = rootAuthSchema.pick({
  master_password: true,
});

export type VerifyMasterPasswordSchemaType = z.infer<typeof verifyMasterPasswordSchema>;

export const resetPasswordSchema = rootAuthSchema.pick({
  request_token: true,
  password: true,
  confirm_password: true,
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = rootAuthSchema.pick({
  current_password: true,
  password: true,
  confirm_password: true,
});

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const changeMasterPasswordSchema = rootAuthSchema.pick({
  current_master_password: true,
  master_password: true,
  confirm_master_password: true,
});

export type ChangeMasterPasswordSchema = z.infer<typeof changeMasterPasswordSchema>;
