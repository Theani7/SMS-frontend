# Establish 12-column Unified Grid Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a 12-column Unified Grid layout on the Dashboard to provide a consistent structure for "Main Stage" and "Utility Sidebar" content.

**Architecture:** Create a reusable `DashboardGrid` component in `src/shared/components/layout` that uses CSS Grid (12 columns). Desktop uses an 8:4 split, while mobile stacks the components.

**Tech Stack:** React, TypeScript, Tailwind CSS.

---

### Task 1: Create DashboardGrid component

**Files:**
- Create: `src/shared/components/layout/dashboard-grid.tsx`

- [ ] **Step 1: Implement the DashboardGrid component**

```tsx
import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface DashboardGridProps {
  children: ReactNode;
  sidebar: ReactNode;
  className?: string;
}

/**
 * A 12-column grid layout for dashboards.
 * Desktop (lg+): 8 columns for main content, 4 columns for sidebar.
 * Mobile/Tablet: Stacked layout.
 */
export function DashboardGrid({ children, sidebar, className }: DashboardGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-6 lg:grid-cols-12', className)}>
      {/* Main Stage Area (8 columns) */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        {children}
      </div>

      {/* Utility Sidebar Area (4 columns) */}
      <div className="flex flex-col gap-6 lg:col-span-4">
        {sidebar}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Export DashboardGrid from layout index (if exists)**

Check if `src/shared/components/layout/index.ts` exists. If not, skip.

### Task 2: Update AdminDashboard to use DashboardGrid

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`

- [ ] **Step 1: Import DashboardGrid**

```tsx
import { DashboardGrid } from '../../../shared/components/layout/dashboard-grid';
```

- [ ] **Step 2: Replace existing lower grid with DashboardGrid**

```tsx
<DashboardGrid
  sidebar={
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
            <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events from across the school</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats?.recentActivities.slice(0, 4).map((activity, idx) => (
            <div key={activity.id} className="relative flex items-start gap-4 pb-1 group last:pb-0">
              {idx !== (stats?.recentActivities.slice(0, 4).length - 1) && (
                <div className="absolute left-[7px] top-4 w-[1px] h-full bg-slate-200 dark:bg-slate-800 group-last:hidden" />
              )}
              <div className="relative mt-1.5 h-[15px] w-[15px] rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-950 z-10" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-200 leading-none">{activity.message}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 font-medium italic">
                  {formatDate(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  }
>
  <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Pending fee payments status</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{stats?.pendingFees || 0}</span>
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Students pending</span>
      </div>
      <div className="mt-6 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 rounded-full" 
          style={{ width: '65%' }} 
        />
      </div>
      <p className="mt-2 text-xs text-slate-500 font-medium">65% of fees collected this month</p>
    </CardContent>
  </Card>
</DashboardGrid>
```

### Task 3: Verification

- [ ] **Step 1: Run build to ensure no TypeScript or build errors**

Run: `npm run build`
Expected: SUCCESS

- [ ] **Step 2: Commit changes**

```bash
git add src/shared/components/layout/dashboard-grid.tsx src/features/dashboard/components/admin-dashboard.tsx
git commit -m "feat: establish 12-column Unified Grid layout"
```
