import { Input } from "@keyguard/ui";
import Logo from "@keyguard/web/assets/keyguard.svg";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="z-999 fixed left-auto top-0 flex min-h-20 w-full bg-white dark:bg-[#030614]">
      <div className="flex min-h-20 w-full flex-grow items-center justify-between p-4">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 border-stroke dark:border-strokedark dark:bg-boxdark block rounded-sm border bg-white p-1.5 shadow-sm lg:hidden">
            <span className="h-5.5 w-5.5 relative block cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && "!w-full delay-300"
                  }`}></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && "delay-400 !w-full"
                  }`}></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && "!w-full delay-500"
                  }`}></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && "!h-0 !delay-[0]"
                  }`}></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && "!h-0 !delay-200"
                  }`}></span>
              </span>
            </span>
          </button>
          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image width={130} height={32} src={Logo} alt="Logo" />
          </Link>
        </div>

        <div>
          <Input
            id="search"
            type="text"
            name="search"
            placeholder="Search"
            className="w-80 max-w-80"
            icon={<BiSearch className="text-lightBlue bg-transparent"/>}
          />
        </div>
      </div>
    </header>
  );
}
