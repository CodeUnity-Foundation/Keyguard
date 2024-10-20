import z from "zod";

import { stringValidation } from "./common";

export const rootPasswordSchema = z.object({
  password_id: stringValidation("Password id is required"),
  name: stringValidation("Name is required"),
  user_id: stringValidation("User id is required"),
  //   password_policy_id: stringValidation("Password policy id is required"),
  folder_id: stringValidation().optional(),
  password_category_id: stringValidation("Password category id is required"),
  notes: stringValidation().optional(),
});

export const addPasswordSchema = rootPasswordSchema.pick({
  password_id: true,
  name: true,
  user_id: true,
  //   password_policy_id: true,
  folder_id: true,
  password_category_id: true,
  notes: true,
});

export type AddPasswordSchemaType = z.infer<typeof addPasswordSchema>;
