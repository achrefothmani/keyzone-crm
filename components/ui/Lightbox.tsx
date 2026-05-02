"use client";

import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getMediaUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: { url: string; is_cover?: boolean }[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync index when opening
  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  // Handle scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-ink/98 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-200">
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white/70">
        <div className="text-[14px] font-medium tabular-nums">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center p-12 md:p-24">
        <button
          onClick={handlePrev}
          className="absolute left-6 p-4 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <img
          src={getMediaUrl(images[currentIndex].url)}
          alt=""
          className="max-w-full max-h-full object-contain select-none animate-in zoom-in-95 duration-300"
        />

        <button
          onClick={handleNext}
          className="absolute right-6 p-4 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
          aria-label="Suivant"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6">
        <div className="flex gap-2 p-2 rounded-[16px] bg-white/5 border border-white/10 max-w-full overflow-x-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "relative w-14 h-14 rounded-[8px] overflow-hidden flex-shrink-0 transition-all",
                currentIndex === i 
                  ? "ring-2 ring-gold scale-105" 
                  : "opacity-40 hover:opacity-100"
              )}
            >
              <img
                src={getMediaUrl(img.url)}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
