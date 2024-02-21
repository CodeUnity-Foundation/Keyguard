export function generateOTP(): string {
  const digits = "0123456789";
  let otp = "",
    otp_length = 6;

  for (let i = 0; i < otp_length; i++) {
    let index = Math.floor(Math.random() * digits.length);
    otp += digits[index];
  }
  return otp;
}
