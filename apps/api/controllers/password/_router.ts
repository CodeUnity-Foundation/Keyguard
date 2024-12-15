import { addPasswordSchema } from "@keyguard/database/zod";

import { masterProtectedProcedure } from "../../procedures/authProcedure";
import { router } from "../../trpc/trpc";
import { addPasswordController } from "./addPassword.controller";

export const passwordRouter = router({
  // getAllPasswords: masterProtectedProcedure.query(async () => addPasswordController({ input })),

  "add-password": masterProtectedProcedure
    .input(addPasswordSchema)
    .mutation(async ({ input, ctx }) => addPasswordController({ input, ctx })),
});
