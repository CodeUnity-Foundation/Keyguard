import { User, comparePassword, userExisted } from "@keyguard/database";
import { ChangePasswordSchemaType } from "@keyguard/database/zod";
import { sendPasswordConfirmationEmail } from "@keyguard/emails";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

import { Response } from "../../constants";
import type { TRPCContext } from "../../trpc/createContext";

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
