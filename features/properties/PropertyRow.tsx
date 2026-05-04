"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, MapPin, Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatRelative, getMediaUrl } from "@/lib/utils";
import type { Property } from "@/lib/types";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&auto=format&fit=crop";

const statusTone: Record<Property["status"], "success" | "info" | "warning" | "neutral"> = {
  Disponible: "success",
  Loué: "info",
  Vendu: "neutral",
  Réservé: "warning",
};

const validationTone: Record<Property["validation"], "gold" | "warning" | "neutral"> = {
  Validée: "gold",
  "En attente de validation": "warning",
  Brouillon: "neutral",
};

function coverImage(p: Property): string {
  if (!p.images || p.images.length === 0) return FALLBACK_IMAGE;
  const url = (p.images.find((i) => i.is_cover) ?? p.images[0]).url;
  return getMediaUrl(url);
}

export function PropertyRow({
  p,
  index,
  onDelete,
}: {
  p: Property;
  index: number;
  onDelete?: (id: string) => void;
}) {
  const isVente = p.vocation === "Vente";

  return (
    <article
      className={cn(
        "group relative flex flex-col md:flex-row gap-0 rounded-[14px] border border-line bg-canvas overflow-hidden",
        "transition-all duration-300 ease-smooth",
        "hover:border-gold/40 hover:shadow-lift",
        "animate-fade-up",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      <div className="relative w-full md:w-[260px] aspect-[16/10] md:aspect-auto md:h-auto flex-shrink-0 bg-surface overflow-hidden">
        <Image
          src={coverImage(p)}
          alt={p.title}
          fill
          unoptimized
          sizes="260px"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute top-3.5 left-3.5">
          <Badge tone={isVente ? "gold" : "info"}>
            {isVente ? "À vendre" : "À louer"}
          </Badge>
        </div>
      </div>

      {/* Center: info */}
      <div className="flex-1 px-6 py-5 flex flex-col justify-between min-w-0">
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone[p.status]} dot>
              {p.status}
            </Badge>
            <Badge tone={validationTone[p.validation]}>{p.validation}</Badge>
            <span className="text-[11px] text-ink-soft">{p.type}</span>
          </div>

          <h3 className="text-[17px] font-medium tracking-tight text-ink leading-snug">
            {p.title}
          </h3>

          <div className="flex items-center gap-1.5 text-[13px] text-ink-muted">
            <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={1.75} />
            {p.neighborhood ? <span>{p.neighborhood}</span> : null}
            {p.neighborhood ? <span className="text-ink-soft">·</span> : null}
            <span>{p.city}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-5 text-[12px] text-ink-muted flex-wrap">
          {p.bedrooms && p.bedrooms > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5" strokeWidth={1.6} />
              {p.bedrooms} chambres
            </span>
          ) : null}
          {p.bathrooms && p.bathrooms > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5" strokeWidth={1.6} />
              {p.bathrooms} salles d&rsquo;eau
            </span>
          ) : null}
          {p.surface ? (
            <span className="inline-flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5" strokeWidth={1.6} />
              {p.surface} m²
            </span>
          ) : null}
          {p.furnished ? (
            <span className="inline-flex items-center gap-1.5 text-gold-deep">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Meublé
            </span>
          ) : null}
        </div>
      </div>

      {/* Right: price + actions */}
      <div className="md:w-[260px] md:border-l md:border-line-soft px-6 py-5 flex flex-col justify-between bg-elevated/40">
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            {isVente ? "Prix" : "Loyer / mois"}
          </div>
          <div className="font-display text-[24px] font-medium tracking-tight text-ink mt-1 tabular-nums">
            {formatPrice(p.price)}
          </div>
          <div className="mt-3 flex items-center justify-end gap-2 text-[11px] text-ink-soft tabular-nums">
            <span>{p.reference}</span>
            <span>·</span>
            <span>maj {formatRelative(p.updated_at)}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-1">
          <Link href={`/proprietes/${p.id}`}>
            <button
              type="button"
              aria-label="Voir"
              className="flex items-center justify-center w-9 h-9 rounded-[8px] text-ink-muted hover:bg-canvas hover:text-gold-deep hover:shadow-card transition-all"
            >
              <Eye className="w-4 h-4" strokeWidth={1.6} />
            </button>
          </Link>
          <Link href={`/proprietes/${p.id}/modifier`}>
            <button
              type="button"
              aria-label="Modifier"
              className="flex items-center justify-center w-9 h-9 rounded-[8px] text-ink-muted hover:bg-canvas hover:text-ink hover:shadow-card transition-all"
            >
              <Pencil className="w-4 h-4" strokeWidth={1.6} />
            </button>
          </Link>
          <button
            type="button"
            aria-label="Supprimer"
            onClick={() => onDelete?.(p.id)}
            className="flex items-center justify-center w-9 h-9 rounded-[8px] text-ink-muted hover:bg-canvas hover:text-danger hover:shadow-card transition-all"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </article>
  );
}
