import { PageHeading } from "@/features/dashboard/PageHeading";
import { Card, CardBody } from "@/components/ui/Card";
import { Users } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="px-10 py-10 space-y-10 max-w-[1400px]">
      <PageHeading
        eyebrow="Équipe"
        title="Utilisateurs"
        subtitle="Gérez les agents, leurs rôles et leurs permissions."
      />
      <Card>
        <CardBody className="flex flex-col items-center justify-center text-center py-20 gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold-tint text-gold-deep">
            <Users className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div className="space-y-1.5 max-w-md">
            <h3 className="text-[16px] font-medium text-ink">
              Module utilisateurs en préparation
            </h3>
            <p className="text-[13px] text-ink-muted leading-relaxed">
              Cette section accueillera bientôt la gestion fine des rôles, des
              équipes et des autorisations granulaires.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
