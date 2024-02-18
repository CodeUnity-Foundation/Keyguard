import { Button, Input } from '@vaultmaster/ui';
import Link from 'next/link';
import { AiTwotoneMail } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoKeyOutline } from 'react-icons/io5';

export default function SignupForm() {
  return (
    <form className="flex flex-col">
      <Input
        id="name"
        name="name"
        type="text"
        label="Name"
        placeholder="John Doe"
        icon={<BsFillPersonFill className="h-[16px] w-[16px] text-primary" />}
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        icon={<AiTwotoneMail className="h-[16px] w-[16px] text-primary" />}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="******"
        icon={<IoKeyOutline className="h-[16px] w-[16px] text-primary" />}
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="******"
        icon={<IoKeyOutline className="h-[16px] w-[16px] text-primary" />}
      />

      <div className="flex items-center justify-between my-2">
        <p className="text-muted-500 lg:text-sm text-xs font-medium dark:text-muted-200">
          Already have an account?{' '}
          <Link href="#" className="text-primary font-semibold">
            Login
          </Link>
        </p>
        <Link href="#" className="text-primary lg:text-sm text-xs font-semibold">
          Forgot password?
        </Link>
      </div>

      <Button className="mt-2" size={'lg'}>
        Next
      </Button>
    </form>
  );
}
