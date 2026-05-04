"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  Pencil, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  User, 
  Phone, 
  Mail,
  Calendar
} from "lucide-react";

import { propertiesApi } from "@/lib/api";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatDate, getMediaUrl, cn } from "@/lib/utils";
import { PropertyHistory } from "@/features/properties/PropertyHistory";
import { PhotosUpload, type PhotoEntry } from "@/features/new-listing/PhotosUpload";
import Image from "next/image";

const statusTone: Record<string, any> = {
  Disponible: "success",
  Loué: "info",
  Vendu: "neutral",
  Réservé: "warning",
};

export default function PropertyDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [p, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    propertiesApi
      .get(id)
      .then(setProperty)
      .catch((err) => setError(err instanceof Error ? err.message : "Erreur"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 max-w-[1200px] mx-auto space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-elevated/40 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-elevated/40 rounded-2xl" />
            <div className="h-20 bg-elevated/40 rounded-xl" />
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-elevated/40 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !p) {
    return (
      <div className="p-20 text-center">
        <p className="text-danger font-medium">{error || "Propriété non trouvée"}</p>
        <Link href="/proprietes" className="text-gold hover:underline mt-4 inline-block">
          Retour à la liste
        </Link>
      </div>
    );
  }

  const isVente = p.vocation === "Vente";

  const photos: PhotoEntry[] = (p.images || []).map((img) => ({
    id: img.id,
    url: img.url,
    is_cover: img.is_cover,
    status: "done",
  }));

  return (
    <div className="px-10 py-10 space-y-10 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 text-[13px] text-ink-muted hover:text-ink transition-colors"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Retour
          </button>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge tone={isVente ? "gold" : "info"}>{p.vocation}</Badge>
              <Badge tone={statusTone[p.status]} dot>{p.status}</Badge>
              <span className="text-[13px] text-ink-soft font-mono uppercase tracking-wider">
                {p.reference}
              </span>
            </div>
            <h1 className="text-[32px] font-display font-medium tracking-tight text-ink">
              {p.title}
            </h1>
            <div className="flex items-center gap-2 text-[14px] text-ink-muted">
              <MapPin className="w-4 h-4 text-gold" />
              <span>{p.address ? `${p.address}, ` : ""}{p.neighborhood ? `${p.neighborhood}, ` : ""}{p.city}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <div className="text-[12px] uppercase tracking-widest text-ink-soft">
              {isVente ? "Prix de vente" : "Loyer mensuel"}
            </div>
            <div className="text-[36px] font-display font-medium text-ink tracking-tighter">
              {formatPrice(p.price)}
            </div>
          </div>
          <Link href={`/proprietes/${p.id}/modifier`}>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-ink text-white text-[14px] font-medium hover:bg-ink-soft transition-all shadow-card hover:shadow-lift">
              <Pencil className="w-4 h-4" />
              Modifier l&apos;annonce
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Gallery Preview */}
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface border border-line">
              {p.images && p.images.length > 0 ? (
                <Image
                  src={getMediaUrl((p.images.find(i => i.is_cover) || p.images[0]).url)}
                  alt={p.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-ink-soft">
                  Aucune image disponible
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-ink/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[12px]">
                {p.images?.length || 0} photos
              </div>
            </div>

            {photos.length > 0 && (
              <PhotosUpload value={photos} readOnly />
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl border border-line bg-canvas">
            <div className="space-y-1">
              <div className="text-ink-soft flex items-center gap-2 text-[13px]">
                <Square className="w-4 h-4" /> Surface
              </div>
              <div className="text-[16px] font-medium text-ink">{p.surface || "--"} m²</div>
            </div>
            <div className="space-y-1">
              <div className="text-ink-soft flex items-center gap-2 text-[13px]">
                <Bed className="w-4 h-4" /> Chambres
              </div>
              <div className="text-[16px] font-medium text-ink">{p.bedrooms || "--"}</div>
            </div>
            <div className="space-y-1">
              <div className="text-ink-soft flex items-center gap-2 text-[13px]">
                <Bath className="w-4 h-4" /> Salles d&apos;eau
              </div>
              <div className="text-[16px] font-medium text-ink">{p.bathrooms || "--"}</div>
            </div>
            <div className="space-y-1">
              <div className="text-ink-soft flex items-center gap-2 text-[13px]">
                <Calendar className="w-4 h-4" /> Création
              </div>
              <div className="text-[16px] font-medium text-ink">{formatDate(p.created_at)}</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-[20px] font-semibold text-ink">Description</h2>
            <div className="text-[15px] leading-relaxed text-ink-muted whitespace-pre-wrap">
              {p.description || "Aucune description fournie."}
            </div>
          </div>

          {/* History Section */}
          <div className="pt-10 border-t border-line">
            <PropertyHistory propertyId={id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Responsible & Owner Info */}
          <div className="rounded-2xl border border-line bg-elevated/40 p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-[14px] font-bold uppercase tracking-widest text-gold">Responsable</h3>
              {p.responsible ? (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                    {p.responsible.prenom[0]}{p.responsible.nom[0]}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-ink">
                      {p.responsible.prenom} {p.responsible.nom}
                    </div>
                    <div className="text-[13px] text-ink-muted">{p.responsible.email}</div>
                  </div>
                </div>
              ) : (
                <p className="text-[13px] text-ink-soft italic">Non assigné</p>
              )}
            </div>

            <div className="pt-6 border-t border-line-soft space-y-4">
              <h3 className="text-[14px] font-bold uppercase tracking-widest text-ink-soft">Propriétaire</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[14px]">
                  <User className="w-4 h-4 text-ink-soft" />
                  <span className="text-ink font-medium">{p.owner_name || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <Phone className="w-4 h-4 text-ink-soft" />
                  <span className="text-ink">{p.owner_phone || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <Mail className="w-4 h-4 text-ink-soft" />
                  <span className="text-ink">{p.owner_email || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats/Details */}
          <div className="rounded-2xl border border-line bg-canvas p-6 space-y-4">
            <h3 className="text-[14px] font-bold text-ink">Détails techniques</h3>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between py-2 border-b border-line-soft">
                <span className="text-ink-soft">Type</span>
                <span className="font-medium text-ink">
                  {p.type} {p.sub_type ? `(${p.sub_type})` : ""}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-line-soft">
                <span className="text-ink-soft">Étages</span>
                <span className="font-medium text-ink">{p.floor !== null ? p.floor : "--"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-line-soft">
                <span className="text-ink-soft">Meublé</span>
                <span className="font-medium text-ink">{p.furnished ? "Oui" : "Non"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-line-soft">
                <span className="text-ink-soft">Validation</span>
                <span className={cn("font-medium", p.validation === "Validée" ? "text-gold" : "text-warning")}>
                  {p.validation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
