import { PasswordCategory } from "@keyguard/database";
import { AddPasswordCategorySchemaType } from "@keyguard/database/zod";
import { TRPCError } from "@trpc/server";

import { TRPCContext } from "../../trpc/createContext";

type AddCategoryProps = {
  input: AddPasswordCategorySchemaType;
  ctx: TRPCContext;
};

export const addCategoryController = async ({ input, ctx }: AddCategoryProps) => {
  const authedUser = ctx?.user;

  /**
   ** Check if category already exists with the same name and loggedIn user.
   */
  const categoryNameRegex = new RegExp(`^${input.category_name}$`, "i");

  const isCategoryExisted = await PasswordCategory.findOne({
    category_name: { $regex: categoryNameRegex },
    user_id: authedUser?._id,
  });

  if (isCategoryExisted) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Category already exists" });
  }

  const newCategory = new PasswordCategory({
    category_name: input.category_name.trim(),
    user_id: authedUser?._id,
    is_visible: input.is_visible,
  });

  await newCategory.save();

  return newCategory;
};
