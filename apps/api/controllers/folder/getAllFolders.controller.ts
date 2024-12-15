import { Folder } from "@keyguard/database";

import { TRPCContext } from "../../trpc/createContext";
import { MetaDataInterface } from "../../types";

type GetAllFoldersProps = {
  ctx: TRPCContext;
};

export const getAllFolderController = async ({ ctx }: GetAllFoldersProps) => {
  const authedUser = ctx?.user;

  const query = ctx.req?.query;

  const page: number = Number(query?.page) || 1;

  const limit: number = Number(query?.limit) || 10;

  const folders = await Folder.find({ user_id: authedUser?._id })
    .limit(limit)
    .skip((page - 1) * limit);

  const total_data = await Folder.countDocuments({ user_id: authedUser?._id });

  const meta_data: MetaDataInterface = {
    current_page: page,
    limit,
    total_data,
    total_pages: Math.ceil(total_data / limit),
  };

  return {
    status: 200,
    success: true,
    message: "Folders fetched successfully",
    data: folders,
    meta_data,
  };
};
