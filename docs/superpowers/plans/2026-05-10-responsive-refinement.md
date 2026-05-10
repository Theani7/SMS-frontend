# Responsive Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine dashboard responsiveness for small screens by adjusting grid gaps, ensuring single-column layouts where appropriate, and adding horizontal overflow handling for dense data components.

**Architecture:** UI adjustments via Tailwind CSS classes and wrapping components in scrollable containers.

**Tech Stack:** React, Tailwind CSS, Lucide React (for icons)

---

### Task 1: Adjust Dashboard Grid Gap

**Files:**
- Modify: `src/shared/components/layout/dashboard-grid.tsx`

- [ ] **Step 1: Update gap classes**
Update the main grid container to use a smaller gap on mobile and the original gap on large screens.

```tsx
// src/shared/components/layout/dashboard-grid.tsx

// Old
<div className={cn('grid grid-cols-1 gap-6 lg:grid-cols-12', className)}>

// New
<div className={cn('grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-12', className)}>
```

- [ ] **Step 2: Commit**
```bash
git add src/shared/components/layout/dashboard-grid.tsx
git commit -m "style: reduce mobile gap in DashboardGrid"
```

### Task 2: Refine Admin Dashboard Metric Ribbon

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`

- [ ] **Step 1: Update loading state grid**
Explicitly set `grid-cols-1` for the smallest screens in the loading state.

```tsx
// src/features/dashboard/components/admin-dashboard.tsx

// Old (line 14)
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

// New
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

- [ ] **Step 2: Update dashboard metrics grid**
Explicitly set `grid-cols-1` for the smallest screens in the main dashboard view.

```tsx
// src/features/dashboard/components/admin-dashboard.tsx

// Old (line 25)
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

// New
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

- [ ] **Step 3: Commit**
```bash
git add src/features/dashboard/components/admin-dashboard.tsx
git commit -m "style: ensure single column metric ribbon on mobile"
```

### Task 3: Add Horizontal Scroll to Attendance Pulse

**Files:**
- Modify: `src/features/dashboard/components/attendance-pulse.tsx`

- [ ] **Step 1: Wrap heatmap in overflow container**
Wrap the heatmap content inside `CardContent` with a scrollable div.

```tsx
// src/features/dashboard/components/attendance-pulse.tsx

// Old
<CardContent>
  <div className="flex flex-col gap-2">
    ...
  </div>
  {/* Legend */}
  ...
</CardContent>

// New
<CardContent>
  <div className="overflow-x-auto pb-2">
    <div className="flex flex-col gap-2 min-w-[400px]">
      ...
    </div>
  </div>
  {/* Legend */}
  ...
</CardContent>
```

- [ ] **Step 2: Commit**
```bash
git add src/features/dashboard/components/attendance-pulse.tsx
git commit -m "style: add horizontal scroll to AttendancePulse heatmap"
```

### Task 4: Add Horizontal Scroll to Revenue Matrix

**Files:**
- Modify: `src/features/dashboard/components/revenue-matrix.tsx`

- [ ] **Step 1: Wrap Table in overflow container**
Wrap the `Table` component with a scrollable div.

```tsx
// src/features/dashboard/components/revenue-matrix.tsx

// Old
<CardContent className="p-0">
  <Table>
    ...
  </Table>
</CardContent>

// New
<CardContent className="p-0">
  <div className="overflow-x-auto pb-2">
    <Table>
      ...
    </Table>
  </div>
</CardContent>
```

- [ ] **Step 2: Commit**
```bash
git add src/features/dashboard/components/revenue-matrix.tsx
git commit -m "style: add horizontal scroll to RevenueMatrix table"
```

### Task 5: Verify Build

- [ ] **Step 1: Run production build**
Ensure no TypeScript errors or build failures.

Run: `npm run build`
Expected: SUCCESS

- [ ] **Step 2: Final Commit (if needed for any fixes)**
If any fixes were required during build, commit them.
