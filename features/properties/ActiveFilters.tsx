"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { PropertyFilters } from "@/lib/types";

interface ActiveFiltersProps {
  filters: PropertyFilters;
  onRemove: (key: keyof PropertyFilters) => void;
  onClearAll: () => void;
}

const LABELS: Record<string, string> = {
  search: "Recherche",
  type: "Type",
  sub_type: "Sous-type",
  vocation: "Vocation",
  status: "Statut",
  city: "Ville",
  neighborhood: "Quartier",
  furnished: "Meublé",
  min_price: "Prix min",
  max_price: "Prix max",
  min_surface: "Surface min",
  max_surface: "Surface max",
  rooms: "Pièces",
  bedrooms: "Chambres",
  bathrooms: "Salles de bain",
  responsible_id: "Responsable",
};

export function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  const activeKeys = (Object.keys(filters) as (keyof PropertyFilters)[]).filter(
    (key) => key !== "limit" && key !== "offset" && filters[key] !== undefined && filters[key] !== ""
  );

  if (activeKeys.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {activeKeys.map((key) => (
        <Badge key={key} tone="gold" className="pl-3 pr-1.5 py-1 flex items-center gap-1">
          <span className="text-[11px] font-medium">
            {LABELS[key] || key}: {String(filters[key])}
          </span>
          <button
            onClick={() => onRemove(key)}
            className="p-0.5 hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <button
        onClick={onClearAll}
        className="text-[12px] font-medium text-ink-soft hover:text-gold transition-colors ml-1"
      >
        Effacer tout
      </button>
    </div>
  );
}
