import { Password, PasswordCategory } from "@keyguard/database";
import { AddPasswordSchemaType } from "@keyguard/database/zod";
import { TRPCError } from "@trpc/server";

import { TRPCContext } from "../../trpc/createContext";

interface AddPassword {
  input: AddPasswordSchemaType;
  ctx: TRPCContext;
}

interface ExistedCategoryFieldsType {
  _id: string;
  password_category_id: string;
  field_name: string;
  field_type: string;
  mandatory: boolean;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export const addPasswordController = async ({ input, ctx }: AddPassword) => {
  const authedUser = ctx.user;

  const isCategoryExisted = await PasswordCategory.findOne({
    _id: input.password_category_id,
    $or: [{ user_id: authedUser?._id }, { user_id: null }],
  });

  if (!isCategoryExisted) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Please select a valid category." });
  }

  // check, if payload fields are same as existing category fields.
  const mappedCategory = await PasswordCategory.aggregate([
    {
      $match: {
        $or: [{ user_id: authedUser?._id }, { user_id: null }, { _id: input.password_category_id }],
      },
    },
    {
      $lookup: {
        from: "dynamicfields",
        localField: "_id",
        foreignField: "password_category_id",
        as: "fields",
      },
    },
    {
      $unwind: {
        path: "$fields",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  const existedCategoryFields = mappedCategory?.map((item) => item.fields) as ExistedCategoryFieldsType[];

  // This will get the fields of that category which id is comming from payload.
  const categoryFields = existedCategoryFields?.filter(
    (item) => item.password_category_id.toString() === input.password_category_id
  );

  // Check that the fields of payload are same as the fields of category.
  const isSame = categoryFields?.every((item) => Object.keys(input.fields).includes(item.field_name));
  if (!isSame) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Please enter valid fields." });
  }

  // * Currently, We are not applying any validation for name field for the password. Ex: Facebook has only one password for the same user.

  const password = new Password(input);
  await password.save();

  return { status: 200, success: true, message: "Password added successfully." };
};
