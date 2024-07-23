"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./Header";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden w-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="h-[calc(100vh - 80px)] top-[80px] absolute w-full">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
