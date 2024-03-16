"use client";

import { Button, Input } from "@keyguard/ui";
import { IoKeyOutline } from "react-icons/io5";

export default function SetMasterForm() {
  return (
    <form className="flex flex-col">
      <Input
        id="master_password"
        name="master_password"
        type="password"
        label="Master Password"
        placeholder="******"
        icon={<IoKeyOutline />}
        autoComplete="off"
      />

      <Input
        id="confirm_master_password"
        name="confirm_master_password"
        type="password"
        label="Confirm Master Password"
        placeholder="******"
        icon={<IoKeyOutline />}
        autoComplete="off"
      />

      <Button className="mt-2" size={"lg"}>
        Join now
      </Button>
    </form>
  );
}
