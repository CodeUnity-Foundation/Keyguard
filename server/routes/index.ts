import { router } from '../trpc';
import { signupController } from '../controllers/auth/signupController';

export const appRouter = router({
  signup: signupController,
});

export type AppRouter = typeof appRouter;
