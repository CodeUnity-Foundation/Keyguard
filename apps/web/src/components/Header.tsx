import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
} from "@keyguard/ui";
import Logo from "@keyguard/web/assets/logo/symbol.png";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { RiMenu2Fill } from "react-icons/ri";

import { ThemeSwitcher } from "./theme-switcher";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 flex min-h-20 w-full bg-white dark:bg-[#0D1B2A] ${sidebarOpen ? "z-40" : "z-50"}`}>
      <div className="flex min-h-20 w-full flex-grow items-center justify-between p-4">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" className="block">
            <RiMenu2Fill size={22} className="text-primary hover:text-primary" />
          </button>
          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image width={40} height={40} src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="-mb-2 ml-10 flex w-full items-center justify-between lg:ml-0">
          <Input
            id="search"
            type="text"
            name="search"
            placeholder="Search"
            className="w-64 max-w-80 dark:bg-[#0D1B2A]"
            icon={<BiSearch className="text-primary" />}
          />

          <div className="flex items-center justify-center gap-5">
            <div className="mb-3">
              <ThemeSwitcher />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="mb-3 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-3 mt-2 w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <Link href="https://github.com/CodeUnity-Foundation/Keyguard" target="_blank">
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
