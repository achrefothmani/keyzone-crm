import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, SlidersHorizontal, Download, Search, LayoutGrid, List } from "lucide-react";

export function PropertiesToolbar({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Rechercher par titre, référence, zone…"
          iconLeft={<Search strokeWidth={1.75} />}
          className="w-full lg:w-[420px]"
        />
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[12px] text-ink-muted whitespace-nowrap">
          <span className="w-1 h-1 rounded-full bg-gold" />
          {count} biens
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="hidden md:flex items-center rounded-[10px] border border-line bg-canvas p-0.5">
          <button
            type="button"
            aria-label="Vue liste"
            className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-surface text-ink"
          >
            <List className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Vue grille"
            className="flex items-center justify-center w-9 h-9 rounded-[8px] text-ink-muted hover:text-ink"
          >
            <LayoutGrid className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
        <Button variant="outline" iconLeft={<SlidersHorizontal />}>
          Filtres
        </Button>
        <Button variant="outline" iconLeft={<Download />}>
          Export CSV
        </Button>
        <Button variant="primary" iconLeft={<Plus />}>
          Ajouter un bien
        </Button>
      </div>
    </div>
  );
}
