import { addPasswordCategorySchema } from "@keyguard/database/zod";

import { masterProtectedProcedure } from "../../procedures/authProcedure";
import { router } from "../../trpc/trpc";
import { addCategoryController } from "./addCategory.controller";
import { getAllCategoryController } from "./getAllCategory.controller";

export const passwordCategoryRouter = router({
  "get-all-categories": masterProtectedProcedure.query(async ({ ctx }) => getAllCategoryController({ ctx })),

  "add-category": masterProtectedProcedure
    .input(addPasswordCategorySchema)
    .mutation(async ({ input, ctx }) => addCategoryController({ input, ctx })),
});
