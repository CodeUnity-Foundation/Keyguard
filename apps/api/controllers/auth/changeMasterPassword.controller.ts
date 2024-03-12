import { sendPasswordConfirmationEmail } from "@keyguard/emails";
import { ChangeMasterPasswordSchema } from "@keyguard/lib/validations";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

import { Response } from "../../constants";
import type { TRPCContext } from "../../createContext";
import User from "../../models/user";
import { comparePassword, userExisted } from "../../queries/user.query";

interface ChangePassword {
  input: ChangeMasterPasswordSchema;
  ctx: TRPCContext;
}

export const changeMasterPasswordController = async ({ input, ctx }: ChangePassword) => {
  const email = ctx.user?.email ?? "";
  const { current_master_password, new_master_password, confirm_new_master_password } = input;

  const user = await userExisted({ email });

  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.USER_NOT_FOUND });
  }

  const isCurrentMasterPasswordMatched = await bcrypt.compare(
    current_master_password,
    user.master_password ?? ""
  );
  if (!isCurrentMasterPasswordMatched) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.INVALID_CREDENTIALS });
  }

  comparePassword({ password: new_master_password, confirmPassword: confirm_new_master_password });

  if (current_master_password === new_master_password) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.OLD_PASSWORD_USED_AGAIN });
  }

  const hashedMasterPassword = await bcrypt.hash(new_master_password, 10);
  await User.updateOne(
    { email },
    {
      $set: {
        master_password: hashedMasterPassword,
      },
    }
  );

  // send email to user
  sendPasswordConfirmationEmail({
    name: user.name,
    email: user.email,
    type: "update_master_password",
  });

  return { status: 200, success: true, message: "Master password changed successfully!" };
};
