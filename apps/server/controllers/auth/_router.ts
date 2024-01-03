import { publicProcedure, router } from '../../trpc';
import { authSchema } from './authSchema';
import { signupController } from './signup.controller';

export const authRouter = router({
  signup: publicProcedure
    .input(authSchema)
    .mutation(async ({ input }) => signupController({ input })),
});
