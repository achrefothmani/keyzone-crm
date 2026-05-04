"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { cities, propertyTypes } from "@/lib/data";
import { usersApi } from "@/lib/api";
import type { User, PropertyFilters } from "@/lib/types";
import { Filter, RotateCcw, Hash, Wallet } from "lucide-react";

interface FiltersFormProps {
  initialFilters: PropertyFilters;
  onApply: (filters: PropertyFilters) => void;
  onReset: () => void;
  showFooter?: boolean;
  columns?: 1 | 2 | 3 | 4;
}

export function FiltersForm({ initialFilters, onApply, onReset, showFooter = true, columns = 4 }: FiltersFormProps) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [responsibles, setResponsibles] = useState<User[]>([]);

  useEffect(() => {
    usersApi.list({ limit: 200 }).then((res) => setResponsibles(res.items)).catch(() => setResponsibles([]));
  }, []);

  const handleChange = (key: keyof PropertyFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value === "tous" || value === "" ? undefined : value }));
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }[columns];

  return (
    <div className="space-y-4">
      <div className={`grid ${gridCols} gap-x-5 gap-y-4`}>
        <Field label="Référence">
          <Input 
            placeholder="Pxxxx" 
            iconLeft={<Hash strokeWidth={1.75} />} 
            value={filters.reference || ""}
            onChange={(e) => handleChange("reference", e.target.value)}
          />
        </Field>

        <Field label="Type">
          <Select
            placeholder="Sélectionner"
            value={filters.type || ""}
            onChange={(e) => handleChange("type", e.target.value)}
            options={propertyTypes.map((t) => ({ value: t, label: t }))}
          />
        </Field>

        <Field label="Vocation">
          <Select
            value={filters.vocation || "tous"}
            onChange={(e) => handleChange("vocation", e.target.value)}
            options={[
              { value: "tous", label: "Tous" },
              { value: "Vente", label: "Vente" },
              { value: "Location", label: "Location" },
            ]}
          />
        </Field>

        <Field label="Zone">
          <Select
            placeholder="Choisir une zone"
            value={filters.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            options={cities.map((c) => ({ value: c, label: c }))}
          />
        </Field>

        <Field label="Meublé">
          <Select
            value={filters.furnished === undefined ? "tous" : filters.furnished ? "oui" : "non"}
            onChange={(e) => handleChange("furnished", e.target.value === "tous" ? undefined : e.target.value === "oui")}
            options={[
              { value: "tous", label: "Tous" },
              { value: "oui", label: "Oui" },
              { value: "non", label: "Non" },
            ]}
          />
        </Field>

        <Field label="Budget min">
          <Input
            type="number"
            placeholder="0"
            suffix="TND"
            iconLeft={<Wallet strokeWidth={1.75} />}
            value={filters.min_price || ""}
            onChange={(e) => handleChange("min_price", e.target.value ? Number(e.target.value) : undefined)}
          />
        </Field>

        <Field label="Budget max">
          <Input
            type="number"
            placeholder="2 500 000"
            suffix="TND"
            iconLeft={<Wallet strokeWidth={1.75} />}
            value={filters.max_price || ""}
            onChange={(e) => handleChange("max_price", e.target.value ? Number(e.target.value) : undefined)}
          />
        </Field>

        <Field label="Responsable">
          <Select
            placeholder="Tous les agents"
            value={filters.responsible_id || ""}
            onChange={(e) => handleChange("responsible_id", e.target.value)}
            options={[
              { value: "", label: "Tous les agents" },
              ...responsibles.map((u) => ({
                value: u.id,
                label: `${u.prenom} ${u.nom}`,
              })),
            ]}
          />
        </Field>
      </div>

      {showFooter && (
        <div className="flex items-center justify-end pt-4 border-t border-line-soft">
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" iconLeft={<RotateCcw />} size="sm" onClick={() => { setFilters({}); onReset(); }}>
              Réinitialiser
            </Button>
            <Button variant="primary" iconLeft={<Filter />} size="sm" onClick={() => onApply(filters)}>
              Filtrer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
