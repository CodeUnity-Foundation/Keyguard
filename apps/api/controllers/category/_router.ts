import { addPasswordCategorySchema } from "@keyguard/database/zod";

import { masterProtectedProcedure } from "../../procedures/authProcedure";
import { router } from "../../trpc/trpc";
import { addCategoryController } from "./addCategory.controller";

export const passwordCategoryRouter = router({
  "add-category": masterProtectedProcedure
    .input(addPasswordCategorySchema)
    .mutation(async ({ input, ctx }) => addCategoryController({ input, ctx })),
});
