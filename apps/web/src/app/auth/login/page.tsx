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
      key={"login"}
      form={<LoginForm />}
      title="Welcome back"
      subtitle="Login to continue with Keyguard"
    />
  );
}
