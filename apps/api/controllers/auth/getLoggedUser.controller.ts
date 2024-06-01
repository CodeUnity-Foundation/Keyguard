import { IUser, sanatizedUser } from "@keyguard/database";
import { logger } from "@keyguard/lib";
import { TRPCError } from "@trpc/server";
import { UserJWTData } from "@types";
import jwt from "jsonwebtoken";

import { TRPCContext } from "../../createContext";

type LoggedUser = {
  ctx: TRPCContext;
};

export const getLoggedUser = async ({ ctx }: LoggedUser) => {
  let token = ctx.req?.headers.authorization || (ctx.req?.query.authToken as string);

  token = token.replace("Bearer ", "");

  let decoded: UserJWTData | null = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserJWTData;
  } catch (error) {
    logger.error("Invalid token! =>", error);
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const user = (await sanatizedUser({ email: decoded.email })) as IUser;
  return { success: 200, user };
};
