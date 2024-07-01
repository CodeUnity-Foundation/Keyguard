import SignupForm from "@keyguard/web/components/auth/SignupForm";
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
      key={"signup"}
      form={<SignupForm />}
      title="Welcome to Keyguard"
      subtitle="Sign up to get started"
    />
  );
}
