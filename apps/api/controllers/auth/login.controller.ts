import { checkUserVerifiedStatus, userExisted, verifyPassword } from "@keyguard/lib/server";
import { LoginSchemaType } from "@keyguard/lib/validations";
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

  const isUserVerified = await checkUserVerifiedStatus({ email: user.email });

  if (!isUserVerified) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.USER_NOT_VERIFIED });
  }

  // verify the password
  await verifyPassword({ password: input.password, existedPassword: user.password });

  const token = generateJWT({
    payload: { userId: user._id, email: user.email },
    duration: !input.is_remember ? 1 : 7,
    durationUnit: "days",
  });

  return { status: 200, success: true, message: "Login successfully!", token };
};
