import z from "zod";

import { booleanValidation, stringValidation } from "./common";

export const rootPasswordCategorySchema = z.object({
  category_name: stringValidation("Name is required"),
  user_id: stringValidation("User id is required"),
  is_visible: booleanValidation().default(true).optional(),
});

export const addPasswordCategorySchema = rootPasswordCategorySchema.pick({
  category_name: true,
  is_visible: true,
});

export type AddPasswordCategorySchemaType = z.infer<typeof addPasswordCategorySchema>;
