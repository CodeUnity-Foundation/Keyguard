import SignupImage from "@web/assets/auth.svg";
import logo from "@web/assets/icon.png";
import SignupForm from "@web/components/auth/SignupForm";
import React from "react";

import AuthLayout from "../auth.layout";

export const metadata = {
  title: {
    template: "%s | Keyguard",
    default: "Sign up",
  },
  description: "Create a new account to get started with Keyguard",
};

export default function Signup() {
  return (
    <AuthLayout
      logo={logo}
      key={"signup"}
      form={<SignupForm />}
      authPageImage={SignupImage}
      title="Welcome to Keyguard"
      subtitle="Sign up to get started"
    />
  );
}
