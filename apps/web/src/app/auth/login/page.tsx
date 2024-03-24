import LoginImage from "@keyguard/web/assets/auth.svg";
import logo from "@keyguard/web/assets/icon.png";
import LoginForm from "@keyguard/web/components/auth/LoginForm";
import React from "react";

import AuthLayout from "../auth.layout";

export const metadata = {
  title: {
    template: "%s | Keyguard",
    default: "Login",
  },
  description: "Login to Keyguard",
};

export default function Signup() {
  return (
    <AuthLayout
      logo={logo}
      key={"login"}
      form={<LoginForm />}
      authPageImage={LoginImage}
      title="Welcome back"
      subtitle="Login to continue with Keyguard"
    />
  );
}
