import { authRouter } from "../controllers/auth/_router";
import { passwordRouter } from "../controllers/password/_router";
import { router } from "../trpc/trpc";

export const appRouter = router({
  auth: authRouter,
  password: passwordRouter,
});

export type AppRouter = typeof appRouter;
