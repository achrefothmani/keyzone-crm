# Design Spec: Property Update Page

## Overview
Add a dedicated page to allow users to update existing properties. This page will reuse the form components and layout from the "New Listing" flow to ensure visual and functional consistency.

## Route & Navigation
- **Path:** `app/proprietes/[id]/modifier/page.tsx`
- **Entry Point:** The `Pencil` icon in `PropertyRow` (in `app/proprietes/page.tsx`) will be updated to link to this route.
- **Exit Points:** 
  - "Annuler" button redirects back to `/proprietes`.
  - Successful update redirects back to `/proprietes`.

## Implementation Details

### Data Fetching
- On mount, the page will fetch the property details using `propertiesApi.get(id)`.
- It will also fetch the list of responsible users using `usersApi.list()` for the `PropertyInfoForm`.

### State Management & Mapping
The page will maintain four primary states matching the creation flow:
1. `info` (`PropertyInfo`)
2. `location` (`LocationInfo`)
3. `owner` (`OwnerInfo`)
4. `photos` (`PhotoEntry[]`)

**Mapping from `Property` (API) to Form States:**
- `info`: Maps `title`, `type`, `vocation`, `status`, `rooms`, `bedrooms`, `bathrooms`, `floor`, `surface`, `price`, `furnished`, `description`, `responsible_id`.
- `location`: Maps `address`, `city`, `postal_code`, `neighborhood`.
- `owner`: Maps `owner_name`, `owner_phone`, `owner_email`.
- `photos`: Maps `images` array to `PhotoEntry` format (preserving `is_cover`).

### Actions
- **Update:** Calls `propertiesApi.update(id, payload)`.
- **Validation:** Same basic validation as creation (title, type, vocation, city, price).

## UI Components
- Reuses `PageHeading`, `PropertyInfoForm`, `LocationForm`, `OwnerForm`, `PhotosUpload`, and `Timeline`.
- Layout remains consistent with `app/nouvelle-annonce/page.tsx` (2-column grid on desktop).

## Testing Strategy
1. **Manual Verification:**
   - Navigate to the update page from the property list.
   - Verify all fields are correctly pre-filled with the property's data.
   - Update several fields (e.g., price, title, photos) and save.
   - Verify the list reflects the updated data.
   - Verify "Annuler" returns to the list without changes.
2. **Edge Cases:**
   - Invalid ID (handle API error gracefully).
   - Empty required fields on update.
