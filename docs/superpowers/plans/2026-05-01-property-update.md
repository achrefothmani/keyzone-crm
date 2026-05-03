# Property Update Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a dedicated page to update existing properties by reusing existing form components.

**Architecture:** Create a new page at `app/proprietes/[id]/modifier/page.tsx` that fetches property data, maps it to form states, and submits updates via `propertiesApi.update`.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide React.

---

### Task 1: Update PropertyRow to link to the modifier page

**Files:**
- Modify: `features/properties/PropertyRow.tsx`

- [x] **Step 1: Add Link to the Pencil button**
- [x] **Step 2: Commit**

---

### Task 2: Create the Property Update Page structure

**Files:**
- Create: `app/proprietes/[id]/modifier/page.tsx`

- [x] **Step 1: Scaffold the page with initial imports and state**
- [x] **Step 2: Commit**

---

### Task 3: Implement Data Fetching and Mapping

**Files:**
- Modify: `app/proprietes/[id]/modifier/page.tsx`

- [x] **Step 1: Implement fetch and mapping logic**
- [x] **Step 2: Commit**

---

### Task 4: Implement Submit and Render UI

**Files:**
- Modify: `app/proprietes/[id]/modifier/page.tsx`

- [x] **Step 1: Implement submit logic and render function**
- [x] **Step 2: Commit**
