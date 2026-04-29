export function PageHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-8 flex-wrap">
      <div className="space-y-3">
        {eyebrow ? (
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold-deep">
            <span className="w-6 h-px bg-gold" />
            {eyebrow}
          </div>
        ) : null}
        <h1 className="font-display text-display-lg font-light text-ink">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-[15px] text-ink-muted max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
