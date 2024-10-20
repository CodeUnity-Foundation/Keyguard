import z from "zod";

import { booleanValidation, stringValidation } from "./common";

export const rootDynamicFieldsSchema = z.object({
  field_name: stringValidation("Field name is required"),
  field_type: stringValidation("Field type is required"),
  field_value: stringValidation("Field value is required"),
  mandatory: booleanValidation(),
});

export const addDynamicFieldsSchema = rootDynamicFieldsSchema.pick({
  field_name: true,
  field_type: true,
  // field_value: true,
  mandatory: true,
});

export type AddDynamicFieldsSchemaType = z.infer<typeof addDynamicFieldsSchema>;
