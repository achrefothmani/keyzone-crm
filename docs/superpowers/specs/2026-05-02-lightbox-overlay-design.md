# Design Spec: Lightbox Overlay for Property Images

## Overview
Implement a high-performance, immersive lightbox overlay for agents to inspect property photos at full resolution. The focus is on productivity, speed of navigation, and maintaining the CRM's high-end aesthetic.

## Architecture
- **Component:** `components/ui/Lightbox.tsx`
- **Type:** Client Component (`"use client"`)
- **Integration:** Integrated into `PhotosUpload` to allow previewing uploaded images.

## Interaction Design
- **Trigger:** Clicking a thumbnail in the photo grid.
- **Navigation:**
    - Side navigation arrows (ChevronLeft/Right).
    - Circular looping (last -> first).
    - Keyboard support: `ArrowRight`, `ArrowLeft`, `Escape` (close), `Home`, `End`.
    - Click-to-jump thumbnail strip at the bottom.
- **States:**
    - `currentIndex`: Tracks the active image.
    - `isOpen`: Controls visibility (managed by parent).
- **Body Scroll Lock:** Prevents background scrolling when open.

## UI/Aesthetics
- **Backdrop:** `bg-ink/98` (nearly black) for maximum focus.
- **Active Image:** Centered, `object-contain` to prevent cropping.
- **Thumbnail Strip:** 
    - Small previews (60px height) at the bottom.
    - `ring-2 ring-gold` highlight for the active thumbnail.
- **Info:** Counter (e.g., "3 / 12") in the top-left.
- **Transitions:** Snappy 200ms cross-fades.

## Technical Details
- **Props:**
  ```typescript
  interface LightboxProps {
    images: { url: string; is_cover?: boolean }[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
  }
  ```
- **Image Handling:** Uses `getMediaUrl` for consistent path resolution.
- **Accessibility:** Proper `aria-label` for controls and keyboard trap management.
