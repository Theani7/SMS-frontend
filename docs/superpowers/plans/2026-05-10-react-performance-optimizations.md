# React Performance Optimizations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve application performance by memoizing expensive operations and optimizing Zustand store selectors to prevent unnecessary re-renders.

**Architecture:** Apply `useMemo` for static or infrequently changing data (like table columns and formatted dates) and use atomic selectors for Zustand stores to ensure components only re-render when the specific state they use changes.

**Tech Stack:** React, Zustand, TypeScript.

---

### Task 1: Memoize Column Definitions

**Files:**
- Modify: `src/features/classes/components/class-list.tsx`
- Modify: `src/features/fees/components/fee-list.tsx`

- [ ] **Step 1: Fix class list to use memoized columns**
  Modify `src/features/classes/components/class-list.tsx` to use the `columns` variable instead of calling `classColumns` inline.

```tsx
// src/features/classes/components/class-list.tsx

// ...
      ) : (
        <DataTable columns={columns} data={classes || []} />
      )}
// ...
```

- [ ] **Step 2: Memoize fee columns in fee list**
  Modify `src/features/fees/components/fee-list.tsx` to memoize `feeColumns`.

```tsx
// src/features/fees/components/fee-list.tsx
import { useState, useMemo } from 'react'; // Add useMemo
// ...
export function FeeList({ onAddNew }: FeeListProps) {
  // ...
  const { data: fees, isLoading } = useFees(debouncedSearch);

  const columns = useMemo(() => feeColumns({ onDelete: setDeleteId }), [setDeleteId]);

  // ...
      ) : (
        <DataTable columns={columns} data={fees || []} />
      )}
// ...
```

### Task 2: Optimize Zustand Selectors & Audit Expensive Logic

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`
- Modify: `src/shared/components/layout/header.tsx`
- Modify: `src/shared/components/layout/sidebar.tsx`

- [ ] **Step 1: Optimize AdminDashboard**
  Modify `src/features/dashboard/components/admin-dashboard.tsx` to use atomic selectors and memoize `formattedDate`.

```tsx
// src/features/dashboard/components/admin-dashboard.tsx
import { useMemo } from 'react'; // Add useMemo
// ...
export function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();
  const user = useAuthStore(state => state.user);

  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }, []);
// ...
```

- [ ] **Step 2: Optimize Header Selectors**
  Modify `src/shared/components/layout/header.tsx` to use atomic selectors.

```tsx
// src/shared/components/layout/header.tsx
// ...
export function Header() {
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const toggleSidebar = useUIStore(state => state.toggleSidebar);
  const sidebarOpen = useUIStore(state => state.sidebarOpen);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
// ...
```

- [ ] **Step 3: Optimize Sidebar Selectors**
  Modify `src/shared/components/layout/sidebar.tsx` to use atomic selectors.

```tsx
// src/shared/components/layout/sidebar.tsx
// ...
export function Sidebar() {
  const location = useLocation();
  const sidebarOpen = useUIStore(state => state.sidebarOpen);
  const setSidebarOpen = useUIStore(state => state.setSidebarOpen);
  const sidebarCollapsed = useUIStore(state => state.sidebarCollapsed);
  const user = useAuthStore(state => state.user);
// ...
```

### Task 3: Verification & Commitment

- [ ] **Step 1: Run production build**
  Run: `npm run build`
  Expected: exit 0

- [ ] **Step 2: Commit changes**

```bash
git add .
git commit -m "perf: optimize re-renders via useMemo and atomic selectors"
```
