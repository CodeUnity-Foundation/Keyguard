import z from "zod";

import { booleanValidation, stringValidation } from "./common";

export const rootFolderSchema = z.object({
  folder_id: stringValidation("Folder id is required"),
  folder_name: stringValidation("Name is required"),
  user_id: stringValidation("User id is required"),
});

export const addFolderSchema = rootFolderSchema.pick({
  folder_name: true,
});

export type AddFolderSchemaType = z.infer<typeof addFolderSchema>;

export const getFolderSchema = rootFolderSchema.pick({
  folder_id: true,
});

export type GetFolderSchemaType = z.infer<typeof getFolderSchema>;
