import { checkUserVerifiedStatus, userExisted } from "@keyguard/database";
import { EmailInputSchemaType } from "@keyguard/database/zod";
import { sendOTPVarificationEmail } from "@keyguard/emails";
import { addDateTime } from "@keyguard/lib";
import { TRPCError } from "@trpc/server";

import { Response, TWO, checkOTPExpire } from "../../constants";
import { generateOTP } from "../../utils/generateOTP";

type ResendOTPProps = {
  input: EmailInputSchemaType;
};

export const resendOTPController = async ({ input }: ResendOTPProps) => {
  const user = await userExisted({ email: input.email });

  if (!user) throw new TRPCError({ code: "NOT_FOUND", message: Response.USER_NOT_FOUND });

  const isUserVerified = await checkUserVerifiedStatus({ email: user.email });

  if (isUserVerified) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.USER_ALREADY_VERIFIED });
  }

  const otp = generateOTP();

  const { emailVerification } = user;

  if (
    emailVerification?.otp &&
    emailVerification.otp_expiry &&
    checkOTPExpire(emailVerification.otp_expiry, true)
  ) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "OTP already sent!" });
  }

  user.emailVerification = {
    otp: otp,
    otp_expiry: addDateTime(TWO, "minutes") as unknown as Date,
  };

  await sendOTPVarificationEmail({
    name: user.name,
    email: user.email,
    otp: otp,
    expire: "2 minutes",
  });

  await user.save();

  return { status: 200, success: true, message: "OTP sent successfully!" };
};
