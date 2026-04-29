import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { sampleTimeline } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function Timeline() {
  return (
    <Card>
      <CardHeader
        title="Historique"
        description="Activité récente liée à cette annonce."
      />
      <CardBody>
        <ol className="relative">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
          {sampleTimeline.map((entry, i) => (
            <li
              key={i}
              className="relative pl-8 pb-6 last:pb-0 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                className={`absolute left-0 top-1 w-[15px] h-[15px] rounded-full ring-4 ring-canvas ${
                  i === 0 ? "bg-gold" : "bg-line"
                }`}
              />
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13px] font-medium text-ink leading-tight">
                  {entry.action}
                </p>
                <time className="text-[11px] text-ink-soft tabular-nums whitespace-nowrap">
                  {formatDate(entry.date)}
                </time>
              </div>
              {entry.detail ? (
                <p className="mt-1 text-[12px] text-ink-muted leading-relaxed">
                  {entry.detail}
                </p>
              ) : null}
              <p className="mt-1.5 text-[11px] text-ink-soft">
                par&nbsp;
                <span className="text-ink-muted font-medium">{entry.user}</span>
              </p>
            </li>
          ))}
        </ol>
      </CardBody>
    </Card>
  );
}
