import { addFolderSchema } from "@keyguard/database/zod";

import { masterProtectedProcedure } from "../../procedures/authProcedure";
import { router } from "../../trpc/trpc";
import { addFolderController } from "./addFolder.controller";
import { getAllFolderController } from "./getAllFolders.controller";

export const folderRouter = router({
  "get-all-folders": masterProtectedProcedure.query(async ({ ctx }) => getAllFolderController({ ctx })),

  "add-folder": masterProtectedProcedure
    .input(addFolderSchema)
    .mutation(async ({ input, ctx }) => addFolderController({ input, ctx })),

  //   "edit-folder": masterProtectedProcedure
  //     .input(editFolderSchema)
  //     .mutation(async ({ input, ctx }) => editFolderController({ input, ctx })),

  //   "delete-folder": masterProtectedProcedure
  //     .input(deleteFolderSchema)
  //     .mutation(async ({ input, ctx }) => deleteFolderController({ input, ctx })),
});
