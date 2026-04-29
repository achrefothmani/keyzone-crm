import { properties, type Property } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Bed, Bath, Square, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PropertyCard({ p, index }: { p: Property; index: number }) {
  const isVente = p.vocation === "Vente";
  return (
    <Link
      href={`/proprietes`}
      className="group relative flex flex-col rounded-[14px] border border-line bg-canvas overflow-hidden transition-all duration-300 ease-smooth hover:border-gold/40 hover:shadow-lift hover:-translate-y-0.5 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge tone={isVente ? "gold" : "info"}>
            {isVente ? "À vendre" : "À louer"}
          </Badge>
          <Badge tone="neutral" className="bg-canvas/85 backdrop-blur">
            {p.type}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-canvas/90 backdrop-blur flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1.5 text-[12px] text-ink-muted">
          <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={1.75} />
          <span>{p.neighborhood}</span>
          <span className="text-ink-soft">·</span>
          <span>{p.city}</span>
        </div>

        <h3 className="mt-2 text-[16px] font-medium tracking-tight text-ink leading-snug line-clamp-1">
          {p.title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-[12px] text-ink-muted">
          {p.bedrooms > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5" strokeWidth={1.6} />
              {p.bedrooms} ch.
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5" strokeWidth={1.6} />
            {p.bathrooms} sdb
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Square className="w-3.5 h-3.5" strokeWidth={1.6} />
            {p.surface} m²
          </span>
        </div>

        <div className="mt-5 pt-5 border-t border-line-soft flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              {isVente ? "Prix de vente" : "Loyer mensuel"}
            </div>
            <div className="font-display text-[22px] font-medium tracking-tight text-ink mt-0.5 tabular-nums">
              {formatPrice(p.price)}
              {!isVente && <span className="text-[12px] text-ink-muted font-sans"> /mois</span>}
            </div>
          </div>
          <div className="text-[11px] text-ink-soft tabular-nums">
            {p.reference}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function RecentProperties() {
  const recent = properties.slice(0, 3);
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold-deep">
            <span className="w-6 h-px bg-gold" />
            Activité récente
          </div>
          <h2 className="mt-3 font-display text-[26px] font-light tracking-tight text-ink">
            Propriétés récentes
          </h2>
        </div>
        <Link
          href="/proprietes"
          className="text-[13px] font-medium text-ink hover:text-gold transition-colors inline-flex items-center gap-1.5"
        >
          Tout voir
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {recent.map((p, i) => (
          <PropertyCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
