import z from "zod";

import { booleanValidation, stringValidation } from "./common";
import { addDynamicFieldsSchema } from "./dynamicFields";

export const rootPasswordCategorySchema = z.object({
  category_name: stringValidation("Name is required"),
  user_id: stringValidation("User id is required"),
  fields: z.array(addDynamicFieldsSchema).min(1, { message: "At least one field is required" }),
  mandatory: booleanValidation().default(false).optional(),
  is_visible: booleanValidation().default(true).optional(),
});

export const addPasswordCategorySchema = rootPasswordCategorySchema.pick({
  category_name: true,
  fields: true,
  is_visible: true,
});

export type AddPasswordCategorySchemaType = z.infer<typeof addPasswordCategorySchema>;
