import { sendPasswordConfirmationEmail } from "@keyguard/emails";
import { logger } from "@keyguard/lib";
import { User, comparePassword, userExisted } from "@keyguard/lib/server";
import { ResetPasswordSchemaType } from "@keyguard/lib/validations";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserJWTData } from "../../@types";
import { JWT_SECRET } from "../../config";
import { Response } from "../../constants";

interface ResetPassword {
  input: ResetPasswordSchemaType;
}

export const resetPasswordController = async ({ input }: ResetPassword) => {
  let decode: UserJWTData | null = null;

  try {
    decode = jwt.verify(input.requestToken, JWT_SECRET) as UserJWTData;
  } catch (error) {
    logger.error("Error in resetPasswordController: ", error);
    throw new TRPCError({ code: "FORBIDDEN", message: Response.RESET_LINK_EXPIRED });
  }

  if (!decode) {
    throw new TRPCError({ code: "FORBIDDEN", message: Response.RESET_LINK_EXPIRED });
  }

  const user = await userExisted({ email: decode.email });

  if (!user) {
    throw new TRPCError({ code: "FORBIDDEN", message: Response.RESET_LINK_EXPIRED });
  }

  comparePassword({ password: input.password, confirmPassword: input.confirm_password });

  const hashedPassword = await bcrypt.hash(input.password, 10);

  await User.updateOne(
    { email: decode.email },
    {
      $set: {
        password: hashedPassword,
        isLinkExpired: true,
      },
    }
  );

  // send email to user
  sendPasswordConfirmationEmail({
    name: user.name,
    email: user.email,
    type: "update_password",
  });

  return { success: true, message: "Password reset successfully!" };
};
