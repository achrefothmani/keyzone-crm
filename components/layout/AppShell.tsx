"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const BARE_ROUTES = new Set(["/login"]);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE_ROUTES.has(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <div className="lg:ml-[250px] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-[1400px] mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
