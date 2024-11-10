import {
  addPasswordCategorySchema,
  deletePasswordCategorySchema,
  editPasswordCategorySchema,
} from "@keyguard/database/zod";

import { masterProtectedProcedure } from "../../procedures/authProcedure";
import { router } from "../../trpc/trpc";
import { addCategoryController } from "./addCategory.controller";
import { deleteCategoryController } from "./deleteCategory.controller";
import { editCategoryController } from "./editCategory.controller";
import { getAllCategoryController } from "./getAllCategory.controller";

export const passwordCategoryRouter = router({
  "get-all-categories": masterProtectedProcedure.query(async ({ ctx }) => getAllCategoryController({ ctx })),

  "add-category": masterProtectedProcedure
    .input(addPasswordCategorySchema)
    .mutation(async ({ input, ctx }) => addCategoryController({ input, ctx })),

  "edit-category": masterProtectedProcedure
    .input(editPasswordCategorySchema)
    .mutation(async ({ input, ctx }) => editCategoryController({ input, ctx })),

  "delete-category": masterProtectedProcedure
    .input(deletePasswordCategorySchema)
    .mutation(async ({ input, ctx }) => deleteCategoryController({ input, ctx })),
});
