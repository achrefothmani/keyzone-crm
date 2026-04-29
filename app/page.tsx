import { PageHeading } from "@/features/dashboard/PageHeading";
import { FiltersCard } from "@/features/dashboard/FiltersCard";
import { KpiGrid } from "@/features/dashboard/KpiGrid";
import { RecentProperties } from "@/features/dashboard/RecentProperties";
import { Button } from "@/components/ui/Button";
import { Download, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="px-10 py-10 space-y-10 max-w-[1400px]">
      <PageHeading
        eyebrow="Vue d’ensemble"
        title="Tableau de bord"
        subtitle="Pilotez votre portefeuille immobilier, suivez les performances et identifiez les opportunités en un coup d’œil."
        action={
          <>
            <Button variant="outline" iconLeft={<Download />}>
              Exporter
            </Button>
            <Link href="/nouvelle-annonce">
              <Button variant="primary" iconLeft={<Plus />}>
                Nouvelle annonce
              </Button>
            </Link>
          </>
        }
      />

      <FiltersCard />
      <KpiGrid />
      <RecentProperties />
    </div>
  );
}
