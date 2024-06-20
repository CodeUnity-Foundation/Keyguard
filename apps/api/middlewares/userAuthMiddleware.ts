import { checkUserVerifiedStatus, userExisted } from "@keyguard/database";
import { logger } from "@keyguard/lib";
import { TRPCError } from "@trpc/server";
import Jwt from "jsonwebtoken";

import { Response } from "../constants";
import { middleware } from "../trpc";
import { UserJWTData } from "./type";

export const userAuthMiddleware = middleware(async ({ ctx, next }) => {
  let authToken: string = ctx.req?.headers["authorization"] ?? "";

  if (!authToken) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: Response.UNAUTHORIZED });
  }

  authToken = authToken.replace("Bearer ", "");

  let decoded: UserJWTData;
  try {
    decoded = Jwt.verify(authToken, process.env.JWT_SECRET!) as UserJWTData;
  } catch (error) {
    logger.error("Invalid token from userAuthMiddleWare! =>", error);
    throw new TRPCError({ code: "UNAUTHORIZED", message: Response.UNAUTHORIZED });
  }

  const user = await userExisted({ email: decoded.email });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: Response.UNAUTHORIZED });
  }

  const isUserVerified = await checkUserVerifiedStatus({ email: user.email });

  if (!isUserVerified) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.USER_NOT_VERIFIED });
  }

  ctx.user = user;

  return next();
});
