import React from 'react';
import Image from 'next/image';
import AuthLayout from '@web/components/auth';
import SignupForm from '@web/components/auth/SignupForm';
import SignupImage from '@web/assets/auth.svg';

export default function Signup() {
  return (
    <AuthLayout
      leftPanelChild={
        <div className="flex flex-col w-full h-full justify-center items-center">
          <Image src={SignupImage} alt="VaultMaster" width={550} height={550} />
        </div>
      }
      rightPanelChild={
        <div className="flex flex-col lg:w-[60%] md:w-3/4 w-[350px] h-full justify-center">
          <div>
            <h1 className="font-medium lg:text-2xl text-xl">Welcome to VaultMaster</h1>
            <p className="text-muted-300 lg:text-lg text-base font-medium mb-5">Sign up to get started</p>
          </div>
          <SignupForm />
          <p className="text-center text-muted-500 dark:text-muted-200 font-medium mt-10 text-sm text-muted-300">
            Powered by <span className="text-primary">CodeUnity Foundation</span>
          </p>
        </div>
      }
    />
  );
}
