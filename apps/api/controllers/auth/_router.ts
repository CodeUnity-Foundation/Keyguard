import {
  changeMasterPasswordSchema,
  changePasswordSchema,
  createMasterPasswordSchema,
  emailInputSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  signupSchema,
  verifyMasterPasswordSchema,
} from "@keyguard/database/zod";

import { existedMasterPassword } from "../../middlewares/existedMasterPassword";
import { userAuthMiddleware } from "../../middlewares/userAuthMiddleware";
import { masterProtectedProcedure, protectedProcedure } from "../../procedures/authProcedure";
import publicProcedure from "../../procedures/publicProcedure";
import { router } from "../../trpc/trpc";
import { changeMasterPasswordController } from "./changeMasterPassword.controller";
import { changePasswordController } from "./changePassword.controller";
import { checkValidLinkForResetPassword } from "./checkValidLinkForResetPassword.controller";
import { createMasterPasswordController } from "./createMasterpassword.controller";
import { forgotPasswordController } from "./forgotPassword.controller";
import { getLoggedUser } from "./getLoggedUser.controller";
import { loginController } from "./login.controller";
import { generateRefreshToken } from "./refreshToken.controller";
import { resendOTPController } from "./resendotp.controller";
import { resetPasswordController } from "./resetPassword.controller";
import { signupController } from "./signup.controller";
import { verifyMasterPasswordController } from "./verifyMasterpassword.controller";
import { verifyOTPController } from "./verifyotp.controller";

export const authRouter = router({
  signup: publicProcedure.input(signupSchema).mutation(async ({ input }) => signupController({ input })),

  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => loginController({ input })),

  "verify-otp": publicProcedure
    .input(otpSchema)
    .mutation(async ({ input }) => verifyOTPController({ input })),

  "resend-otp": publicProcedure
    .input(emailInputSchema)
    .mutation(async ({ input }) => resendOTPController({ input })),

  "create-master-password": protectedProcedure
    .input(createMasterPasswordSchema)
    .use(existedMasterPassword)
    .mutation(async ({ input, ctx }) => createMasterPasswordController({ input, ctx })),

  "verify-master-password": protectedProcedure
    .input(verifyMasterPasswordSchema)
    .mutation(async ({ input, ctx }) => verifyMasterPasswordController({ input, ctx })),

  "forgot-password": publicProcedure
    .input(emailInputSchema)
    .mutation(async ({ input, ctx }) => forgotPasswordController({ input, ctx })),

  "valid-link-for-reset-password": publicProcedure.query(async ({ ctx }) =>
    checkValidLinkForResetPassword({ ctx })
  ),

  "reset-password": publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }) => resetPasswordController({ input })),

  "change-password": masterProtectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ input, ctx }) => changePasswordController({ input, ctx })),

  "change-master-password": masterProtectedProcedure
    .input(changeMasterPasswordSchema)
    .mutation(async ({ input, ctx }) => changeMasterPasswordController({ input, ctx })),

  "get-logged-user": publicProcedure.query(async ({ ctx }) => getLoggedUser({ ctx })),

  "refresh-token": publicProcedure
    .use(userAuthMiddleware)
    .mutation(async ({ ctx }) => generateRefreshToken({ ctx })),
});
