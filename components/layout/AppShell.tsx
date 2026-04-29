import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell({ children }: { children: React.ReactNode }) {
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
