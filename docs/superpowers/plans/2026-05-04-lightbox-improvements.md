# Lightbox and Property View Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the photo viewer experience with click-outside-to-close, enhanced visibility, and a clickable cover photo on the property detail page.

**Architecture:** Lift the lightbox state from the gallery component to the page level to allow shared control between the main cover photo and the thumbnail gallery. Enhance the `Lightbox` UI for better accessibility and interaction.

**Tech Stack:** React, Next.js, Tailwind CSS, Lucide React.

---

### Task 1: Enhance Lightbox Visibility and Interaction

**Files:**
- Modify: `components/ui/Lightbox.tsx`

- [ ] **Step 1: Add click-outside-to-close logic**

Modify the backdrop container to handle clicks and trigger `onClose` only when clicking the background.

```tsx
// Around line 60 in components/ui/Lightbox.tsx
<div 
  className="fixed inset-0 z-[100] bg-ink/98 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-200"
  onClick={(e) => {
    if (e.target === e.currentTarget) onClose();
  }}
>
```

- [ ] **Step 2: Enhance photo count visibility**

Add a border and background to the photo count display.

```tsx
// Around line 63 in components/ui/Lightbox.tsx
<div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white/70">
  <div className="text-[14px] font-medium tabular-nums px-3 py-1 border border-white/20 rounded-full bg-white/5">
    {currentIndex + 1} / {images.length}
  </div>
  {/* ... */}
</div>
```

- [ ] **Step 3: Enhance close button visibility**

Add a border to the close button.

```tsx
// Around line 67 in components/ui/Lightbox.tsx
<button
  onClick={onClose}
  className="p-2 rounded-full border border-white/20 hover:bg-white/10 hover:text-white transition-colors"
  aria-label="Fermer"
>
  <X className="w-6 h-6" />
</button>
```

- [ ] **Step 4: Commit changes**

```bash
git add components/ui/Lightbox.tsx
git commit -m "feat(ui): enhance lightbox visibility and add click-outside-to-close"
```

---

### Task 2: Refactor PhotosUpload for External Lightbox Control

**Files:**
- Modify: `features/new-listing/PhotosUpload.tsx`

- [ ] **Step 1: Update component props**

Add `onPhotoClick` prop and make it optional.

```tsx
// Around line 17 in features/new-listing/PhotosUpload.tsx
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
```

- [ ] **Step 2: Update photo click handler**

Trigger `onPhotoClick` instead of setting local state if provided.

```tsx
// Around line 125 in features/new-listing/PhotosUpload.tsx
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
```

- [ ] **Step 3: Conditional rendering of internal Lightbox**

Only render the internal Lightbox if `onPhotoClick` is NOT provided (maintaining backward compatibility for the "Create" flow).

```tsx
// Around line 175 in features/new-listing/PhotosUpload.tsx
{!onPhotoClick && (
  <Lightbox
    images={value.map(p => ({ url: p.url, is_cover: p.is_cover }))}
    initialIndex={lightboxIndex ?? 0}
    isOpen={lightboxIndex !== null}
    onClose={() => setLightboxIndex(null)}
  />
)}
```

- [ ] **Step 4: Commit changes**

```bash
git add features/new-listing/PhotosUpload.tsx
git commit -m "refactor(properties): allow external control of lightbox in PhotosUpload"
```

---

### Task 3: Integrate Lightbox in Property Detail Page

**Files:**
- Modify: `app/proprietes/[id]/page.tsx`

- [ ] **Step 1: Add Lightbox state and imports**

```tsx
// Around line 25 in app/proprietes/[id]/page.tsx
import { Lightbox } from "@/components/ui/Lightbox";
// ...
export default function PropertyDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [p, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null); // New state
```

- [ ] **Step 2: Make cover photo clickable**

Add `onClick` and `cursor-pointer` to the cover photo container.

```tsx
// Around line 105 in app/proprietes/[id]/page.tsx
<div 
  className="relative aspect-video rounded-2xl overflow-hidden bg-surface border border-line cursor-pointer group"
  onClick={() => setLightboxIndex(photos.findIndex(p => p.is_cover) || 0)}
>
  {p.images && p.images.length > 0 ? (
    <Image
      src={getMediaUrl((p.images.find(i => i.is_cover) || p.images[0]).url)}
      alt={p.title}
      fill
      unoptimized
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  ) : (
    // ...
  )}
  {/* ... */}
</div>
```

- [ ] **Step 3: Update PhotosUpload usage**

Pass `onPhotoClick` to sync with page state.

```tsx
// Around line 125 in app/proprietes/[id]/page.tsx
{photos.length > 0 && (
  <PhotosUpload 
    value={photos} 
    readOnly 
    onPhotoClick={(index) => setLightboxIndex(index)}
  />
)}
```

- [ ] **Step 4: Render Lightbox**

Add the `Lightbox` component at the bottom of the page.

```tsx
// At the end of the return statement in app/proprietes/[id]/page.tsx
      {/* ... existing content ... */}
      <Lightbox
        images={photos.map(p => ({ url: p.url, is_cover: p.is_cover }))}
        initialIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
```

- [ ] **Step 5: Commit changes**

```bash
git add app/proprietes/[id]/page.tsx
git commit -m "feat(properties): make cover photo clickable and integrate lightbox in detail page"
```
