"use client";

import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FiltersForm } from "../properties/FiltersForm";
import type { PropertyFilters } from "@/lib/types";

export function FiltersCard({ 
  onFilter = () => {}, 
  onReset = () => {} 
}: { 
  onFilter?: (f: PropertyFilters) => void; 
  onReset?: () => void;
}) {
  return (
    <Card>
      <CardHeader
        title="Filtres avancés"
        description="Affinez la liste selon vos critères de recherche."
      />
      <CardBody>
        <FiltersForm initialFilters={{}} onApply={onFilter} onReset={onReset} />
      </CardBody>
    </Card>
  );
}
