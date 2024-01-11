import { publicProcedure, router } from '../../trpc';
import { signupController } from './signup.controller';
import { verifyOTPController } from './verifyotp.controller';
import { resendOTPController } from './resendotp.controller';
import { authSchema, otpSchema, resentOTPSchema } from './authSchema';

export const authRouter = router({
  signup: publicProcedure.input(authSchema).mutation(async ({ input }) => signupController({ input })),

  verifyOTP: publicProcedure.input(otpSchema).mutation(async ({ input }) => verifyOTPController({ input })),

  resendOTP: publicProcedure.input(resentOTPSchema).mutation(async ({ input }) => resendOTPController({ input })),
});
