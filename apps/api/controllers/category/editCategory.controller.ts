import { DynamicFields, PasswordCategory } from "@keyguard/database";
import { EditPasswordCategorySchemaType } from "@keyguard/database/zod";
import { TRPCError } from "@trpc/server";

import { TRPCContext } from "../../trpc/createContext";

type EditCategoryProps = {
  input: EditPasswordCategorySchemaType;
  ctx: TRPCContext;
};

export const editCategoryController = async ({ input, ctx }: EditCategoryProps) => {
  const authedUser = ctx?.user;
  const ctxSession = ctx?.session;

  ctxSession.startTransaction();

  const isCategoryExisted = await PasswordCategory.findOne({
    _id: input.category_id,
  }).session(ctxSession);

  if (!isCategoryExisted) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Category not found." });
  }

  // Check if category already exists with the same name for the loggedIn user.
  const categoryNameRegex = new RegExp(`^${input.category_name}$`, "i");

  // Find the category in 2 ways.
  // 1. If isdefault is false, then find category with category_name and user_id.
  // 2. If isdefault is true, then find category with category_name only.
  const isDuplicateCategoryName = await PasswordCategory.findOne({
    _id: input.category_id,
    category_name: { $regex: categoryNameRegex },
    $or: [
      // Match user_id only if isdefault is false
      { user_id: input.is_default ? { $exists: false } : authedUser?._id },
      // Handle case where isdefault is true
      { user_id: { $exists: input.is_default } },
    ],
  }).session(ctxSession);

  if (isDuplicateCategoryName) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Category already exists." });
  }

  const isDefaultCategory = await PasswordCategory.findOne({
    _id: input.category_id,
    is_default: true,
  }).session(ctxSession);

  if (isDefaultCategory) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Default category cannot be edited." });
  }

  await PasswordCategory.updateOne(
    { _id: input.category_id },
    {
      $set: {
        category_name: input.category_name?.trim(),
        is_visible: input?.is_visible,
        user_id: authedUser?._id,
      },
    }
  ).session(ctxSession);

  await Promise.all(
    input.fields.map(async (field) => {
      await DynamicFields.updateMany(
        {
          password_category_id: input.category_id,
        },
        {
          password_category_id: input.category_id,
          field_name: field.field_name,
          field_type: field.field_type,
          mandatory: field.mandatory,
        }
      ).session(ctxSession);
    })
  );

  await ctxSession.commitTransaction();
  await ctxSession.endSession();

  return {
    status: 200,
    success: true,
    message: "Category deleted successfully.",
  };
};
