import {
  IUser,
  checkUserVerifiedStatus,
  sanatizedUser,
  userExisted,
  verifyPassword,
} from "@keyguard/database";
import { LoginSchemaType } from "@keyguard/database/zod";
import { TRPCError } from "@trpc/server";

import { Response } from "../../constants";
import { generateJWT } from "../../utils/generateJWT";

type LoginProps = {
  input: LoginSchemaType;
};

export const loginController = async ({ input }: LoginProps) => {
  const user = await userExisted({ email: input.email });

  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: Response.INVALID_CREDENTIALS });
  }

  const token = generateJWT({
    payload: { userId: user._id, email: user.email },
    duration: !input.is_remember ? 1 : 7,
    durationUnit: "days",
  });

  const isUserVerified = await checkUserVerifiedStatus({ email: user.email });

  const userResponse = (await sanatizedUser({ email: user.email })) as IUser;

  if (!isUserVerified) {
    return { status: 302, success: true, message: Response.USER_NOT_VERIFIED, token, user: userResponse };
  }

  // verify the password
  await verifyPassword({ password: input.password, existedPassword: user.password });

  return { status: 200, success: true, message: "Login successfully!", token, user: userResponse };
};
