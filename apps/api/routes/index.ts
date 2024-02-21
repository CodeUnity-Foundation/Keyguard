import { authRouter } from "../controllers/auth/_router";
import { router } from "../trpc";

export const appRouter = router({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
