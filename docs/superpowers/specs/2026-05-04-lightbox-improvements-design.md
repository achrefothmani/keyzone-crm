# Design Doc: Lightbox and Property View Improvements - 2026-05-04

## Overview
Improve the photo viewer (lightbox) experience by adding "click outside to close" functionality, enhancing the visibility of controls, and making the main cover photo clickable on the property detail page.

## Proposed Changes

### 1. Lightbox Component (`components/ui/Lightbox.tsx`)
- **Interaction**:
    - Implement "click outside to close" by adding an `onClick` handler to the backdrop container. It will trigger `onClose` only if the click target is the backdrop itself (`e.target === e.currentTarget`).
- **Visuals**:
    - Add a `border border-white/20` around the close button and the photo count container to make them more visible, as requested.
    - Wrap the photo count in a `rounded-full` container with padding and border.

### 2. Photos Upload Component (`features/new-listing/PhotosUpload.tsx`)
- **Refactoring**:
    - Remove the internal `Lightbox` state and component.
    - Add an optional `onPhotoClick?: (index: number) => void` prop.
    - When a photo is clicked, call `onPhotoClick(index)` if provided.
    - This allows the component to be used as a simple gallery that delegates the full-screen view to the parent.

### 3. Property Detail Page (`app/proprietes/[id]/page.tsx`)
- **State Management**:
    - Introduce `lightboxIndex` state to track which photo is being viewed in the lightbox.
- **Cover Photo Interaction**:
    - Make the main cover photo preview clickable.
    - Clicking it will open the lightbox at the index of the cover photo.
- **Integration**:
    - Render the `Lightbox` component at the page level.
    - Pass a callback to `PhotosUpload` to sync the lightbox index when a gallery thumbnail is clicked.

## Data Flow
1. User clicks the main cover photo OR a thumbnail in the gallery.
2. `PropertyDetailPage` updates its `lightboxIndex` state.
3. The `Lightbox` component opens with the selected image.
4. User clicks outside the photo or the 'X' button.
5. `onClose` is called, and `PropertyDetailPage` resets `lightboxIndex` to `null`.

## Verification Plan
- **Manual Testing**:
    - Open a property detail page.
    - Click the main cover photo -> Lightbox should open at image 1.
    - Click a thumbnail in the gallery -> Lightbox should open at the corresponding image.
    - Click the backdrop (outside the photo) -> Lightbox should close.
    - Click the 'X' button -> Lightbox should close.
    - Check visibility of 'X' button and photo count (borders should be present).
- **Automated Testing**:
    - Since this is a UI improvement, manual verification is primary. If existing tests exist for `Lightbox`, ensure they still pass.
