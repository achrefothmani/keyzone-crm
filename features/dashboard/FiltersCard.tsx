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
    <Card className="bg-canvas/50">
      <CardBody className="p-5">
        <FiltersForm initialFilters={{}} onApply={onFilter} onReset={onReset} />
      </CardBody>
    </Card>
  );
}
