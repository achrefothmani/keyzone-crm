# Property Validation & Image Viewer Design Spec

## Goal
Simplify property validation by removing draft statuses, enforcing role-based approval, and adding a full-screen image viewer for property photos.

## Requirements

### 1. Validation Logic
- **Statuses:** Strictly `"Validée"` and `"En attente de validation"`.
- **Roles:** Only `CHEF_AGENCE` and `COORDINATEUR` can set a property to `"Validée"`.
- **Default:** New properties submitted by an `AGENT` default to `"En attente de validation"`.
- **Auto-Approval:** If an authorized role (`CHEF_AGENCE`/`COORDINATEUR`) creates or updates a property, it is automatically `"Validée"` unless they manually choose otherwise (if we provide the toggle).

### 2. UI Changes
- **Remove Drafts:** Remove "Enregistrer" (Save) buttons and the `Brouillon` status.
- **Form Integration:** Add a validation status field in `PropertyInfoForm`.
    - `AGENT`: View-only badge.
    - `AUTHORIZED`: Select/Toggle between the two statuses.
- **Image Viewer:**
    - A lightbox component (`ImageViewer`) for viewing property photos in full screen.
    - **Property List:** Clicking the thumbnail or the "Eye" icon opens the viewer.
    - **Update Page:** Clicking an uploaded photo opens it in the viewer.

## Technical Design

### Data Model (`lib/types.ts`)
```typescript
export type PropertyValidation = "Validée" | "En attente de validation";
```

### Auth Helpers (`lib/auth.tsx`)
```typescript
export function canValidate(user: User | null): boolean {
  if (!user) return false;
  return user.role === "CHEF_AGENCE" || user.role === "COORDINATEUR";
}
```

### Components

#### `ImageViewer` (`components/ui/ImageViewer.tsx`)
- Props: `images: string[]`, `initialIndex: number`, `onClose: () => void`.
- Features:
    - Overlay with semi-transparent background.
    - Centered large image.
    - Navigation arrows (Next/Prev).
    - Close button (Top-right).
    - Keyboard support (Esc to close, Left/Right arrows).

#### `PropertyInfoForm`
- Add `validation` field.
- Use `useAuth` and `canValidate` to determine if editable.

### Integration Points
- **`PropertyRow.tsx`**: Add `useState` for `viewerOpen` and `currentIndex`. Wrap cover image and Eye icon in a click handler.
- **`PhotosUpload.tsx`**: Add click handler to thumbnails to open the viewer.
- **`nouvelle-annonce/page.tsx`** & **`modifier/page.tsx`**: Remove "Brouillon" logic and update `submit` function to use role-based defaults.

## Success Criteria
- [ ] `Brouillon` status is completely removed from types and UI.
- [ ] Agents can only submit properties as "En attente de validation".
- [ ] Coordinators/Chefs can validate properties.
- [ ] Clicking property photos opens a functional, navigable lightbox.
- [ ] No regressions in property creation or updates.
