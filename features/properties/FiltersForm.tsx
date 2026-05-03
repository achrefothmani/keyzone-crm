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
}

export function FiltersForm({ initialFilters, onApply, onReset, showFooter = true }: FiltersFormProps) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  const [responsibles, setResponsibles] = useState<User[]>([]);

  useEffect(() => {
    usersApi.list({ limit: 200 }).then((res) => setResponsibles(res.items)).catch(() => setResponsibles([]));
  }, []);

  const handleChange = (key: keyof PropertyFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value === "tous" || value === "" ? undefined : value }));
  };

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
        <Field label="Référence">
          <Input 
            placeholder="KZ-…" 
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
        <div className="flex items-center justify-between pt-5 border-t border-line-soft">
          <p className="hidden sm:block text-[12px] text-ink-soft">
            <span className="inline-block w-1 h-1 rounded-full bg-gold mr-1.5 align-middle" />
            Conseil : combinez « Vocation » et « Zone » pour des résultats précis.
          </p>
          <div className="flex items-center gap-2.5 ml-auto">
            <Button variant="ghost" iconLeft={<RotateCcw />} size="md" onClick={() => { setFilters({}); onReset(); }}>
              Réinitialiser
            </Button>
            <Button variant="primary" iconLeft={<Filter />} size="md" onClick={() => onApply(filters)}>
              Filtrer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
