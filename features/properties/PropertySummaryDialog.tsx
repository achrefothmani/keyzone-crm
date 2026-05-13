"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { propertiesApi } from "@/lib/api";
import type { Property } from "@/lib/types";
import { getMediaUrl, formatPrice } from "@/lib/utils";
import { ExternalLink, Loader2, MapPin, Building2, Maximize2, BedDouble, Bath, User, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PropertySummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string | null;
}

export function PropertySummaryDialog({ isOpen, onClose, reference }: PropertySummaryDialogProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperty() {
      if (!reference || !isOpen) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await propertiesApi.list({ reference });
        if (response.items.length > 0) {
          setProperty(response.items[0]);
        } else {
          setError("Propriété non trouvée");
        }
      } catch (err) {
        console.error("Failed to fetch property details", err);
        setError("Erreur lors du chargement des détails");
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [reference, isOpen]);

  const coverImage = property?.images.find(img => img.is_cover)?.url || property?.images[0]?.url;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={property?.reference || "Détails de la propriété"}>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="mt-4 text-[14px] text-ink-muted">Chargement des informations...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          <p>{error}</p>
        </div>
      ) : property ? (
        <div className="space-y-6">
          {/* Hero Image */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-surface border border-line">
            {coverImage ? (
              <img 
                src={getMediaUrl(coverImage)} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-ink-muted">
                <Building2 className="w-12 h-12 opacity-20" />
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold rounded-full uppercase tracking-wider">
                {property.status}
              </span>
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[19px] font-semibold text-ink leading-tight">
                {property.title}
              </h3>
              <div className="text-[19px] font-bold text-gold shrink-0">
                {formatPrice(property.price)}
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-2 text-ink-muted">
              <MapPin className="w-4 h-4" />
              <span className="text-[14px]">
                {property.address ? `${property.address}, ` : ""}{property.neighborhood ? `${property.neighborhood}, ` : ""}{property.city}
              </span>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-4 gap-2">
            {property.surface && (
              <div className="bg-surface rounded-lg p-3 text-center border border-line-soft">
                <Maximize2 className="w-4 h-4 mx-auto text-ink-muted mb-1" />
                <div className="text-[13px] font-bold text-ink">{property.surface} m²</div>
                <div className="text-[10px] text-ink-muted uppercase tracking-wider">Surface</div>
              </div>
            )}
            {property.rooms && (
              <div className="bg-surface rounded-lg p-3 text-center border border-line-soft">
                <Building2 className="w-4 h-4 mx-auto text-ink-muted mb-1" />
                <div className="text-[13px] font-bold text-ink">{property.rooms}</div>
                <div className="text-[10px] text-ink-muted uppercase tracking-wider">Pièces</div>
              </div>
            )}
            {property.bedrooms && (
              <div className="bg-surface rounded-lg p-3 text-center border border-line-soft">
                <BedDouble className="w-4 h-4 mx-auto text-ink-muted mb-1" />
                <div className="text-[13px] font-bold text-ink">{property.bedrooms}</div>
                <div className="text-[10px] text-ink-muted uppercase tracking-wider">Chambres</div>
              </div>
            )}
            {property.bathrooms && (
              <div className="bg-surface rounded-lg p-3 text-center border border-line-soft">
                <Bath className="w-4 h-4 mx-auto text-ink-muted mb-1" />
                <div className="text-[13px] font-bold text-ink">{property.bathrooms}</div>
                <div className="text-[10px] text-ink-muted uppercase tracking-wider">Bains</div>
              </div>
            )}
          </div>

          {/* Owner Info */}
          {(property.owner_name || property.owner_phone) && (
            <div className="bg-surface rounded-xl p-4 border border-line-soft space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                Informations Propriétaire
              </div>
              <div className="space-y-2">
                {property.owner_name && (
                  <div className="flex items-center gap-3 text-[14px] text-ink">
                    <User className="w-4 h-4 text-ink-muted" strokeWidth={1.6} />
                    <span className="font-medium">{property.owner_name}</span>
                  </div>
                )}
                {property.owner_phone && (
                  <div className="flex items-center gap-3 text-[14px] text-ink">
                    <Phone className="w-4 h-4 text-ink-muted" strokeWidth={1.6} />
                    <a 
                      href={`tel:${property.owner_phone}`}
                      className="font-medium hover:text-gold transition-colors tabular-nums"
                    >
                      {property.owner_phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Link */}
          <div className="pt-2 border-t border-line">
            <Link 
              href={`/proprietes/${property.id}`} 
              target="_blank"
              className="group flex items-center justify-center gap-2 w-full h-11 bg-gold text-white rounded-[12px] text-[14px] font-medium transition-all hover:bg-gold-deep shadow-gold-sm"
            >
              Voir la fiche complète
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
