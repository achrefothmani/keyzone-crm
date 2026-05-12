import { Badge } from "@/components/ui/Badge";
import type { VisitRequestStatus } from "@/lib/types";

const STATUS_MAP: Record<VisitRequestStatus, { label: string; tone: "warning" | "info" | "success" | "danger" }> = {
  pending: { label: "En attente", tone: "warning" },
  confirmed: { label: "Confirmée", tone: "info" },
  completed: { label: "Effectuée", tone: "success" },
  cancelled: { label: "Annulée", tone: "danger" },
};

export function StatusBadge({ status }: { status: VisitRequestStatus }) {
  const { label, tone } = STATUS_MAP[status];
  return <Badge tone={tone}>{label}</Badge>;
}
