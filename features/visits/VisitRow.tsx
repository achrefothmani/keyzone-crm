import { Globe, Monitor } from "lucide-react";
import type { VisitRequest } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

interface VisitRowProps {
  visit: VisitRequest;
  onClick: (visit: VisitRequest) => void;
  onReferenceClick: (reference: string) => void;
}

export function VisitRow({ visit, onClick, onReferenceClick }: VisitRowProps) {
  const formatDateShort = (dateStr: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(dateStr));
  };

  const formatDateTime = (dateStr: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  };

  return (
    <div
      onClick={() => onClick(visit)}
      className="grid grid-cols-12 items-center gap-4 px-7 py-4 hover:bg-elevated/40 transition-colors cursor-pointer"
    >
      {/* Date (1 col) */}
      <div className="col-span-1 text-[13px] text-ink-muted tabular-nums">
        {formatDateShort(visit.created_at)}
      </div>

      {/* Référence (2 cols) */}
      <div className="col-span-2 min-w-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReferenceClick(visit.property_reference);
          }}
          className="text-[14px] font-medium text-gold hover:text-gold-deep hover:underline transition-all truncate"
        >
          {visit.property_reference}
        </button>
      </div>

      {/* Client (3 cols) */}
      <div className="col-span-3 min-w-0">
        <div className="text-[14px] font-medium text-ink truncate">
          {visit.full_name}
        </div>
        <div className="text-[12px] text-ink-muted truncate tabular-nums">
          {visit.phone}
        </div>
      </div>

      {/* Agent (2 cols) */}
      <div className="col-span-2 text-[13px] text-ink truncate">
        {visit.assigned_user 
          ? `${visit.assigned_user.prenom} ${visit.assigned_user.nom}`
          : "Non assigné"}
      </div>

      {/* RDV (2 cols) */}
      <div className="col-span-2 text-[13px] text-ink tabular-nums">
        {visit.visit_date ? formatDateTime(visit.visit_date) : "À définir"}
      </div>

      {/* Statut (1 col) */}
      <div className="col-span-1">
        <StatusBadge status={visit.status} />
      </div>

      {/* Source (1 col) */}
      <div className="col-span-1 flex justify-end">
        {visit.source === "website" ? (
          <Globe className="w-4 h-4 text-ink-muted" strokeWidth={1.6} />
        ) : (
          <Monitor className="w-4 h-4 text-ink-muted" strokeWidth={1.6} />
        )}
      </div>
    </div>
  );
}
