import Logo from "@keyguard/web/assets/keyguard.svg";
import Image from "next/image";
import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";

import ClickOutside from "../ClickOutside";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`z-9999 dark:bg-boxdark absolute left-0 top-0 flex h-screen w-[260px] flex-col overflow-y-hidden bg-white dark:bg-[#030614] duration-300 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="py-5.5 lg:py-6.5 flex items-center justify-between gap-2 px-6 py-4 min-h-20">
          <Link href="/dashboard" className="block">
            <Image width={130} height={32} src={Logo} alt="Logo" priority />
          </Link>

          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" className="block">
            <RiMenu2Fill size={22} className="text-lightBlue hover:text-primary" />
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {[].map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-bodydark2 mb-4 ml-4 text-sm font-semibold">{group}</h3>

                {/* <ul className="mb-6 flex flex-col gap-1.5">
                  {[].map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul> */}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
}
