import z from "zod";

import { booleanValidation, stringValidation } from "./common";
import { addDynamicFieldsSchema } from "./dynamicFields";

export const rootPasswordCategorySchema = z.object({
  category_id: stringValidation("Category id is required"),
  category_name: stringValidation("Name is required"),
  is_default: booleanValidation(),
  fields: z.array(addDynamicFieldsSchema).min(1, { message: "At least one field is required" }),
  is_visible: booleanValidation().default(true).optional(),
});

export const addPasswordCategorySchema = rootPasswordCategorySchema.pick({
  category_name: true,
  is_default: true,
  fields: true,
  is_visible: true,
});

export type AddPasswordCategorySchemaType = z.infer<typeof addPasswordCategorySchema>;

export const editPasswordCategorySchema = rootPasswordCategorySchema
  .pick({
    category_name: true,
    is_default: true,
    is_visible: true,
  })
  .partial()
  .extend({
    category_id: rootPasswordCategorySchema.shape.category_id,
    fields: rootPasswordCategorySchema.shape.fields,
  });

export type EditPasswordCategorySchemaType = z.infer<typeof editPasswordCategorySchema>;

export const deletePasswordCategorySchema = rootPasswordCategorySchema.pick({
  category_id: true,
});

export type DeletePasswordCategorySchemaType = z.infer<typeof deletePasswordCategorySchema>;
