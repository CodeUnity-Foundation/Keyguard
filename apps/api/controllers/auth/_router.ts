import { publicProcedure, router } from '../../trpc';
import { signupController } from './signup.controller';
import { sendVerifyOTPController } from './sendVerifyOTP.controller';
import { authSchema, otpSchema, sendVerifyOTPSchema } from './authSchema';
import { verifyOTPController } from './verifyotp.controller';

export const authRouter = router({
  signup: publicProcedure
    .input(authSchema)
    .mutation(async ({ input }) => signupController({ input })),

  verifyOTP: publicProcedure
    .input(otpSchema)
    .mutation(async ({ input }) => verifyOTPController({ input })),

  sendVerifyOTP: publicProcedure
    .input(sendVerifyOTPSchema)
    .mutation(async ({ input }) => sendVerifyOTPController({ input })),
});
