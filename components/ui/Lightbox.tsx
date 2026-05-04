"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (!isOpen || images.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, handleNext, handlePrev, onClose]);

  if (!isOpen || images.length === 0 || !mounted) return null;

  const content = (
    <div 
      className="fixed inset-0 z-[9999] bg-ink/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white z-20">
        <div className="text-[14px] font-medium tabular-nums px-4 py-1.5 border border-white/40 rounded-full bg-white/10 backdrop-blur-sm shadow-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-white transition-all shadow-sm"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 md:p-24 z-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 md:left-6 p-4 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all z-20"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <img
          src={getMediaUrl(images[currentIndex].url)}
          alt=""
          className="max-w-full max-h-full object-contain select-none animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 md:right-6 p-4 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all z-20"
          aria-label="Suivant"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6 z-20">
        <div className="flex gap-2 p-2 rounded-[16px] bg-white/10 border border-white/20 backdrop-blur-md max-w-full overflow-x-auto no-scrollbar">
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

  return createPortal(content, document.body);
}
