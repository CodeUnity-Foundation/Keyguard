'use client';

import Link from 'next/link';
import OtpInput from 'react-otp-input';
import { Button, Input } from '@vaultmaster/ui';

export default function VerifyOtpForm() {
  return (
    <form className="flex flex-col">
      <OtpInput
        numInputs={6}
        value={'123456'}
        onChange={() => {}}
        renderSeparator={<span>&nbsp;</span>}
        containerStyle={'flex justify-between w-full'}
        renderInput={(props) => <Input {...props} className="w-10" />}
      />

      <div className="flex items-center justify-between my-2">
        <p className="text-muted-500 lg:text-sm text-xs font-medium dark:text-muted-200">
          Didn't receive the OTP?
          <Link href="#" className="text-primary font-semibold ml-1">
            Resend OTP
          </Link>
        </p>
      </div>

      <Button className="mt-2" size={'lg'}>
        Verify
      </Button>
    </form>
  );
}
