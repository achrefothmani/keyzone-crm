"use client";

import { useEffect, useState } from "react";
import { propertiesApi } from "@/lib/api";
import type { PropertyHistory } from "@/lib/types";
import { formatRelative, formatDate } from "@/lib/utils";
import { User, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyHistoryProps {
  propertyId: string;
}

const actionLabels: Record<string, string> = {
  CREATED: "Création de l'annonce",
  UPDATED: "Modification des informations",
  DELETED: "Suppression (archivage)",
  IMAGE_ADDED: "Ajout d'une image",
  IMAGE_DELETED: "Suppression d'une image",
};

const fieldLabels: Record<string, string> = {
  title: "Titre",
  price: "Prix",
  status: "Statut",
  validation: "Validation",
  description: "Description",
  city: "Ville",
  neighborhood: "Quartier",
  surface: "Surface",
  rooms: "Pièces",
  bedrooms: "Chambres",
  bathrooms: "Salles de bain",
  furnished: "Meublé",
  responsible_id: "Responsable",
  type: "Type de bien",
  vocation: "Vocation",
};

export function PropertyHistory({ propertyId }: PropertyHistoryProps) {
  const [history, setHistory] = useState<PropertyHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    propertiesApi
      .getHistory(propertyId)
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [propertyId]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-elevated/40 rounded-xl" />
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-ink-soft text-[14px]">
        Aucun historique disponible pour cette annonce.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-gold" />
        <h3 className="text-[15px] font-semibold text-ink">Historique d&apos;activité</h3>
      </div>
      <div className="relative space-y-0 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1px] before:bg-line">
        {history.map((event) => (
          <div key={event.id} className="relative pl-10 pb-6 last:pb-0">
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-9 h-9 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-canvas border-2 border-gold ring-4 ring-canvas" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-ink">
                  {actionLabels[event.action] || event.action}
                </span>
                <span className="text-[12px] text-ink-muted">
                  {formatRelative(event.created_at)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                <User className="w-3 h-3" />
                {event.user ? (
                  <span>
                    {event.user.prenom} {event.user.nom}
                  </span>
                ) : (
                  <span>Système</span>
                )}
                <span>·</span>
                <span>{formatDate(event.created_at)}</span>
              </div>

              {event.changes && Object.keys(event.changes).length > 0 && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-gold hover:text-gold-deep transition-colors"
                  >
                    {expandedId === event.id ? (
                      <>
                        Masquer les détails <ChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        Voir les détails ({Object.keys(event.changes).length}) <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>

                  {expandedId === event.id && (
                    <div className="mt-2 bg-elevated/40 rounded-lg border border-line p-3 space-y-2 animate-fade-in">
                      {Object.entries(event.changes).map(([field, delta]) => (
                        <div key={field} className="text-[12px]">
                          <span className="font-medium text-ink">
                            {fieldLabels[field] || field} :
                          </span>{" "}
                          <span className="text-danger line-through opacity-70">
                            {String(delta.old)}
                          </span>{" "}
                          <span className="text-ink-soft">→</span>{" "}
                          <span className="text-success font-medium">
                            {String(delta.new)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
