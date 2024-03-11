import { sendPasswordConfirmationEmail } from "@keyguard/emails";
import { logger } from "@keyguard/lib/logger";
import { ChangePasswordSchemaType, ResetPasswordSchemaType } from "@keyguard/lib/validations";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserJWTData } from "../../@types";
import { JWT_SECRET } from "../../config";
import { Response } from "../../constants";
import type { TRPCContext } from "../../createContext";
import User from "../../models/user";
import { comparePassword, userExisted } from "../../queries/user.query";

interface ChangePassword {
  input: ChangePasswordSchemaType;
  ctx: TRPCContext;
}

export const changePasswordController = async ({ input, ctx }: ChangePassword) => {
  const email = ctx.user?.email ?? "";
  const { current_password, password, confirm_password } = input;

  const user = await userExisted({ email });

  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.USER_NOT_FOUND });
  }

  const isCurrentPasswordMatched = await bcrypt.compare(current_password, user.password);
  if (!isCurrentPasswordMatched) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.INVALID_CREDENTIALS });
  }

  comparePassword({ password, confirmPassword: confirm_password });

  if (current_password === password) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.OLD_PASSWORD_USED_AGAIN });
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  await User.updateOne(
    { email },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  // send email to user
  sendPasswordConfirmationEmail({
    name: user.name,
    email: user.email,
    type: "update_password",
  });

  return { status: 200, success: true, message: "Password changed successfully!" };
};
