import { TRPCError } from "@trpc/server";
import { logger } from "@vaultmaster/lib/logger";
import jwt from "jsonwebtoken";

import { UserJWTData } from "../../@types";
import { JWT_SECRET } from "../../config";
import { Response } from "../../constants";
import { TRPCContext } from "../../createContext";
import { IUser } from "../../models/types";
import User from "../../models/user";

interface ValidLinkForResetPassword {
  ctx: TRPCContext;
}

export const checkValidLinkForResetPassword = async ({ ctx }: ValidLinkForResetPassword) => {
  const token = ctx.req?.query.requestToken as string;

  if (!token) {
    throw new TRPCError({ code: "FORBIDDEN", message: Response.RESET_LINK_EXPIRED });
  }

  let decoded: UserJWTData | null = null;

  try {
    decoded = jwt.verify(token, JWT_SECRET) as UserJWTData;
  } catch (error) {
    logger.error("Invalid token! =>", error);
    throw new TRPCError({ code: "FORBIDDEN", message: Response.RESET_LINK_EXPIRED });
  }

  if (!decoded) {
    throw new TRPCError({ code: "FORBIDDEN", message: Response.RESET_LINK_EXPIRED });
  }

  const user = (await User.findOne({ email: decoded.email, _id: decoded.userId })) as IUser;

  if (!user) {
    throw new TRPCError({ code: "FORBIDDEN", message: Response.RESET_LINK_EXPIRED });
  }

  if (user.isLinkExpired) {
    throw new TRPCError({ code: "FORBIDDEN", message: Response.RESET_LINK_EXPIRED });
  }

  return true;
};
