import { logger } from "@keyguard/lib";
import { TRPCError } from "@trpc/server";
import Jwt from "jsonwebtoken";

import { Response } from "../constants";
import { middleware } from "../trpc";

export const checkValidAccessToken = middleware(async ({ ctx, next }) => {
  const accessToken = ctx.req?.headers["x-access-token"] ?? "";

  if (!accessToken || accessToken.length === 0) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.SOMETHING_WENT_WRONG });
  }

  if (typeof accessToken === "string") {
    try {
      Jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    } catch (error) {
      logger.error("Invalid token from checkValidAccessToken! =>", error);
      throw new TRPCError({ code: "UNAUTHORIZED", message: Response.UNAUTHORIZED });
    }
  }

  return next();
});
