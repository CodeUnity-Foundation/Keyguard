import { Input } from "@keyguard/ui";
import Logo from "@keyguard/web/assets/logo/symbol.png";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { RiMenu2Fill } from "react-icons/ri";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="z-999 sticky top-0 flex min-h-20 w-full bg-white dark:bg-[#030614]">
      <div className="flex min-h-20 w-full flex-grow items-center justify-between p-4">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" className="block">
            <RiMenu2Fill size={22} className="text-lightBlue hover:text-primary" />
          </button>
          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image width={40} height={40} src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="w-full -mb-2 ml-10 lg:ml-0">
          <Input
            id="search"
            type="text"
            name="search"
            placeholder="Search"
            className="w-64 max-w-80 dark:bg-[#030614]"
            icon={<BiSearch className="text-lightBlue" />}
          />
        </div>
      </div>
    </header>
  );
}
