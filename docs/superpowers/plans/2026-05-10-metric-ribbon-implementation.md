# Metric Ribbon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-density "Metric Ribbon" on the Admin Dashboard using a new `MetricCard` component.

**Architecture:** Create a new reusable `MetricCard` component in `shared/components/data-display` and replace the existing `StatCard` usage in `AdminDashboard`.

**Tech Stack:** React, Tailwind CSS, Lucide React, shadcn/ui (Card base).

---

### Task 1: Create MetricCard Component

**Files:**
- Create: `src/shared/components/data-display/metric-card.tsx`

- [ ] **Step 1: Implement MetricCard with high-density styling**

```tsx
import { cn } from '../../lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    positive: boolean;
  };
  description?: string;
  className?: string;
}

export function MetricCard({ title, value, trend, description, className }: MetricCardProps) {
  return (
    <div className={cn(
      "p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl shadow-sm flex flex-col justify-between min-h-[110px]",
      className
    )}>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {value}
          </span>
          {trend && (
            <span className={cn(
              "flex items-center gap-0.5 text-[10px] font-bold",
              trend.positive ? "text-emerald-600" : "text-red-600"
            )}>
              {trend.positive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex items-end justify-between">
        {description && (
          <span className="text-[10px] text-slate-400 font-medium">
            {description}
          </span>
        )}
        {/* Sparkline Placeholder */}
        <div className="h-6 w-16 opacity-20">
          <svg viewBox="0 0 64 24" fill="none" className="w-full h-full">
            <path 
              d="M0 12C8 12 12 4 20 4C28 4 36 20 44 20C52 20 56 12 64 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              className={trend?.positive ? "text-emerald-500" : "text-slate-400"}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit MetricCard**

```bash
git add src/shared/components/data-display/metric-card.tsx
git commit -m "feat: implement high-density MetricCard"
```

### Task 2: Update AdminDashboard to use MetricCard

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`

- [ ] **Step 1: Replace StatCard with MetricCard**

```tsx
import { useAdminStats } from '../hooks/use-dashboard-stats';
import { MetricCard } from '../../../shared/components/data-display/metric-card';
// ... other imports

export function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    // Keep existing skeleton but maybe adjust height if needed
    return <div className="animate-pulse space-y-4">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-muted rounded-xl" />
        ))}
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Students"
          value={stats?.totalStudents || 0}
          description="Total enrolled"
          trend={{ value: 12, positive: true }}
        />
        <MetricCard
          title="Teachers"
          value={stats?.totalTeachers || 0}
          description="Active staff"
          trend={{ value: 2, positive: true }}
        />
        <MetricCard
          title="Classes"
          value={stats?.totalClasses || 0}
          description="Active groups"
        />
        <MetricCard
          title="Attendance"
          value={`${stats?.todayAttendance || 0}%`}
          description="Avg. today"
          trend={{ value: 3, positive: false }}
        />
      </div>
      {/* ... rest of the component */}
    </div>
  );
}
```

- [ ] **Step 2: Commit AdminDashboard changes**

```bash
git add src/features/dashboard/components/admin-dashboard.tsx
git commit -m "feat: implement high-density Metric Ribbon in AdminDashboard"
```

### Task 3: Verification

- [ ] **Step 1: Verify Build**

Run: `npm run build`
Expected: Success

- [ ] **Step 2: Manual Verification (Instructions)**
Check the Admin Dashboard in the browser (if possible) to ensure the layout is correct and the `MetricCard`s look as expected (high density, no large icons, sparkline placeholder visible).
