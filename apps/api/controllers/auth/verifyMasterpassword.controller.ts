import { sendAccountLoginSuccessEmail } from "@keyguard/emails";
import { IUser, userExisted, verifyPassword } from "@keyguard/lib/server";
import { VerifyMasterPasswordSchemaType } from "@keyguard/lib/validations";
import { TRPCError } from "@trpc/server";

import { Response } from "../../constants";
import { TRPCContext } from "../../createContext";
import { generateJWT } from "../../utils/generateJWT";

type VerifyMasterPasswordProps = {
  input: VerifyMasterPasswordSchemaType;
  ctx: TRPCContext;
};

// This api will call at masterpassword login time
export const verifyMasterPasswordController = async ({ input, ctx }: VerifyMasterPasswordProps) => {
  const { master_password } = input;

  const email = ctx.user?.email ?? "";

  const user = (await userExisted({ email })) as IUser;

  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: Response.USER_NOT_FOUND });
  }

  // verify the password
  if (user.master_password) {
    await verifyPassword({ password: master_password, existedPassword: user.master_password });
  }

  const accessToken = generateJWT({
    payload: { userId: user.email, email: user._id },
    duration: 3,
    durationUnit: "minutes",
  });

  // Send mail to user that account is logged in
  sendAccountLoginSuccessEmail({
    name: user.name,
    email: user.email,
    ip: ctx.req?.socket.remoteAddress ?? "",
    browser: ctx.req?.headers["user-agent"] ?? "",
    time: new Date().toLocaleString(),
  });

  return { success: true, message: `Welcome back, ${user.name}. Good to see you again.`, accessToken };
};
