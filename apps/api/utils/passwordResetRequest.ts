import { IUser } from "@keyguard/database";
import { sendPasswordResetLink } from "@keyguard/emails";

import { generateJWT } from "./generateJWT";

export const passwordResetRequest = async (user: IUser) => {
  const resetToken = generateJWT({
    payload: {
      userId: user._id,
      email: user.email,
    },
    duration: 2,
    durationUnit: "minutes",
  });

  // generate password reset link
  const passwordResetLink = `${process.env.NEXT_PUBLIC_WEBAPP_URL}/auth/forgot-password/${resetToken}`;

  // send password reset link to user
  const mailResponse = await sendPasswordResetLink({
    name: user.name,
    email: user.email,
    resetLink: passwordResetLink,
    expire: 2,
  });

  return mailResponse;
};
