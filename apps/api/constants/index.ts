export const DEFAULT_OTP_TIME_LIMIT = 60;

export const TWO = 2;

export const SIXTY = 60;

export const THOUSAND = 1000;

export const otpExpireTime = new Date(Date.now() + TWO * SIXTY * THOUSAND); // 2 minutes from now

/**
 * Check if otp time limit is expired or not
 * @param storedOTPExpiry - stored otp expiry time from db
 * @param isForResendOtp - if true then check for resend otp time limit else check for otp time limit
 * @returns boolean
 */
export const verifyOTPTimeLimit = (storedOTPExpiry: Date, isForResendOtp = false): boolean => {
  const otpSendTime = storedOTPExpiry.getTime(),
    currentTime = new Date().getTime(),
    OTP_TIME_LIMIT = DEFAULT_OTP_TIME_LIMIT * THOUSAND,
    expiryTime = otpSendTime + OTP_TIME_LIMIT;

  return isForResendOtp ? currentTime < expiryTime : currentTime > expiryTime;
};

// Common messages
export const Response = {
  USER_NOT_FOUND: "User not found. Please check your credentials and try again.",
  USER_ALREADY_EXISTS: "User already exists. Please choose a different username or email.",
  INVALID_CREDENTIALS: "Invalid credentials.",
  USER_ALREADY_VERIFIED: "User already verified. No further action is needed.",
  USER_NOT_VERIFIED: "Verify the user first before proceeding.",
  PASSWORD_NOT_MATCHED: "Passwords do not match. Please ensure both passwords are the same.",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
  PASSWORD_RESET_EMAIL_SENT: "Password reset email sent successfully.",
  RESET_LINK_EXPIRED: "Password reset link expired. Please try again.",
  OLD_PASSWORD_USED_AGAIN: "New password should not be same as old password.",
} as const;
