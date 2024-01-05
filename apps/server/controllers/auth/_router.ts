import { publicProcedure, router } from '../../trpc';
import { authSchema, otpSchema } from './authSchema';
import { signupController } from './signup.controller';
import { verifyOTPController } from './verifyotp.controller';

export const authRouter = router({
  signup: publicProcedure
    .input(authSchema)
    .mutation(async ({ input }) => signupController({ input })),

  verifyotp: publicProcedure
    .input(otpSchema)
    .mutation(async ({ input }) => verifyOTPController({ input })),
});
