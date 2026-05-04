"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { PageHeading } from "@/features/dashboard/PageHeading";
import { PropertyRow } from "@/features/properties/PropertyRow";
import { PropertiesToolbar } from "@/features/properties/PropertiesToolbar";
import { FiltersDrawer } from "@/features/properties/FiltersDrawer";
import { ActiveFilters } from "@/features/properties/ActiveFilters";
import { propertiesApi } from "@/lib/api";
import type { Property, PropertyFilters } from "@/lib/types";

const PAGE_SIZE = 20;

export default function PropertiesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // For debounced search input field
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Derived filters state from URL search params
  const filters = useMemo((): PropertyFilters => {
    const params: PropertyFilters = {};
    const keys: (keyof PropertyFilters)[] = [
      "reference", "type", "vocation", "status", "city", "responsible_id", "search"
    ];
    
    keys.forEach(key => {
      const val = searchParams.get(key);
      if (val) (params as any)[key] = val;
    });
    
    const furnished = searchParams.get("furnished");
    if (furnished !== null) params.furnished = furnished === "true";

    const minPrice = searchParams.get("min_price");
    if (minPrice !== null) params.min_price = Number(minPrice);

    const maxPrice = searchParams.get("max_price");
    if (maxPrice !== null) params.max_price = Number(maxPrice);

    return params;
  }, [searchParams]);

  const page = Number(searchParams.get("page") || "1") - 1;

  // Helper to sync state with URL
  const updateParams = useCallback((newFilters: Partial<PropertyFilters>, newPage?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    if (newPage !== undefined) {
      if (newPage === 0) params.delete("page");
      else params.set("page", String(newPage + 1));
    } else {
      // If filters changed (and newPage not specified), reset to page 1
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
    scrollToResults();
  }, [pathname, router, searchParams]);

  // Debounce search update to URL to avoid excessive navigation events
  useEffect(() => {
    const id = setTimeout(() => {
      if (search !== (searchParams.get("search") || "")) {
        updateParams({ search });
      }
    }, 400);
    return () => clearTimeout(id);
  }, [search, searchParams, updateParams]);

  // Sync internal search state with URL (e.g. when filters are cleared or changed elsewhere)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Fetch properties whenever filters or page change
  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    propertiesApi
      .list({
        ...filters,
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
      })
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err) => {
        if ((err as { name?: string }).name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [filters, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rangeLabel = useMemo(() => {
    if (total === 0) return "0";
    const start = page * PAGE_SIZE + 1;
    const end = Math.min(total, (page + 1) * PAGE_SIZE);
    return `${start} – ${end} sur ${total}`;
  }, [page, total]);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce bien ?")) return;
    await propertiesApi.remove(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
    setTotal((t) => Math.max(0, t - 1));
  }

  return (
    <div className="px-10 py-10 space-y-10 max-w-[1400px]">
      <PageHeading
        eyebrow="Portefeuille"
        title="Gestion des propriétés"
        subtitle="Consultez, modifiez et publiez vos biens. Les statuts et validations sont mis à jour en temps réel."
      />

      <div className="space-y-4">
        <PropertiesToolbar
          count={total}
          search={search}
          onSearchChange={setSearch}
          onOpenFilters={() => setIsFiltersOpen(true)}
        />

        <ActiveFilters 
          filters={filters} 
          onRemove={(key) => updateParams({ [key]: undefined })} 
          onClearAll={() => {
            router.push(pathname);
            scrollToResults();
          }} 
        />
      </div>

      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onApply={(f) => updateParams(f)}
        onReset={() => {
          router.push(pathname);
          scrollToResults();
        }}
      />

      {error ? (
        <div className="rounded-[12px] border border-red-200/60 bg-red-50 px-5 py-4 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}

      <div ref={resultsRef} className="scroll-mt-24">
        {loading && items.length === 0 ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[180px] rounded-[14px] border border-line bg-elevated/40 animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-[14px] border border-line bg-canvas px-8 py-16 text-center">
            <p className="text-[15px] font-medium text-ink">Aucun bien à afficher</p>
            <p className="mt-1 text-[13px] text-ink-muted">
              Ajustez votre recherche ou créez une nouvelle annonce.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((p, i) => (
              <PropertyRow key={p.id} p={p} index={i} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 text-[13px] text-ink-muted">
        <span>Affichage {rangeLabel}</span>
        <div className="flex items-center gap-1">
          <button
            disabled={page === 0}
            onClick={() => updateParams({}, page - 1)}
            className="h-9 px-3 rounded-[8px] border border-line bg-canvas hover:border-gold/40 transition-colors disabled:opacity-40"
          >
            Précédent
          </button>
          <span className="h-9 px-3.5 inline-flex items-center rounded-[8px] bg-ink text-white font-medium">
            {page + 1}
          </span>
          <span className="text-ink-soft px-2">/ {totalPages}</span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => updateParams({}, page + 1)}
            className="h-9 px-3 rounded-[8px] border border-line bg-canvas hover:border-gold/40 transition-colors disabled:opacity-40"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
