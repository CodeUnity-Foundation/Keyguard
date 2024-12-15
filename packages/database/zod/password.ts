import z, { string } from "zod";

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

export const addPasswordSchema = rootPasswordSchema
  .pick({
    name: true,
    password_category_id: true,
    //   password_policy_id: true,
    folder_id: true,
    notes: true,
  })
  .extend({
    fields: z.record(z.string()),
  });

export type AddPasswordSchemaType = z.infer<typeof addPasswordSchema>;
