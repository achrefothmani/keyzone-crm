import { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Clock4,
  Eye,
  CalendarCheck2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import { statsApi } from "@/lib/api";

type Kpi = {
  label: string;
  value: string;
  sub: string;
  trend: { value: string; positive: boolean };
  icon: LucideIcon;
  highlight?: boolean;
};

const ANIMATION_DELAY_BASE = 60;

export function KpiGrid() {
  const { data, error, isLoading } = useSWR("dashboard-stats", () =>
    statsApi.getDashboardStats(),
  );

  const kpis: Kpi[] = useMemo(
    () => [
      {
        label: "Total propriétés",
        value: isLoading
          ? "..."
          : error
            ? "Error"
            : (data?.total_properties.value.toLocaleString() ?? "0"),
        sub: "Portefeuille global",
        trend: {
          value: data?.total_properties.trend_value ?? "+0%",
          positive: data?.total_properties.trend_positive ?? true,
        },
        icon: Building2,
        highlight: true,
      },
      {
        label: "En attente de validation",
        value: isLoading
          ? "..."
          : error
            ? "Error"
            : (data?.pending_validation.value.toLocaleString() ?? "0"),
        sub: "À traiter cette semaine",
        trend: {
          value: data?.pending_validation.trend_value ?? "0",
          positive: data?.pending_validation.trend_positive ?? true,
        },
        icon: Clock4,
      },
      {
        label: "Visites planifiées",
        value: "32",
        sub: "Sur les 7 prochains jours",
        trend: { value: "+8%", positive: true },
        icon: CalendarCheck2,
      },
      {
        label: "Vues annonces",
        value: "12 489",
        sub: "30 derniers jours",
        trend: { value: "+24%", positive: true },
        icon: Eye,
      },
    ],
    [data, isLoading, error],
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        const Trend = kpi.trend.positive ? TrendingUp : TrendingDown;
        return (
          <div
            key={kpi.label}
            className={cn(
              "group relative overflow-hidden rounded-[14px] border border-line bg-canvas p-5",
              "transition-all duration-300 ease-smooth",
              "hover:border-gold/40 hover:shadow-lift hover:-translate-y-0.5",
              "animate-fade-up",
            )}
            style={{ animationDelay: `${i * ANIMATION_DELAY_BASE}ms` }}
          >
            {kpi.highlight ? (
              <>
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />
                <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
              </>
            ) : null}

            <div className="relative flex items-start justify-between">
              <div
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-[10px]",
                  kpi.highlight
                    ? "bg-gold-tint text-gold-deep"
                    : "bg-surface text-ink-muted",
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={1.6} />
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  kpi.trend.positive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700",
                )}
              >
                <Trend className="w-2.5 h-2.5" strokeWidth={2.5} />
                {kpi.trend.value}
              </span>
            </div>

            <div className="relative mt-5">
              <div className="font-display text-[32px] font-light leading-none tracking-tight text-ink tabular-nums">
                {kpi.value}
              </div>
              <div className="mt-2.5 text-[13px] font-medium text-ink">
                {kpi.label}
              </div>
              <div className="text-[11px] text-ink-muted mt-0.5">{kpi.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
