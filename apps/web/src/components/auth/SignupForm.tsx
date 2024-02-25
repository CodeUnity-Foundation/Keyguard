import { Button, Input } from "@keyguard/ui";
import Link from "next/link";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";

export default function SignupForm() {
  return (
    <form className="flex flex-col">
      <Input
        id="name"
        name="name"
        type="text"
        label="Name"
        placeholder="John Doe"
        icon={<BsFillPersonFill className="text-primary h-[16px] w-[16px]" />}
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        icon={<AiTwotoneMail className="text-primary h-[16px] w-[16px]" />}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="******"
        icon={<IoKeyOutline className="text-primary h-[16px] w-[16px]" />}
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="******"
        icon={<IoKeyOutline className="text-primary h-[16px] w-[16px]" />}
      />

      <div className="my-2 flex items-center justify-between">
        <p className="text-muted-500 dark:text-muted-200 text-xs font-medium lg:text-sm">
          Already have an account?
          <Link href="#" className="text-primary ml-1 font-semibold">
            Login
          </Link>
        </p>
        <Link href="#" className="text-primary text-xs font-semibold lg:text-sm">
          Forgot password?
        </Link>
      </div>

      <Button className="mt-2" size={"lg"}>
        Next
      </Button>
    </form>
  );
}
