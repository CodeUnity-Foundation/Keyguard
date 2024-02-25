import logo from "@keyguard/web/assets/icon.png";
import VerifyOtpImage from "@keyguard/web/assets/otp.svg";
import VerifyOtpForm from "@keyguard/web/components/auth/VerifyOtpForm";

import AuthLayout from "../auth.layout";

export default function VerifyOtp() {
  return (
    <AuthLayout
      logo={logo}
      key={"verifyotp"}
      form={<VerifyOtpForm />}
      authPageImage={VerifyOtpImage}
      title="Verify OTP"
      subtitle="Enter the OTP sent to your email"
    />
  );
}
