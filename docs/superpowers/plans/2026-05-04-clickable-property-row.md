# Make Property Row Clickable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the entire property row in the listing view clickable to navigate to the detail page.

**Architecture:** Add a transparent `Link` overlay to the `PropertyRow` component and use `z-index` to ensure action buttons remain clickable.

**Tech Stack:** React, Next.js, Tailwind CSS, Lucide React.

---

### Task 1: Add Clickable Overlay to PropertyRow

**Files:**
- Modify: `features/properties/PropertyRow.tsx`

- [ ] **Step 1: Add the overlay Link**

Add a `Link` component that covers the entire `article` element.

```tsx
// Inside PropertyRow.tsx, as the first child of the article
<Link 
  href={`/proprietes/${p.id}`} 
  className="absolute inset-0 z-0" 
  aria-label={`Voir les détails de ${p.title}`} 
/>
```

- [ ] **Step 2: Adjust z-index of action buttons**

Ensure the action buttons container has a higher `z-index` than the overlay.

```tsx
// Around line 140 in PropertyRow.tsx
<div className="mt-5 flex items-center justify-end gap-1 relative z-10">
  {/* Buttons ... */}
</div>
```

- [ ] **Step 3: Remove the redundant "View" icon Link (Optional but recommended)**

Since the entire row is now clickable, the specific "View" icon button might be redundant. However, to keep the UI consistent, we can keep it but ensure it's also `z-10`.

- [ ] **Step 4: Commit changes**

```bash
git add features/properties/PropertyRow.tsx
git commit -m "feat(properties): make entire property row clickable"
```

---

### Task 2: Verification

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 2: Commit documentation**

```bash
git add docs/superpowers/specs/2026-05-04-clickable-property-row-design.md docs/superpowers/plans/2026-05-04-clickable-property-row.md
git commit -m "docs: add clickable property row design and plan"
```
