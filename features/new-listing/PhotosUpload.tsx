"use client";

import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { UploadCloud, ImageIcon, X, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const initialPhotos = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80&auto=format&fit=crop",
    main: true,
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80&auto=format&fit=crop",
  },
];

export function PhotosUpload() {
  const [dragOver, setDragOver] = useState(false);
  const [photos] = useState(initialPhotos);

  return (
    <Card>
      <CardHeader
        title="Photos"
        description="JPG, PNG ou WebP, jusqu’à 10 Mo par image."
        action={
          <span className="text-[12px] text-ink-muted tabular-nums">
            {photos.length}/20
          </span>
        }
      />
      <CardBody className="space-y-5">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          className={cn(
            "relative flex flex-col items-center justify-center gap-3 rounded-[12px] border-2 border-dashed bg-elevated/50 px-6 py-10 text-center cursor-pointer",
            "transition-all duration-200 ease-smooth",
            dragOver
              ? "border-gold bg-gold-mist"
              : "border-line hover:border-gold/40 hover:bg-gold-mist/40",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full transition-colors",
              dragOver ? "bg-gold text-white" : "bg-canvas text-gold border border-gold/20",
            )}
          >
            <UploadCloud className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="space-y-1">
            <p className="text-[14px] font-medium text-ink">
              Glissez-déposez vos photos
              <span className="text-ink-muted font-normal"> ou </span>
              <span className="text-gold-deep underline-offset-4 underline decoration-gold/40">
                parcourez vos fichiers
              </span>
            </p>
            <p className="text-[12px] text-ink-muted">
              Conseillé&nbsp;: 8 photos minimum, 1920×1280 px
            </p>
          </div>
        </div>

        {/* Existing photos grid */}
        <div className="grid grid-cols-3 gap-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-[10px] overflow-hidden bg-surface ring-1 ring-line group"
            >
              {/* Using img instead of Image to avoid extra config noise; small thumbs */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {photo.main ? (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-gold text-white px-2 py-0.5 text-[10px] font-medium">
                  <Star className="w-3 h-3" strokeWidth={2} fill="currentColor" />
                  Principale
                </span>
              ) : null}
              <button
                type="button"
                aria-label="Supprimer"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-canvas/90 backdrop-blur flex items-center justify-center text-ink hover:text-danger transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="aspect-square rounded-[10px] border-2 border-dashed border-line bg-elevated/40 flex flex-col items-center justify-center gap-2 text-ink-muted hover:border-gold/40 hover:text-gold transition-colors"
          >
            <ImageIcon className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[11px] font-medium">Ajouter</span>
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
