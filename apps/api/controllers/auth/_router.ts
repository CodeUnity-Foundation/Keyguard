import {
  authSchema,
  changeMasterPasswordSchema,
  changePasswordSchema,
  createMasterPasswordSchema,
  emailInputSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  verifyMasterPasswordSchema,
} from "@keyguard/lib/validations";

import { existedMasterPassword } from "../../middlewares/existedMasterPassword";
import { userAuthMiddleware } from "../../middlewares/userAuthMiddleware";
import { publicProcedure, router } from "../../trpc";
import { changeMasterPasswordController } from "./changeMasterPassword.controller";
import { changePasswordController } from "./changePassword.controller";
import { checkValidLinkForResetPassword } from "./checkValidLinkForResetPassword.controller";
import { createMasterPasswordController } from "./createMasterpassword.controller";
import { forgotPasswordController } from "./forgotPassword.controller";
import { loginController } from "./login.controller";
import { resendOTPController } from "./resendotp.controller";
import { resetPasswordController } from "./resetPassword.controller";
import { signupController } from "./signup.controller";
import { verifyMasterPasswordController } from "./verifyMasterpassword.controller";
import { verifyOTPController } from "./verifyotp.controller";

export const authRouter = router({
  signup: publicProcedure.input(authSchema).mutation(async ({ input }) => signupController({ input })),

  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => loginController({ input })),

  verifyOTP: publicProcedure.input(otpSchema).mutation(async ({ input }) => verifyOTPController({ input })),

  resendOTP: publicProcedure
    .input(emailInputSchema)
    .mutation(async ({ input }) => resendOTPController({ input })),

  createMasterPassword: publicProcedure
    .input(createMasterPasswordSchema)
    .use(userAuthMiddleware)
    .use(existedMasterPassword)
    .mutation(async ({ input, ctx }) => createMasterPasswordController({ input, ctx })),

  verifyMasterPassword: publicProcedure
    .input(verifyMasterPasswordSchema)
    .use(userAuthMiddleware)
    .mutation(async ({ input, ctx }) => verifyMasterPasswordController({ input, ctx })),

  forgotPassword: publicProcedure
    .input(emailInputSchema)
    .mutation(async ({ input, ctx }) => forgotPasswordController({ input, ctx })),

  validLinkForResetPassword: publicProcedure.query(async ({ ctx }) =>
    checkValidLinkForResetPassword({ ctx })
  ),

  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }) => resetPasswordController({ input })),

  changePassword: publicProcedure
    .use(userAuthMiddleware)
    .input(changePasswordSchema)
    .mutation(async ({ input, ctx }) => changePasswordController({ input, ctx })),

  changeMasterPassword: publicProcedure
    .use(userAuthMiddleware)
    .input(changeMasterPasswordSchema)
    .mutation(async ({ input, ctx }) => changeMasterPasswordController({ input, ctx })),
});
