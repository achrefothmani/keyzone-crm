import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-muted">
        {label}
        {required ? <span className="text-gold">*</span> : null}
      </span>
      {children}
      {hint ? <span className="block text-[12px] text-ink-soft">{hint}</span> : null}
    </label>
  );
}
