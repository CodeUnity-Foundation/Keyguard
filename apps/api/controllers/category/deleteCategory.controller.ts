import { DynamicFields, PasswordCategory } from "@keyguard/database";
import { DeletePasswordCategorySchemaType } from "@keyguard/database/zod";
import { sentDeletedCategoryEmail } from "@keyguard/emails";
import { TRPCError } from "@trpc/server";

import { TRPCContext } from "../../trpc/createContext";

type DeleteCategoryProps = {
  input: DeletePasswordCategorySchemaType;
  ctx: TRPCContext;
};

export const deleteCategoryController = async ({ input, ctx }: DeleteCategoryProps) => {
  const authedUser = ctx?.user;
  const ctxSession = ctx?.session;

  ctxSession.startTransaction();

  const isCategoryExisted = await PasswordCategory.findOne({
    _id: input.category_id,
    user_id: authedUser?._id,
  }).session(ctxSession);

  if (!isCategoryExisted) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Category not found." });
  }

  const deletedCategory = await PasswordCategory.deleteOne({
    _id: input.category_id,
    user_id: authedUser?._id,
  }).session(ctxSession);

  if (deletedCategory.deletedCount > 0) {
    await DynamicFields.deleteMany({ password_category_id: input.category_id }).session(ctxSession);
  }

  await ctxSession.commitTransaction();
  await ctxSession.endSession();

  // Send notification
  await sentDeletedCategoryEmail({
    name: authedUser?.name,
    email: authedUser?.email,
  });

  return {
    status: 200,
    success: true,
    message: "Category deleted successfully.",
  };
};
