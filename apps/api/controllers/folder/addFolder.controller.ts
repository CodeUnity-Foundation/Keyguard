import { Folder } from "@keyguard/database";
import { AddFolderSchemaType } from "@keyguard/database/zod";
import { TRPCError } from "@trpc/server";

import { TRPCContext } from "../../trpc/createContext";

type AddFolderProps = {
  input: AddFolderSchemaType;
  ctx: TRPCContext;
};

export const addFolderController = async ({ input, ctx }: AddFolderProps) => {
  const authedUser = ctx?.user;

  const folderNameRegex = new RegExp(`^${input.folder_name}(?![-\\d]).*$`, "i");

  const isFolderExisted = await Folder.findOne({
    folder_name: { $regex: folderNameRegex },
    user_id: authedUser?._id,
  });

  if (isFolderExisted) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Folder already exists." });
  }

  const newFolder = new Folder({
    folder_name: input.folder_name.trim(),
    user_id: authedUser?._id,
  });

  await newFolder.save();

  return {
    status: 200,
    success: true,
    message: "Folder created successfully.",
  };
};
