export const DEFAULT_OTP_TIME_LIMIT = 60;

export const TWO = 2;

export const SIXTY = 60;

export const THOUSAND = 1000;

export const otpExpireTime = new Date(Date.now() + TWO * SIXTY * THOUSAND); // 2 minutes from now

export const verifyOTPTimeLimit = (storedOTPExpiry: Date, isForResendOtp = false) => {
  const otpSendTime = storedOTPExpiry.getTime(),
    currentTime = new Date().getTime(),
    OTP_TIME_LIMIT = DEFAULT_OTP_TIME_LIMIT * THOUSAND,
    expiryTime = otpSendTime + OTP_TIME_LIMIT;

  return isForResendOtp ? currentTime < expiryTime : currentTime > expiryTime;
};
