import { IUser } from "@keyguard/database";
import { logger } from "@keyguard/lib";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";

import { Response } from "../../constants";
import { TRPCContext } from "../../trpc/createContext";
import { UserJWTData } from "../../types";
import { generateJWT } from "../../utils/generateJWT";

type RefreshTokenProps = {
  ctx: TRPCContext;
};

export const generateRefreshToken = async ({ ctx }: RefreshTokenProps) => {
  const loggedUser = ctx?.user as IUser;

  if (!loggedUser?.refreshToken) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: Response.UNAUTHORIZED });
  }

  let decode: UserJWTData | null = null;

  try {
    decode = jwt.verify(loggedUser.refreshToken, process.env.REFRESH_TOKEN_SECRET!) as UserJWTData;
  } catch (error) {
    logger.error("Error in generateRefreshToken: ", error);
    throw new TRPCError({ code: "UNAUTHORIZED", message: Response.UNAUTHORIZED });
  }

  let newAccessToken: string = "";

  if (decode.email === loggedUser.email) {
    newAccessToken = generateJWT({
      payload: { userId: loggedUser._id, email: loggedUser.email },
      secret: process.env.ACCESS_TOKEN_SECRET!,
      duration: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    });
  }

  return { status: 200, success: true, newAccessToken };
};
