# Dashboard Final Tuning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Final density and spacing tuning for the Admin Dashboard, including a dynamic greeting and mesh gradient.

**Architecture:** Enhance `index.css` with mesh background, update `AdminDashboard` with greeting logic, and refine component borders.

**Tech Stack:** React, Tailwind CSS, Zustand.

---

### Task 1: Mesh Gradient Utility

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add `.bg-mesh` utility to `src/index.css`**

```css
  /* Add after .bg-blob in src/index.css */
  .bg-mesh {
    background-image: radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.02) 0px, transparent 50%),
                      radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.02) 0px, transparent 50%);
  }
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "style: add mesh gradient utility"
```

### Task 2: Dynamic Greeting in AdminDashboard

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`

- [ ] **Step 1: Add Greeting logic and section**

```tsx
import { useAuthStore } from '../../../shared/store/auth-store';

export function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();
  const { user } = useAuthStore();
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // ...
  return (
    <div className="space-y-6 bg-mesh min-h-full">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-semibold tracking-tight">
          Good morning, {user?.name || 'Admin User'}
        </h1>
        <p className="text-sm text-slate-500">
          Here's the operational pulse for {formattedDate}.
        </p>
      </div>
      {/* ... rest of the dashboard */}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/dashboard/components/admin-dashboard.tsx
git commit -m "feat: add dynamic greeting to admin dashboard"
```

### Task 3: Border & Density Audit

**Files:**
- Modify: `src/shared/components/data-display/metric-card.tsx`
- Modify: `src/features/dashboard/components/attendance-pulse.tsx`
- Modify: `src/features/dashboard/components/revenue-matrix.tsx`
- Modify: `src/features/dashboard/components/action-vault.tsx`
- Modify: `src/features/dashboard/components/activity-stream.tsx`

- [ ] **Step 1: Update `MetricCard` borders to `border-slate-200/60` and `dark:border-slate-800/60`**

- [ ] **Step 2: Update other dashboard components to use consistent borders**

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/data-display/metric-card.tsx src/features/dashboard/components/
git commit -m "style: audit borders and density for dashboard cards"
```

### Task 4: Final Cleanup

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`

- [ ] **Step 1: Remove unused imports**

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git commit -m "style: cleanup dashboard imports"
```
