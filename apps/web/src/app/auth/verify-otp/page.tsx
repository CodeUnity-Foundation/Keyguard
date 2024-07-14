import VerifyOtpForm from "@keyguard/web/components/auth/VerifyOtpForm";

import AuthLayout from "../auth.layout";

export const metadata = {
  title: {
    template: "%s | Keyguard",
    default: "User verification",
  },
  description: "Enter the OTP sent to your email and verify your account",
};

export default function VerifyOtp() {
  return (
    <AuthLayout
      key={"verifyotp"}
      form={<VerifyOtpForm />}
      title="User verification"
      subtitle="Enter the OTP sent to your email and verify your account"
    />
  );
}
