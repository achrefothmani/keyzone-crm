"use client";

import { Search, HelpCircle, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useNotifications } from "@/lib/notifications";
import { NotificationList } from "./NotificationList";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const ROLE_LABEL: Record<string, string> = {
  CHEF_AGENCE: "Chef d'agence",
  AGENT: "Agent",
  COORDINATEUR: "Coordinateur",
};

function initials(prenom?: string, nom?: string) {
  const a = (prenom?.[0] ?? "").toUpperCase();
  const b = (nom?.[0] ?? "").toUpperCase();
  return a + b || "??";
}

export function Header() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal state with URL changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounce URL update
  useEffect(() => {
    const id = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      if (search !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (search) {
          params.set("search", search);
        } else {
          params.delete("search");
        }
        
        // Redirect to /proprietes if not already there, otherwise just push params
        const targetPath = pathname === "/proprietes" ? pathname : "/proprietes";
        router.push(`${targetPath}?${params.toString()}`);
      }
    }, 400);
    return () => clearTimeout(id);
  }, [search, pathname, router, searchParams]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const toggleNotifications = useCallback(() => {
    if (!isNotificationsOpen) {
      void markAllAsRead();
    }
    setIsNotificationsOpen((prev) => !prev);
  }, [isNotificationsOpen, markAllAsRead]);

  return (
    <header className="sticky top-0 z-20 bg-canvas/80 backdrop-blur-xl border-b border-line">
      <div className="flex items-center justify-between gap-6 h-[72px] px-10 max-w-[1400px] mx-auto w-full">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="group relative flex items-center h-11 rounded-[12px] border border-line bg-surface/60 transition-all duration-200 ease-smooth focus-within:bg-canvas focus-within:border-gold focus-within:shadow-focus">
            <Search
              className="ml-4 w-[18px] h-[18px] text-ink-muted group-focus-within:text-gold transition-colors"
              strokeWidth={1.75}
            />
            <input
              type="text"
              placeholder="Rechercher un bien, client ou zone…"
              className="flex-1 bg-transparent px-3.5 text-[14px] text-ink placeholder:text-ink-soft outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <kbd className="mr-3 hidden md:flex items-center gap-1 rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-ink-soft">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Aide"
            className="flex items-center justify-center w-10 h-10 rounded-full text-ink-muted hover:bg-surface hover:text-ink transition-colors"
          >
            <HelpCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleNotifications}
              aria-label="Notifications"
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                isNotificationsOpen ? "bg-surface text-gold" : "text-ink-muted hover:bg-surface hover:text-ink"
              )}
            >
              <Bell className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold ring-2 ring-canvas" />
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-canvas border border-line rounded-[14px] shadow-lift overflow-hidden animate-fade-up origin-top-right">
                <div className="p-4 border-b border-line flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-ink">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[11px] font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                      {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <NotificationList notifications={notifications} />
                <div className="p-3 bg-surface/30 border-t border-line text-center">
                  <button 
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-[11px] font-medium text-ink-soft hover:text-gold transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar + logout */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-line">
            <div className="text-right hidden md:block">
              <div className="text-[13px] font-medium text-ink leading-tight">
                {user ? `${user.prenom} ${user.nom}` : "—"}
              </div>
              <div className="text-[11px] text-ink-muted leading-tight">
                {user ? (ROLE_LABEL[user.role] ?? user.role) : ""}
              </div>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center text-white text-[13px] font-medium ring-2 ring-canvas shadow-card">
                {initials(user?.prenom, user?.nom)}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-canvas" />
            </div>
            <button
              type="button"
              onClick={logout}
              aria-label="Déconnexion"
              className="flex items-center justify-center w-10 h-10 rounded-full text-ink-muted hover:bg-surface hover:text-danger transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
