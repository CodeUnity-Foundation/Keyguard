import logo from "@web/assets/icon.png";
import VerifyOtpImage from "@web/assets/otp.svg";
import VerifyOtpForm from "@web/components/auth/VerifyOtpForm";

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
