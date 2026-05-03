# SSR State Leakage Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent server-side state leakage of the `unauthorizedHandler` in Next.js SSR by guarding its access with `typeof window !== "undefined"` checks.

**Architecture:** Wrap the assignment and invocation of the global `unauthorizedHandler` variable in environment checks to ensure they only run on the client side.

**Tech Stack:** TypeScript, Next.js

---

### Task 1: Guard `unauthorizedHandler` in `lib/api.ts`

**Files:**
- Modify: `lib/api.ts`

- [ ] **Step 1: Wrap `setUnauthorizedHandler` assignment**

```typescript
export function setUnauthorizedHandler(handler: (() => void) | null) {
  if (typeof window !== "undefined") {
    unauthorizedHandler = handler;
  }
}
```

- [ ] **Step 2: Wrap `unauthorizedHandler?.()` call in `request` function**

```typescript
  if (res.status === 401 && !opts.anonymous && typeof window !== "undefined") {
    unauthorizedHandler?.();
  }
```

- [ ] **Step 3: Verify types and linting**

Run: `npx tsc --noEmit && npm run lint`

- [ ] **Step 4: Commit changes**

```bash
git add lib/api.ts
git commit -m "fix: prevent SSR state leakage in api client"
```
