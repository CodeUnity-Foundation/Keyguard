import { publicProcedure, router } from '../../trpc';

import { loginController } from './login.controller';
import { signupController } from './signup.controller';
import { verifyOTPController } from './verifyotp.controller';
import { resendOTPController } from './resendotp.controller';
import { createMasterPasswordController } from './createMasterpassword.controller';
import { verifyMasterPasswordController } from './verifyMasterpassword.controller';
import { userAuthMiddleware } from '../../middlewares/userAuthMiddleware';
import {
  authSchema,
  loginSchema,
  createMasterPasswordSchema,
  otpSchema,
  resentOTPSchema,
  verifyMasterPasswordSchema,
} from './authSchema';

export const authRouter = router({
  signup: publicProcedure.input(authSchema).mutation(async ({ input }) => signupController({ input })),

  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => loginController({ input })),

  verifyOTP: publicProcedure.input(otpSchema).mutation(async ({ input }) => verifyOTPController({ input })),

  resendOTP: publicProcedure.input(resentOTPSchema).mutation(async ({ input }) => resendOTPController({ input })),

  createMasterPassword: publicProcedure
    .input(createMasterPasswordSchema)
    .use(userAuthMiddleware)
    .mutation(async ({ input, ctx }) => createMasterPasswordController({ input, ctx })),

  verifyMasterPassword: publicProcedure
    .input(verifyMasterPasswordSchema)
    .use(userAuthMiddleware)
    .mutation(async ({ input, ctx }) => verifyMasterPasswordController({ input, ctx })),
});
