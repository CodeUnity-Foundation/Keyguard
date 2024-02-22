import { Button, Input } from "@vaultmaster/ui";
import { IoKeyOutline } from "react-icons/io5";

export default function LoginMasterForm() {
  return (
    <form className="flex flex-col">
      <Input
        id="password"
        name="password"
        type="password"
        label="Master Password"
        placeholder="******"
        icon={<IoKeyOutline className="text-primary h-[16px] w-[16px]" />}
      />

      <Button className="mt-2" size={"lg"}>
        Login
      </Button>
    </form>
  );
}
