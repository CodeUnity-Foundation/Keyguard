import { TRPCError } from "@trpc/server";

import { middleware } from "../trpc/trpc";

export const existedMasterPassword = middleware(async ({ ctx, next }) => {
  const user = ctx.user;

  if (user?.master_password) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Master password already exists!" });
  }

  return next();
});
