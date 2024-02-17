import { Button, Input } from '@vaultmaster/ui';
import { AiTwotoneMail } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoKeyOutline } from 'react-icons/io5';

export default function SignupForm() {
  return (
    <form className="flex flex-col">
      <Input
        type="text"
        label="Name"
        placeholder="John Doe"
        icon={<BsFillPersonFill className="h-[16px] w-[16px] text-primary" />}
      />

      <Input
        type="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        icon={<AiTwotoneMail className="h-[16px] w-[16px] text-primary" />}
      />

      <Input
        type="password"
        label="Password"
        placeholder="******"
        icon={<IoKeyOutline className="h-[16px] w-[16px] text-primary" />}
      />

      <Input
        type="password"
        label="Confirm password"
        placeholder="******"
        icon={<IoKeyOutline className="h-[16px] w-[16px] text-primary" />}
      />

      <Button className="mt-2" size={'lg'}>
        Next
      </Button>
    </form>
  );
}
