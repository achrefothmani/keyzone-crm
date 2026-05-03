# Lightbox Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-performance lightbox overlay for agent-side property image inspection.

**Architecture:** A standalone `Lightbox` client component using local state for navigation and circular looping, integrated into the `PhotosUpload` grid.

**Tech Stack:** React, Tailwind CSS, Lucide Icons, Next.js.

---

### Task 1: Create the Lightbox Component

**Files:**
- Create: `components/ui/Lightbox.tsx`

- [x] **Step 1: Scaffolding the basic structure and props**

```tsx
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
```

- [x] **Step 2: Commit Task 1**

```bash
git add components/ui/Lightbox.tsx
git commit -m "feat(ui): add Lightbox component"
```

---

### Task 2: Integrate Lightbox into PhotosUpload

**Files:**
- Modify: `features/new-listing/PhotosUpload.tsx`

- [ ] **Step 1: Adding state and imports**

```tsx
import { Lightbox } from "@/components/ui/Lightbox";
// ... in PhotosUpload component
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
```

- [ ] **Step 2: Adding trigger to the image grid**

Wrap the `img` or add a click handler to the container:

```tsx
{/* In value.map loop */}
<div
  key={`${photo.url}-${i}`}
  className="..."
  onClick={() => setLightboxIndex(i)} // Add this
>
  {/* img and other elements */}
</div>
```

- [ ] **Step 3: Rendering the Lightbox component**

```tsx
{/* At the end of PhotosUpload return */}
<Lightbox
  images={value.map(p => ({ url: p.url, is_cover: p.is_cover }))}
  initialIndex={lightboxIndex ?? 0}
  isOpen={lightboxIndex !== null}
  onClose={() => setLightboxIndex(null)}
/>
```

- [ ] **Step 4: Commit Task 2**

```bash
git add features/new-listing/PhotosUpload.tsx
git commit -m "feat(properties): integrate Lightbox into PhotosUpload"
```

---

### Task 3: Manual Verification

- [ ] **Step 1: Verify opening**
- Open the property creation or edit page.
- Click on an uploaded image.
- Expected: Lightbox opens with the clicked image.

- [ ] **Step 2: Verify navigation**
- Use mouse (arrows/thumbnails) and keyboard (arrows).
- Expected: Smooth transitions, correct circular looping.

- [ ] **Step 3: Verify closing**
- Click X, press Escape, or use thumbnails.
- Expected: Lightbox closes, background scroll returns.
