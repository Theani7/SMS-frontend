# Activity Stream Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-density "Activity Stream" feed in the Admin Dashboard's Utility Sidebar.

**Architecture:** A stateless React component for rendering a list of system activities with type-specific icons and high-density styling.

**Tech Stack:** React, Tailwind CSS, Lucide React, Shadcn/UI (Card).

---

### Task 1: Create ActivityStream Component

**Files:**
- Create: `src/features/dashboard/components/activity-stream.tsx`

- [ ] **Step 1: Implement the component structure**

```tsx
import { Activity } from '../types/dashboard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';
import { UserPlus, DollarSign, Circle, User } from 'lucide-react';
import { formatDate } from '../../../shared/lib/utils';

interface ActivityStreamProps {
  activities?: Activity[];
}

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'student':
      return <UserPlus className="h-3 w-3 text-slate-400" />;
    case 'fee':
      return <DollarSign className="h-3 w-3 text-slate-400" />;
    case 'teacher':
      return <User className="h-3 w-3 text-slate-400" />;
    case 'attendance':
    default:
      return <Circle className="h-3 w-3 text-slate-400" />;
  }
};

export function ActivityStream({ activities = [] }: ActivityStreamProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent Activity</CardTitle>
        <CardDescription className="text-[11px]">Latest events across the school</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="py-2 first:pt-0 last:pb-0">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    <ActivityIcon type={activity.type} />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-[13px] font-medium text-slate-700 dark:text-slate-200 leading-snug">
                      {activity.message}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-[12px] text-slate-500">No recent activities</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/dashboard/components/activity-stream.tsx
git commit -m "feat: implement high-density ActivityStream component"
```

### Task 2: Integrate ActivityStream into AdminDashboard

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`

- [ ] **Step 1: Replace existing Recent Activity card with ActivityStream**

```tsx
// Around line 86, replace the old Card with <ActivityStream />
// ...
import { ActionVault } from './action-vault';
import { ActivityStream } from './activity-stream'; // Add this import

// ... in AdminDashboard sidebar section:
<DashboardGrid
  sidebar={
    <div className="space-y-6">
      <ActionVault />
      <ActivityStream activities={stats?.recentActivities} />
    </div>
  }
>
// ...
```

- [ ] **Step 2: Remove unused imports**
Remove `Activity` (the icon) and `Activity` (the type if it conflicts, but usually it's used in the hook return type) from imports if they are no longer used directly in `admin-dashboard.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/features/dashboard/components/admin-dashboard.tsx
git commit -m "feat: add Activity Stream to Utility Sidebar"
```

### Task 3: Verification

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: Build successful.
