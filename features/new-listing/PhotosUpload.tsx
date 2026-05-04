"use client";

import { useState, useRef } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Star, X, Upload, Loader2 } from "lucide-react";
import { propertiesApi } from "@/lib/api";
import { getMediaUrl } from "@/lib/utils";
import { Lightbox } from "@/components/ui/Lightbox";

export type PhotoEntry = { 
  id?: string; 
  url: string; 
  is_cover: boolean;
  file?: File;
  status?: 'pending' | 'uploading' | 'done' | 'error';
};

export function PhotosUpload({
  value,
  onChange,
  propertyId,
  readOnly = false,
  onPhotoClick,
}: {
  value: PhotoEntry[];
  onChange?: (next: PhotoEntry[]) => void;
  propertyId?: string;
  readOnly?: boolean;
  onPhotoClick?: (index: number) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (readOnly || !onChange) return;
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (propertyId) {
      // Direct upload for existing property
      setIsUploading(true);
      try {
        const nextValue = [...value];
        const uploads = await Promise.all(
          files.map(async (file, index) => {
            const isCover = nextValue.length === 0 && index === 0;
            const img = await propertiesApi.uploadImage(propertyId, file, isCover);
            return {
              id: img.id,
              url: img.url,
              is_cover: img.is_cover,
              status: 'done' as const,
            };
          })
        );
        onChange([...value, ...uploads]);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setIsUploading(false);
      }
    } else {
      // Local preview for new property
      const next = [...value];
      for (const file of files) {
        const url = URL.createObjectURL(file);
        next.push({
          url,
          is_cover: next.length === 0,
          file,
          status: 'pending',
        });
      }
      onChange(next);
    }
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function remove(index: number) {
    if (readOnly || !onChange) return;
    const photo = value[index];
    
    if (propertyId && photo.id && photo.status === 'done') {
      setIsDeleting(photo.id);
      try {
        await propertiesApi.removeImage(propertyId, photo.id);
      } catch (err) {
        console.error("Delete failed", err);
        return;
      } finally {
        setIsDeleting(null);
      }
    }

    if (photo.file && photo.status === 'pending') {
      URL.revokeObjectURL(photo.url);
    }
    const next = value.filter((_, i) => i !== index);
    if (next.length > 0 && !next.some((p) => p.is_cover)) {
      next[0].is_cover = true;
    }
    onChange(next);
  }

  async function setCover(index: number) {
    if (readOnly || !onChange) return;
    const photo = value[index];
    
    if (propertyId && photo.id && photo.status === 'done') {
      try {
        await propertiesApi.setCoverImage(propertyId, photo.id);
      } catch (err) {
        console.error("Failed to set cover image", err);
        return; // Don't update local state if API fails
      }
    }

    onChange(value.map((p, i) => ({ ...p, is_cover: i === index })));
  }

  return (
    <Card>
      <CardHeader
        title="Photos"
        description={readOnly ? "Photos du bien immobilier." : "Téléversez les photos du bien."}
        action={
          <span className="text-[12px] text-ink-muted tabular-nums">
            {value.length}/20
          </span>
        }
      />
      <CardBody className="space-y-5">
        {!readOnly && (
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              iconLeft={isUploading ? <Loader2 className="animate-spin" /> : <Upload />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? "Envoi en cours..." : "Téléverser des photos"}
            </Button>
          </div>
        )}

        {value.length === 0 ? (
          <p className="text-[12px] text-ink-soft text-center py-6">
            Aucune photo. {readOnly ? "" : "Téléversez des fichiers pour les ajouter."}
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {value.map((photo, i) => (
              <div
                key={`${photo.url}-${i}`}
                className="relative aspect-square rounded-[10px] overflow-hidden bg-surface ring-1 ring-line group cursor-pointer"
                onClick={() => {
                  if (onPhotoClick) {
                    onPhotoClick(i);
                  } else {
                    setLightboxIndex(i);
                  }
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getMediaUrl(photo.url)}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {photo.status === 'pending' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-[10px] text-white font-medium bg-black/40 px-2 py-1 rounded">À envoyer</span>
                  </div>
                )}
                {isDeleting === photo.id && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                {photo.is_cover ? (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-gold text-white px-2 py-0.5 text-[10px] font-medium shadow-sm">
                    <Star className="w-3 h-3" strokeWidth={2} fill="currentColor" />
                    Principale
                  </span>
                ) : (
                  !readOnly && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCover(i);
                      }}
                      className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-canvas/90 backdrop-blur text-ink-muted px-2 py-0.5 text-[10px] font-medium opacity-0 group-hover:opacity-100 hover:text-gold-deep transition shadow-sm"
                    >
                      Définir
                    </button>
                  )
                )}
                {!readOnly && (
                  <button
                    type="button"
                    aria-label="Supprimer"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(i);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-canvas/90 backdrop-blur flex items-center justify-center text-ink hover:text-danger transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!onPhotoClick && (
          <Lightbox
            images={value.map(p => ({ url: p.url, is_cover: p.is_cover }))}
            initialIndex={lightboxIndex ?? 0}
            isOpen={lightboxIndex !== null}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </CardBody>
    </Card>
  );
}
