import logo from '@web/assets/icon.png';
import AuthLayout from '../AuthLayout';
import VerifyOtpForm from '@web/components/auth/VerifyOtpForm';
import VerifyOtpImage from '@web/assets/otp.svg';

export default function VerifyOtp() {
  return (
    <AuthLayout
      logo={logo}
      key={'verifyotp'}
      form={<VerifyOtpForm />}
      authPageImage={VerifyOtpImage}
      title="Verify OTP"
      subtitle="Enter the OTP sent to your email"
    />
  );
}
