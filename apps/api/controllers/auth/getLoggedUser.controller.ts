import { JWT_SECRET, sanatizedUser } from "@keyguard/database";
import { logger } from "@keyguard/lib";
import { TRPCError } from "@trpc/server";
import { UserJWTData } from "@types";
import jwt from "jsonwebtoken";

import { TRPCContext } from "../../createContext";

type LoggedUser = {
  ctx: TRPCContext;
};

export const getLoggedUser = async ({ ctx }: LoggedUser) => {
  const token = ctx.req?.query.authToken as string;

  let decoded: UserJWTData | null = null;

  try {
    decoded = jwt.verify(token, JWT_SECRET) as UserJWTData;
  } catch (error) {
    logger.error("Invalid token! =>", error);
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const user = await sanatizedUser({ email: decoded.email });
  return { success: 200, user };
};
