"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAuth } from "@/lib/auth";

const PUBLIC_ROUTES = new Set(["/login"]);

export function AuthGuard({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = PUBLIC_ROUTES.has(pathname);

  useEffect(() => {
    if (status === "unauthenticated" && !isPublic) {
      router.replace("/login");
    }
    if (status === "authenticated" && pathname === "/login") {
      router.replace("/");
    }
  }, [status, isPublic, pathname, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="flex items-center gap-3 text-ink-muted text-sm">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          Chargement…
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" && !isPublic) return null;

  return <>{children}</>;
}
