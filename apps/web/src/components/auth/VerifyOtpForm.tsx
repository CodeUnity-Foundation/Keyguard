"use client";

import { Button, Input } from "@vaultmaster/ui";
import Link from "next/link";
import OtpInput from "react-otp-input";

export default function VerifyOtpForm() {
  return (
    <form className="flex flex-col">
      <OtpInput
        numInputs={6}
        value={"123456"}
        onChange={() => {}}
        renderSeparator={<span>&nbsp;</span>}
        containerStyle={"flex justify-between w-full"}
        renderInput={(props) => <Input {...props} className="w-10" />}
      />

      <div className="my-2 flex items-center justify-between">
        <p className="text-muted-500 dark:text-muted-200 text-xs font-medium lg:text-sm">
          Didn't receive the OTP?
          <Link href="#" className="text-primary ml-1 font-semibold">
            Resend OTP
          </Link>
        </p>
      </div>

      <Button className="mt-2" size={"lg"}>
        Verify
      </Button>
    </form>
  );
}
