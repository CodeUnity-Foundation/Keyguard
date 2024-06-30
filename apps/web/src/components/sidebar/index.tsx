"use client";

import blackLogo from "@keyguard/web/assets/logo/black.svg";
import whiteLogo from "@keyguard/web/assets/logo/white.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenu2Fill } from "react-icons/ri";

import ClickOutside from "../ClickOutside";
import { menuItems } from "./menuItems";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathName = usePathname();

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`dark:bg-boxdark absolute left-0 top-0 z-50 flex h-screen w-[260px] flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 dark:bg-[#030614] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="py-5.5 lg:py-6.5 flex min-h-20 items-center justify-between gap-2 px-6 py-4">
          <Link href="/dashboard" className="block">
            <Image
              width={150}
              height={32}
              src={whiteLogo}
              alt="Logo"
              className="hidden dark:block"
              priority
            />
            <Image
              width={150}
              height={32}
              src={blackLogo}
              alt="Logo"
              className="block dark:hidden"
              priority
            />
          </Link>

          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" className="block">
            <RiMenu2Fill size={22} className="text-primary hover:text-primary" />
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="px-4 py-4 lg:px-6">
            {menuItems.map((menu, index) => (
              <div key={menu.id}>
                <h2 className="text-orange text-xs font-bold uppercase">{menu.name}</h2>
                {menu.menuItems.map((menuItem) => (
                  <Link
                    key={menuItem.id}
                    href={menuItem.href}
                    className={`${pathName.includes(menuItem.href) ? "bg-lightBlue text-primary" : "text-muted-foreground"} hover:bg-lightBlue hover:text-primary my-3 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-3`}>
                    <menuItem.icon size={20} />
                    <span key={menuItem.id} className="text-sm">
                      {menuItem.name}
                    </span>
                  </Link>
                ))}
                <div
                  className={`bg-muted-300 mb-5 h-[0.5px] w-full ${index === menuItems.length - 1 ? "hidden" : ""}`}
                />
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
}
