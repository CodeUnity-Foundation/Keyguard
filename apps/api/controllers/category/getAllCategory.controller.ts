import { PasswordCategory } from "@keyguard/database";

import { TRPCContext } from "../../trpc/createContext";

type GetAllCategoryProps = {
  ctx: TRPCContext;
};

export const getAllCategoryController = async ({ ctx }: GetAllCategoryProps) => {
  const logged_user = ctx.user;

  const pass_categories = await PasswordCategory.aggregate([
    {
      // Match the category belong to the logged in user or the default category.
      $match: {
        $or: [{ user_id: logged_user?._id }, { is_default: true }],
      },
    },
    {
      // Append the dynamic_fields to the category based on the password_category_id.
      $lookup: {
        from: "dynamicfields",
        localField: "_id",
        foreignField: "password_category_id",
        as: "fields",
      },
    },
    {
      // Append the created_by to the category, with name and email only.
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "created_by",
        pipeline: [
          {
            $project: {
              _id: 0,
              name: 1,
              email: 1,
            },
          },
        ],
      },
    },
    {
      // Extract the created_by from array and convert it to object.
      $unwind: {
        path: "$created_by",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      // Conditionally handle the created_by field, if not added by user.
      $addFields: {
        created_by: {
          $cond: {
            if: { $eq: ["$is_default", true] },
            then: { name: "Default Category" },
            else: "$created_by",
          },
        },
      },
    },
    {
      // Exclude "__v", "user_id" and "pass_cat_id" from the response.
      $project: {
        __v: 0,
        user_id: 0,
        "fields.__v": 0,
        "fields.password_category_id": 0,
      },
    },
  ]);

  return { success: 200, data: pass_categories };
};
