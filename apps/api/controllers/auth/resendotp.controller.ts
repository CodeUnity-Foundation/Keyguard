import { sendOTPVarificationEmail } from "@keyguard/emails";
import { TRPCError } from "@trpc/server";

import { Response, otpExpireTime, verifyOTPTimeLimit } from "../../constants";
import { checkUserVerifiedStatus, userExisted } from "../../queries/user.query";
import { generateOTP } from "../../utils/generateOTP";
import { EmailInputSchemaType } from "./authSchema";

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
    verifyOTPTimeLimit(emailVerification.otp_expiry, true)
  ) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "OTP already sent!" });
  }

  user.emailVerification = {
    otp: +otp,
    otp_expiry: otpExpireTime,
  };

  await sendOTPVarificationEmail({
    name: user.name,
    email: user.email,
    otp: otp,
    expire: "2 minutes",
  });

  await user.save();

  return { success: true, message: "OTP sent successfully!" };
};
