import { IUser, comparePassword, mongoclient, userExisted } from "@keyguard/database";
import { MasterPasswordSchemaType } from "@keyguard/database/zod";
import { sendPasswordConfirmationEmail } from "@keyguard/emails";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

import { Response } from "../../constants";
import { TRPCContext } from "../../createContext";
import { generateJWT } from "../../utils/generateJWT";

type MasterPasswordProps = {
  input: MasterPasswordSchemaType;
  ctx: TRPCContext;
};

export const createMasterPasswordController = async ({ input, ctx }: MasterPasswordProps) => {
  const { master_password, confirm_master_password } = input;

  comparePassword({ password: master_password, confirmPassword: confirm_master_password });

  const email = ctx.user?.email ?? "";

  const user = (await userExisted({ email })) as IUser;

  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: Response.USER_NOT_FOUND });
  }

  const accessToken = generateJWT({
    payload: { userId: user._id, email: user.email },
    duration: 3,
    durationUnit: "minutes",
  });

  // first time user set the master password
  if (!user.master_password && master_password) {
    const hashedPassword = await bcrypt.hash(master_password, 10);

    await mongoclient.user.updateOne(
      { _id: user._id },
      {
        $set: {
          master_password: hashedPassword,
        },
      }
    );

    // send email to user
    sendPasswordConfirmationEmail({
      name: user.name,
      email: user.email,
      type: "create_master_password",
    });
  }

  return { success: true, message: "Master password set successfully!", accessToken };
};
