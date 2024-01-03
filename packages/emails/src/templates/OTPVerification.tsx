import React from 'react';

// otp verification template
export const OTPVerification = ({ otp }: { otp: string }) => {
  return (
    <div>
      <h1>OTP Verification {otp}</h1>
    </div>
  );
};
