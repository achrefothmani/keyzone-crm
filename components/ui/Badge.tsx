import { cn } from "@/lib/utils";

type Tone = "gold" | "neutral" | "success" | "warning" | "danger" | "info";

const tones: Record<Tone, string> = {
  gold: "bg-gold-tint text-gold-deep ring-gold/20",
  neutral: "bg-surface text-ink-muted ring-line",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200/60",
  warning: "bg-amber-50 text-amber-700 ring-amber-200/60",
  danger: "bg-red-50 text-red-700 ring-red-200/60",
  info: "bg-blue-50 text-blue-700 ring-blue-200/60",
};

export function Badge({
  tone = "neutral",
  className,
  children,
  dot,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
        "text-[11px] font-medium tracking-[0.02em]",
        "ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {dot ? (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            tone === "gold" && "bg-gold",
            tone === "neutral" && "bg-ink-muted",
            tone === "success" && "bg-emerald-500",
            tone === "warning" && "bg-amber-500",
            tone === "danger" && "bg-red-500",
            tone === "info" && "bg-blue-500",
          )}
        />
      ) : null}
      {children}
    </span>
  );
}
