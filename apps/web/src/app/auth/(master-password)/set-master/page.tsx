import SetMasterForm from "@keyguard/web/app/auth/components/set-master-form";

import AuthLayout from "../../auth.layout";

export default function MasterPassword() {
  return (
    <AuthLayout
      key={"create-master-password"}
      form={<SetMasterForm />}
      title="Set new master password"
      subtitle="Create a strong master password to add one more layer to your vault"
    />
  );
}
