import logo from "@web/assets/icon.png";
import MasterPasswordImage from "@web/assets/masterpassword.svg";
import LoginMasterForm from "@web/components/auth/MasterPassword/LoginMasterForm";

import AuthLayout from "../../auth.layout";

export default function MasterPassword() {
  return (
    <AuthLayout
      logo={logo}
      key={"login-master-password"}
      form={<LoginMasterForm />}
      authPageImage={MasterPasswordImage}
      title="Login master password"
      subtitle="Enter your master password to get access of your vault"
    />
  );
}
