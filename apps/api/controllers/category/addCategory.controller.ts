import { DynamicFields, PasswordCategory } from "@keyguard/database";
import { AddPasswordCategorySchemaType } from "@keyguard/database/zod";
import { TRPCError } from "@trpc/server";

import { TRPCContext } from "../../trpc/createContext";

type AddCategoryProps = {
  input: AddPasswordCategorySchemaType;
  ctx: TRPCContext;
};

export const addCategoryController = async ({ input, ctx }: AddCategoryProps) => {
  const authedUser = ctx?.user;
  const ctx_session = ctx?.session;

  ctx_session.startTransaction();

  // Check if category already exists with the same name for the loggedIn user.
  const categoryNameRegex = new RegExp(`^${input.category_name}$`, "i");

  // Find the category in 2 ways.
  // 1. If isdefault is false, then find category with category_name and user_id.
  // 2. If isdefault is true, then find category with category_name only.
  const isCategoryExisted = await PasswordCategory.findOne({
    category_name: { $regex: categoryNameRegex },
    $or: [
      // Match user_id only if isdefault is false
      { user_id: input.is_default ? { $exists: false } : authedUser?._id },
      // Handle case where isdefault is true
      { user_id: { $exists: input.is_default } },
    ],
  }).session(ctx_session);

  if (isCategoryExisted) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Category already exists." });
  }

  const newCategory = new PasswordCategory({
    category_name: input.category_name.trim(),
    user_id: !input.is_default ? authedUser?._id : null,
    is_default: input.is_default,
    is_visible: input.is_visible,
  });

  const category = await newCategory.save({ session: ctx_session });

  // Use Map to keep track of unique objects by field_name.
  const unique_map = new Map(input.fields.map((item) => [item.field_name.toLowerCase(), item]));
  const unique_array = Array.from(unique_map.values());

  // Throw error if any field name is not unique.
  if (unique_array.length !== input.fields.length) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Each field name must be unique." });
  }

  await Promise.all(
    unique_array.map((item) => {
      const field = new DynamicFields({
        password_category_id: category._id,
        ...item,
      });
      return field.save({ session: ctx_session });
    })
  );

  await ctx_session.commitTransaction();
  await ctx_session.endSession();

  return {
    status: 200,
    success: true,
    message: "Category added successfully",
  };
};
