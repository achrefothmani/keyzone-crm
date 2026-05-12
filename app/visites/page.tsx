"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { PageHeading } from "@/features/dashboard/PageHeading";
import { VisitTable } from "@/features/visits/VisitTable";
import { VisitDrawer } from "@/features/visits/VisitDrawer";
import { visitRequestsApi } from "@/lib/api";
import type { VisitRequest } from "@/lib/types";

const PAGE_SIZE = 20;

export default function VisitesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<VisitRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<VisitRequest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const page = Number(searchParams.get("page") || "1") - 1;

  // Helper to sync state with URL
  const updateParams = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newPage === 0) params.delete("page");
    else params.set("page", String(newPage + 1));

    router.push(`${pathname}?${params.toString()}`);
    scrollToResults();
  }, [pathname, router, searchParams]);

  // Fetch visits whenever page changes
  const fetchVisits = useCallback(() => {
    setLoading(true);
    setError(null);

    visitRequestsApi
      .list({
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
      })
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      })
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rangeLabel = useMemo(() => {
    if (total === 0) return "0";
    const start = page * PAGE_SIZE + 1;
    const end = Math.min(total, (page + 1) * PAGE_SIZE);
    return `${start} – ${end} sur ${total}`;
  }, [page, total]);

  const handleRowClick = (visit: VisitRequest) => {
    setSelectedVisit(visit);
    setIsDrawerOpen(true);
  };

  return (
    <div className="px-10 py-10 space-y-10 max-w-[1400px]">
      <PageHeading
        eyebrow="CRM"
        title="Demandes de Visite"
        subtitle="Gérez les demandes de visite reçues depuis le site web. Suivez les rendez-vous et assignez des agents."
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
                className="h-[80px] rounded-[14px] border border-line bg-elevated/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <VisitTable visits={items} onRowClick={handleRowClick} />
        )}
      </div>

      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between pt-4 text-[13px] text-ink-soft">
          <span>Affichage {rangeLabel}</span>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 0}
              onClick={() => updateParams(page - 1)}
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
              onClick={() => updateParams(page + 1)}
              className="h-9 px-3 rounded-[8px] border border-line bg-canvas hover:border-gold/40 transition-colors disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      <VisitDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedVisit(null);
        }}
        visit={selectedVisit}
        onSuccess={fetchVisits}
      />
    </div>
  );
}
