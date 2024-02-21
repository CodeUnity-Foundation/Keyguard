import SignupImage from "@web/assets/auth.svg";
import logo from "@web/assets/icon.png";
import SignupForm from "@web/components/auth/SignupForm";
import React from "react";

import AuthLayout from "../AuthLayout";

export const metadata = {
  title: {
    template: "%s | VaultMaster",
    default: "Sign up",
  },
  description: "Create a new account to get started with VaultMaster",
};

export default function Signup() {
  return (
    <AuthLayout
      logo={logo}
      key={"signup"}
      form={<SignupForm />}
      authPageImage={SignupImage}
      title="Welcome to VaultMaster"
      subtitle="Sign up to get started"
    />
  );
}
