export const DEFAULT_OTP_TIME_LIMIT = 60;

export const TWO = 2;

export const SIXTY = 60;

export const THOUSAND = 1000;

export const verifyOTPTimeLimit = (otpTime: Date, isForResendOtp = false) => {
  const otpSendTime = otpTime.getTime(),
    currentTime = new Date().getTime(),
    OTP_TIME_LIMIT = DEFAULT_OTP_TIME_LIMIT * THOUSAND,
    expiryTime = otpSendTime + OTP_TIME_LIMIT;

  return isForResendOtp ? currentTime < expiryTime : currentTime > expiryTime;
};
