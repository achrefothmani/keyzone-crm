# Token Expiration Redirect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically redirect the user to the login page whenever an API request fails with a 401 Unauthorized status.

**Architecture:**
1.  Introduce a global `unauthorizedHandler` registry in `lib/api.ts`.
2.  Update the `request` function in `lib/api.ts` to trigger this handler on 401 responses.
3.  Subscribe to the handler in `AuthProvider` (`lib/auth.tsx`) to trigger a logout and state update.
4.  Rely on the existing `AuthGuard` for the final redirect.

**Tech Stack:** React, Next.js (App Router), TypeScript.

---

### Task 1: Add Unauthorized Handler Registry to API

**Files:**
- Modify: `lib/api.ts`

- [ ] **Step 1: Add the handler registry and exported setter**

```typescript
// lib/api.ts

// ... top of file ...
let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}
```

- [ ] **Step 2: Update the `request` function to trigger the handler**

```typescript
// lib/api.ts inside request function

// ... after fetch call ...
  if (res.status === 401 && !opts.anonymous) {
    unauthorizedHandler?.();
  }
```

- [ ] **Step 3: Commit**

```bash
git add lib/api.ts
git commit -m "api: add global unauthorized handler support"
```

---

### Task 2: Subscribe to Unauthorized Events in AuthProvider

**Files:**
- Modify: `lib/auth.tsx`

- [ ] **Step 1: Register the handler in `AuthProvider`**

```typescript
// lib/auth.tsx

import { setUnauthorizedHandler } from "./api";

// ... inside AuthProvider component ...
  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);
```

- [ ] **Step 2: Commit**

```bash
git add lib/auth.tsx
git commit -m "auth: subscribe to unauthorized API events"
```

---

### Task 3: Verification

- [ ] **Step 1: Verify types and linting**

Run: `npm run lint`
Expected: No new linting errors related to these changes.

- [ ] **Step 2: Verification of logic**

Since we don't have a full E2E test suite running here, manually verify that the `AuthGuard` still functions as expected by checking the code.

```typescript
// components/auth/AuthGuard.tsx
  useEffect(() => {
    if (status === "unauthenticated" && !isPublic) {
      router.replace("/login");
    }
// ...
```
Confirm that when `AuthProvider` calls `logout`, `status` becomes `"unauthenticated"`, which triggers the redirect.
