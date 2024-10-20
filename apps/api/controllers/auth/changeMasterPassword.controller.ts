import { User, comparePassword, userExisted } from "@keyguard/database";
import { ChangeMasterPasswordSchema } from "@keyguard/database/zod";
import { sendPasswordConfirmationEmail } from "@keyguard/emails";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

import { Response } from "../../constants";
import type { TRPCContext } from "../../trpc/createContext";

interface ChangePassword {
  input: ChangeMasterPasswordSchema;
  ctx: TRPCContext;
}

export const changeMasterPasswordController = async ({ input, ctx }: ChangePassword) => {
  const email = ctx.user?.email ?? "";
  const { current_master_password, master_password, confirm_master_password } = input;

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

  comparePassword({ password: master_password, confirmPassword: confirm_master_password });

  if (current_master_password === master_password) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.OLD_PASSWORD_USED_AGAIN });
  }

  const hashedMasterPassword = await bcrypt.hash(master_password, 10);
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
