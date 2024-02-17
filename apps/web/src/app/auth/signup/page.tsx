import React from 'react';
import Image from 'next/image';
import AuthLayout from '@web/components/auth';
import SignupForm from '@web/components/auth/SignupForm';

export default function Signup() {
  return (
    <AuthLayout
      leftPanelChild={
        <div>
          <Image src="/logo.png" alt="signup-page" width={100} height={100} />
        </div>
      }
      rightPanelChild={
        <div className="flex flex-col w-2/4 h-full justify-center">
          <div>
            <h1 className="font-medium text-2xl">Welcome to VaultMaster</h1>
            <p className="text-muted-foreground text-lg font-medium mb-5">Sign up to get started</p>
          </div>
          <SignupForm />
          <p className="text-center text-input">
            Powered by <span className="text-primary">CodeUnity Foundation</span>
          </p>
        </div>
      }
    />
  );
}
