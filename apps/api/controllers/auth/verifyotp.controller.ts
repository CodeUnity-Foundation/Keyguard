import { checkUserVerifiedStatus, userExisted } from "@keyguard/database";
import { OTPSchemaType } from "@keyguard/database/zod";
import { TRPCError } from "@trpc/server";

import { Response, checkOTPExpire } from "../../constants";

type VerifyOTPProps = {
  input: OTPSchemaType;
};

export const verifyOTPController = async ({ input }: VerifyOTPProps) => {
  const { email, otp } = input;

  const user = await userExisted({ email });

  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "User does not exist!" });
  }

  const isUserVerified = await checkUserVerifiedStatus({ email: user.email });

  if (isUserVerified) {
    throw new TRPCError({ code: "BAD_REQUEST", message: Response.USER_ALREADY_VERIFIED });
  }

  const { email_verification } = user;

  if (!email_verification) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "OTP not found!" });
  }

  const { otp: storedOTP, otp_expiry: storedOTPExpiry } = email_verification;

  if (checkOTPExpire(storedOTPExpiry)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "OTP expired!" });
  }

  if (otp !== storedOTP) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid OTP!" });
  }

  user.is_verified = true;
  user.email_verification = null;

  await user.save();

  return { status: 200, success: true, message: "OTP verified successfully" };
};
