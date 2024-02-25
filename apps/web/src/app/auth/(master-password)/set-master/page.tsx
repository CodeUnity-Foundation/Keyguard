import logo from "@keyguard/web/assets/icon.png";
import MasterPasswordImage from "@keyguard/web/assets/masterpassword.svg";
import SetMasterForm from "@keyguard/web/components/auth/MasterPassword/SetMasterForm";

import AuthLayout from "../../auth.layout";

export default function MasterPassword() {
  return (
    <AuthLayout
      logo={logo}
      key={"create-master-password"}
      form={<SetMasterForm />}
      authPageImage={MasterPasswordImage}
      title="Set new master password"
      subtitle="Create a strong master password to add one more layer to your vault"
    />
  );
}
