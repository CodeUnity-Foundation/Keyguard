import crypto from "crypto";

export function generateOTP(): string {
  const otp = crypto.randomInt(100000, 999999).toString();
  return otp;
}
