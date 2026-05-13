import { Card, CardBody } from "@/components/ui/Card";
import type { VisitRequest } from "@/lib/types";
import { VisitRow } from "./VisitRow";

interface VisitTableProps {
  visits: VisitRequest[];
  onRowClick: (visit: VisitRequest) => void;
  onReferenceClick: (reference: string) => void;
}

export function VisitTable({ visits, onRowClick, onReferenceClick }: VisitTableProps) {
  if (visits.length === 0) {
    return (
      <Card>
        <CardBody className="py-16 text-center">
          <p className="text-[15px] font-medium text-ink">Aucune demande de visite</p>
          <p className="mt-1 text-[13px] text-ink-muted">
            Les demandes de visite apparaîtront ici.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="p-0">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 px-7 py-3.5 border-b border-line-soft bg-surface/50">
          <div className="col-span-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            Demande
          </div>
          <div className="col-span-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            Référence
          </div>
          <div className="col-span-3 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            Client
          </div>
          <div className="col-span-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            Agent
          </div>
          <div className="col-span-2 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            RDV
          </div>
          <div className="col-span-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            Statut
          </div>
          <div className="col-span-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted text-right">
            Source
          </div>
        </div>

        {/* Body Rows */}
        <div className="divide-y divide-line-soft">
          {visits.map((visit) => (
            <VisitRow 
              key={visit.id} 
              visit={visit} 
              onClick={onRowClick} 
              onReferenceClick={onReferenceClick}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
