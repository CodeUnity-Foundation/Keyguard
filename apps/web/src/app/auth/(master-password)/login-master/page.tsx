import MasterPasswordImage from "@keyguard/web/assets/masterpassword.svg";
import LoginMasterForm from "@keyguard/web/components/auth/MasterPassword/LoginMasterForm";

import AuthLayout from "../../auth.layout";

export default function MasterPassword() {
  return (
    <AuthLayout
      key={"login-master-password"}
      form={<LoginMasterForm />}
      authPageImage={MasterPasswordImage}
      title="Login master password"
      subtitle="Enter your master password to get access of your vault"
    />
  );
}
