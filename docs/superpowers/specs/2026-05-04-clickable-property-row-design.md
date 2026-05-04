# Design Doc: Make Property Row Clickable - 2026-05-04

## Overview
Improve the user experience by making the entire property row in the listing view clickable. This allows users to navigate to the property detail page by clicking anywhere on the row, not just on the "View" icon.

## Proposed Changes

### 1. Property Row Component (`features/properties/PropertyRow.tsx`)
- **Interaction**:
    - Add a `Link` component as a transparent overlay that covers the entire `article` element.
    - Set the `href` of the overlay link to `/proprietes/${p.id}`.
    - Use `absolute inset-0` to make the link cover the entire parent container.
    - Ensure the overlay link has a `z-index` (e.g., `z-0`) that allows it to be clickable.
- **Action Buttons**:
    - Ensure the existing action buttons (View, Edit, Delete) remain clickable by giving them or their containers a higher `z-index` (e.g., `z-10`).
    - This allows specific actions to take precedence over the general card click.

### 2. Dashboard Card Component (`features/dashboard/RecentProperties.tsx`)
- **Review**:
    - This component already uses a `Link` that wraps the entire card.
    - No changes are needed here, as it already satisfies the requirement.

## Data Flow
1. User clicks anywhere on the `PropertyRow` (except for the Edit/Delete buttons).
2. The browser navigates to the property detail page via the overlay `Link`.
3. If the user clicks the Edit or Delete button, the respective action is triggered instead, as those elements are positioned on top of the overlay.

## Verification Plan
- **Manual Testing**:
    - Open the properties list page.
    - Click on the image, title, or details of a property row -> Should navigate to the detail page.
    - Click on the "Edit" button -> Should navigate to the edit page.
    - Click on the "Delete" button -> Should trigger the delete confirmation.
- **Automated Testing**:
    - Ensure that the property row still renders correctly and that there are no layout regressions.
