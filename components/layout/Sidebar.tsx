"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Building2,
  Users,
  Settings,
  Plus,
  ChevronRight,
} from "lucide-react";

const navigation = [
  { label: "Tableau de bord", href: "/", icon: LayoutGrid },
  { label: "Propriétés", href: "/proprietes", icon: Building2 },
  { label: "Utilisateurs", href: "/utilisateurs", icon: Users },
  { label: "Paramètres", href: "/parametres", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[250px] z-30 flex-col bg-elevated border-r border-line">
      {/* Brand */}
      <div className="px-7 pt-7 pb-9">
        <Link href="/" className="flex items-baseline gap-1 group">
          <span className="font-display text-[26px] font-medium leading-none text-ink tracking-tight">
            Keyzone
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold mb-1 group-hover:scale-125 transition-transform" />
        </Link>
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          CRM Immobilier
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-0.5">
        <div className="px-3 mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-ink-soft">
          Navigation
        </div>
        {navigation.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative group flex items-center gap-3 px-3 h-11 rounded-[10px]",
                "text-[14px] transition-all duration-200 ease-smooth",
                active
                  ? "bg-canvas text-ink shadow-card font-medium"
                  : "text-ink-muted hover:bg-canvas/60 hover:text-ink",
              )}
            >
              {active ? (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gold" />
              ) : null}
              <Icon
                className={cn(
                  "w-[18px] h-[18px] transition-colors",
                  active ? "text-gold" : "text-ink-soft group-hover:text-ink-muted",
                )}
                strokeWidth={1.6}
              />
              <span className="flex-1">{item.label}</span>
              {active ? (
                <ChevronRight
                  className="w-3.5 h-3.5 text-gold opacity-70"
                  strokeWidth={2}
                />
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="p-5">
        <div className="grain relative overflow-hidden rounded-[14px] bg-gradient-to-br from-ink to-[#0F1623] p-5">
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative">
            <p className="font-display text-[17px] leading-tight text-white">
              Élargissez votre portefeuille
            </p>
            <p className="mt-1 text-[12px] text-white/60 leading-relaxed">
              Ajoutez un nouveau bien en moins de deux minutes.
            </p>
            <Link
              href="/nouvelle-annonce"
              className={cn(
                "mt-4 inline-flex w-full items-center justify-center gap-2 h-10 rounded-[10px]",
                "bg-gold text-white text-[13px] font-medium",
                "transition-all duration-200 ease-smooth",
                "hover:bg-[#D5B14F] shadow-gold",
              )}
            >
              <Plus className="w-4 h-4" strokeWidth={2.2} />
              Ajouter un bien
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
