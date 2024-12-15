import { authRouter } from "../controllers/auth/_router";
import { passwordCategoryRouter } from "../controllers/category/_router";
import { folderRouter } from "../controllers/folder/_router";
import { passwordRouter } from "../controllers/password/_router";
import { router } from "../trpc/trpc";

export const appRouter = router({
  auth: authRouter,
  password: passwordRouter,
  category: passwordCategoryRouter,
  folder: folderRouter,
});

export type AppRouter = typeof appRouter;
