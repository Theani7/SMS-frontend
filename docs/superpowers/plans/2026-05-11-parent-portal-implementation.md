# Parent Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete parent portal with Dashboard, Children, Attendance, and Fees pages, all wrapped in ParentShell layout.

**Architecture:** Feature-based structure under `src/features/`. Shared parent components in `src/shared/components/parent/`. ParentShell wrapper on all pages. Reuses existing hooks and components where possible.

**Tech Stack:** React 18 + Vite + TypeScript + Tailwind CSS + React Query + Radix UI Sheet + Lucide React.

---

## Task 1: Mock Database — Parent-Children Relationship

**Files:**
- Modify: `src/api/mock/database.ts:63-71`
- Modify: `src/features/attendance/api/mock.ts`
- Modify: `src/features/fees/api/mock.ts`

- [ ] **Step 1: Add children array to parent user**

Read the current mock database and add a `children: string[]` field to the parent user (id: 3, John Smith). Link to student IDs `['1', '3']` (Emma Wilson and Olivia Davis).

- [ ] **Step 2: Add mock data for parent-specific hooks**

In `src/features/attendance/api/mock.ts`, create `mockParentAttendance` that filters attendance records by parent children's student IDs. In `src/features/fees/api/mock.ts`, create `mockParentFees` that filters fee records.

- [ ] **Step 3: Commit**

```bash
git add src/api/mock/database.ts src/features/attendance/api/mock.ts src/features/fees/api/mock.ts
git commit -m "feat(parent): add parent-children relationship to mock data"
```

---

## Task 2: Parent-Specific Hooks

**Files:**
- Create: `src/features/children/hooks/use-children.ts`
- Create: `src/features/children/hooks/use-children-attendance.ts`
- Create: `src/features/children/hooks/use-children-fees.ts`
- Create: `src/features/children/api/mock.ts`
- Create: `src/features/children/api/index.ts`

- [ ] **Step 1: Create children feature API layer**

Create `src/features/children/api/mock.ts` with `mockGetChildren(parentId: string)` that returns student records filtered by the parent's children array. Simulate 300ms delay. Create `src/features/children/api/index.ts` that exports from mock.

- [ ] **Step 2: Create useChildren hook**

```typescript
import { useQuery } from '@tanstack/react-query';
import { mockGetChildren } from '../api';
import { useAuthStore } from '../../../shared/store/auth-store';

export function useChildren() {
  const user = useAuthStore(state => state.user);
  return useQuery({
    queryKey: ['children', user?.id],
    queryFn: () => mockGetChildren(user?.id || ''),
    enabled: !!user?.id,
  });
}
```

- [ ] **Step 3: Create useChildrenAttendance hook**

```typescript
import { useQuery } from '@tanstack/react-query';
import { mockGetChildrenAttendance } from './api';

export function useChildrenAttendance(childId?: string) {
  return useQuery({
    queryKey: ['parent-attendance', childId],
    queryFn: () => mockGetChildrenAttendance(childId),
    enabled: true,
  });
}
```

- [ ] **Step 4: Create useChildrenFees hook**

```typescript
import { useQuery } from '@tanstack/react-query';
import { mockGetChildrenFees } from './api';

export function useChildrenFees(childId?: string) {
  return useQuery({
    queryKey: ['parent-fees', childId],
    queryFn: () => mockGetChildrenFees(childId),
    enabled: true,
  });
}
```

- [ ] **Step 5: Commit**

```bash
git add src/features/children/hooks/ src/features/children/api/
git commit -m "feat(parent): add children feature hooks and API layer"
```

---

## Task 3: ParentShell Component

**Files:**
- Create: `src/shared/components/parent/parent-shell.tsx`
- Create: `src/shared/components/parent/index.ts`

- [ ] **Step 1: Create ParentShell component**

ParentShell mirrors StudentShell exactly but with parent context. Reference the StudentShell implementation at `src/shared/components/student/student-shell.tsx` for structure.

```tsx
import type { BreadcrumbItem } from '../../types/breadcrumb-item';
import { cn } from '../../lib/utils';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useChildrenFees } from '../../../features/children/hooks/use-children-fees';

interface ParentShellProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  className?: string;
  actionZone?: {
    content: React.ReactNode;
    mobile?: boolean;
  };
}

export function ParentShell({ title, breadcrumbs, children, className, actionZone }: ParentShellProps) {
  const { data: fees } = useChildrenFees();
  const unpaidFees = (fees || []).filter(f => f.status !== 'paid');
  const urgencyCount = unpaidFees.length;

  return (
    <div className={cn('flex flex-col gap-4 lg:gap-6 p-4 lg:p-6', className)}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] font-medium">
        <Link to="/" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <Home className="h-3.5 w-3.5" />
        </Link>
        {breadcrumbs?.map((crumb, index) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600" />
            {index === breadcrumbs.length - 1 ? (
              <span className="text-slate-900 dark:text-slate-100">{crumb.label}</span>
            ) : (
              <Link to={crumb.href} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Page header */}
      <div className="flex items-center gap-3">
        <h1 className="text-[22px] font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        {urgencyCount > 0 && (
          <span className="rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 px-2 py-0.5 text-[11px] font-bold">
            {urgencyCount}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>

      {/* Action zone */}
      {actionZone && (
        <div className="lg:hidden">
          {actionZone.content}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Export from index**

Create `src/shared/components/parent/index.ts` that exports `ParentShell`.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/parent/
git commit -m "feat(parent): add ParentShell component"
```

---

## Task 4: ChildCard Component

**Files:**
- Create: `src/shared/components/parent/child-card.tsx`
- Create: `src/shared/components/parent/child-card.css` (if needed for complex styling)

- [ ] **Step 1: Create ChildCard component**

```tsx
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';

interface ChildCardProps {
  child: {
    id: string;
    name: string;
    class: string;
    hasOverdueFees?: boolean;
    hasRecentAbsence?: boolean;
  };
}

export function ChildCard({ child }: ChildCardProps) {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getBorderColor = () => {
    if (child.hasOverdueFees) return 'border-rose-300 dark:border-rose-800';
    if (child.hasRecentAbsence) return 'border-amber-300 dark:border-amber-800';
    return 'border-slate-200 dark:border-slate-800';
  };

  const getStatusDot = () => {
    if (child.hasOverdueFees) {
      return <div className="h-2 w-2 rounded-full bg-rose-500" />;
    }
    if (child.hasRecentAbsence) {
      return <div className="h-2 w-2 rounded-full bg-amber-500" />;
    }
    return null;
  };

  return (
    <Card
      onClick={() => navigate(`/children/${child.id}`)}
      className={cn(
        'cursor-pointer transition-all duration-150 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600',
        getBorderColor()
      )}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300">
          {getInitials(child.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {child.name}
            </p>
            {getStatusDot()}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {child.class}
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Export from parent index**

Add `export { ChildCard } from './child-card';` to `src/shared/components/parent/index.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/parent/
git commit -m "feat(parent): add ChildCard component"
```

---

## Task 5: Sidebar — Parent Navigation

**Files:**
- Modify: `src/shared/components/layout/sidebar.tsx`

- [ ] **Step 1: Add parent nav items**

In `sidebar.tsx`, add a `parentNavigation` array alongside the existing ones:

```typescript
const parentNavigation = [
  { name: 'Children', href: ROUTES.CHILDREN, icon: Users, roles: ['parent'] },
];
```

Add it to `allNavItems`. In the student ordering section, add `ROUTES.CHILDREN` to the sorted nav items order. Add a `parentOrder` array and sort logic similar to `studentOrder`.

For the parent identity card, add below the logo area (use existing pattern from student identity card):

```tsx
{isParent && user && !sidebarCollapsed && (
  <div className="flex items-center gap-2.5 px-4 py-2 mb-2 mx-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
    <Avatar className="h-8 w-8">
      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
      {user.name}
    </span>
  </div>
)}
```

- [ ] **Step 2: Add CHILDREN route constant**

Add `CHILDREN: '/children'` to `src/shared/lib/constants.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/layout/sidebar.tsx src/shared/lib/constants.ts
git commit -m "feat(parent): add parent navigation to sidebar"
```

---

## Task 6: Children Feature — Pages and Components

**Files:**
- Create: `src/features/children/api/mock.ts`
- Modify: `src/features/children/api/index.ts`
- Create: `src/features/children/hooks/use-children.ts`
- Create: `src/features/children/hooks/use-children-attendance.ts`
- Create: `src/features/children/hooks/use-children-fees.ts`
- Create: `src/pages/children/children-page.tsx`
- Create: `src/pages/children/child-detail-page.tsx`
- Modify: `src/app/routes.tsx`

- [ ] **Step 1: Create children feature API**

Create the mock API layer in `src/features/children/api/mock.ts` with `mockGetChildren(parentId)`, `mockGetChildrenAttendance(childId?)`, `mockGetChildrenFees(childId?)`.

- [ ] **Step 2: Create children hooks**

Create hooks following the pattern in Task 2.

- [ ] **Step 3: Create ChildrenPage**

```tsx
import { ParentShell } from '../../shared/components/parent';
import { ChildCard } from '../../shared/components/parent';
import { useChildren } from '../../features/children/hooks/use-children';
import { useChildrenFees } from '../../features/children/hooks/use-children-fees';
import { useChildrenAttendance } from '../../features/children/hooks/use-children-attendance';
import { cn } from '../../shared/lib/utils';

export function ChildrenPage() {
  const { data: children, isLoading } = useChildren();
  const { data: fees } = useChildrenFees();
  const { data: attendance } = useChildrenAttendance();

  // Enrich children with urgency indicators
  const enrichedChildren = (children || []).map(child => {
    const childFees = (fees || []).filter(f => f.studentId === child.id);
    const childAttendance = (attendance || []).filter(a => a.studentId === child.id);
    return {
      ...child,
      hasOverdueFees: childFees.some(f => f.status === 'pending'),
      hasRecentAbsence: childAttendance.some(a => a.status === 'absent'),
    };
  });

  if (isLoading) {
    return (
      <ParentShell title="Children">
        <div className="grid gap-3">
          {[1, 2].map(i => (
            <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </ParentShell>
    );
  }

  if (enrichedChildren.length === 0) {
    return (
      <ParentShell title="Children">
        <div className="text-center py-12">
          <p className="text-[13px] text-slate-500 dark:text-slate-400">No children linked to your account</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Contact the school to link your children</p>
        </div>
      </ParentShell>
    );
  }

  return (
    <ParentShell title="Children">
      <div className="grid gap-3 sm:grid-cols-2">
        {enrichedChildren.map(child => (
          <ChildCard key={child.id} child={child} />
        ))}
      </div>
    </ParentShell>
  );
}
```

- [ ] **Step 4: Create ChildDetailPage**

```tsx
import { useParams } from 'react-router-dom';
import { ParentShell } from '../../shared/components/parent';
import { SectionHeader } from '../../shared/components/student';
import { Badge } from '../../shared/components/ui/badge';
import { Card, CardContent } from '../../shared/components/ui/card';
import { useChildren } from '../../features/children/hooks/use-children';
import { useChildrenAttendance } from '../../features/children/hooks/use-children-attendance';
import { useChildrenFees } from '../../features/children/hooks/use-children-fees';
import { formatCurrency } from '../../shared/lib/utils';

export function ChildDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: children } = useChildren();
  const { data: attendance } = useChildrenAttendance(id);
  const { data: fees } = useChildrenFees(id);

  const child = (children || []).find(c => c.id === id);

  const last7Days = (attendance || []).slice(-7).reverse();
  const unpaidFees = (fees || []).filter(f => f.status !== 'pending');
  const outstanding = (fees || []).filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <ParentShell
      title={child?.name || 'Child Detail'}
      breadcrumbs={[
        { label: 'Children', href: '/children' },
      ]}
    >
      {/* Child profile header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-base font-bold text-indigo-700 dark:text-indigo-300">
          {child ? getInitials(child.name) : '?'}
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">{child?.name}</p>
          <p className="text-[12px] text-slate-500 dark:text-slate-400">{child?.class}</p>
        </div>
      </div>

      {/* Attendance section */}
      <div className="mb-6">
        <SectionHeader label="Attendance Overview" />
        <Card className="mt-3">
          <CardContent className="p-4">
            {last7Days.length === 0 ? (
              <p className="text-[12px] text-slate-500 text-center py-3">No attendance records</p>
            ) : (
              <div className="space-y-2">
                {last7Days.map((att, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-[12px] text-slate-600 dark:text-slate-400">{att.date}</span>
                    <Badge
                      variant={att.status === 'present' ? 'default' : 'destructive'}
                      className="text-[10px] px-2 py-0 uppercase tracking-wider font-bold h-5"
                    >
                      {att.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Fee status section */}
      <div>
        <SectionHeader label="Fee Status" count={unpaidFees.length} />
        <Card className="mt-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-slate-500 font-medium">Outstanding Balance</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{formatCurrency(outstanding)}</span>
            </div>
            {(fees || []).length === 0 ? (
              <p className="text-[12px] text-slate-500 text-center py-3">No fee records</p>
            ) : (
              <div className="space-y-2">
                {(fees || []).map((fee, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-[12px] text-slate-600 dark:text-slate-400">{fee.description}</span>
                    <Badge
                      variant={fee.status === 'paid' ? 'default' : 'destructive'}
                      className="text-[10px] px-2 py-0 uppercase tracking-wider font-bold h-5"
                    >
                      {fee.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ParentShell>
  );
}
```

- [ ] **Step 5: Register pages in routes**

In `src/app/routes.tsx`, add the children page imports and routes. Parent-only routes use `allowedRoles={['parent']}`.

```tsx
// Add after student portal pages
const ChildrenPage = lazy(() => import('../pages/children/children-page').then(m => ({ default: m.ChildrenPage })));
const ChildDetailPage = lazy(() => import('../pages/children/child-detail-page').then(m => ({ default: m.ChildDetailPage })));

// Add routes in the protected section:
<Route
  path={ROUTES.CHILDREN}
  element={
    <ProtectedRoute allowedRoles={['parent']}>
      <ChildrenPage />
    </ProtectedRoute>
  }
/>
<Route
  path={`${ROUTES.CHILDREN}/:id`}
  element={
    <ProtectedRoute allowedRoles={['parent']}>
      <ChildDetailPage />
    </ProtectedRoute>
  }
/>
```

- [ ] **Step 6: Commit**

```bash
git add src/features/children/ src/pages/children/ src/app/routes.tsx
git commit -m "feat(parent): add children feature pages and components"
```

---

## Task 7: Parent Dashboard Page

**Files:**
- Modify: `src/features/dashboard/components/parent-dashboard.tsx`

- [ ] **Step 1: Enhance ParentDashboard**

Replace the existing basic ParentDashboard with the full implementation from the spec. Wrap in ParentShell. Add ChildCard grid, StatCards for pending fees and absent children, UrgencyStrip. Use skeleton loading and empty states.

```tsx
import { useChildren } from '../../features/children/hooks/use-children';
import { useChildrenFees } from '../../features/children/hooks/use-children-fees';
import { useChildrenAttendance } from '../../features/children/hooks/use-children-attendance';
import { ParentShell } from '../../shared/components/parent';
import { ChildCard } from '../../shared/components/parent';
import { StatCard } from '../../shared/components/data-display/stat-card';
import { UrgencyStrip } from '../../shared/components/student';
import { DollarSign, ClipboardCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ParentDashboard() {
  const navigate = useNavigate();
  const { data: children, isLoading } = useChildren();
  const { data: fees } = useChildrenFees();
  const { data: attendance } = useChildrenAttendance();

  const enrichedChildren = (children || []).map(child => {
    const childFees = (fees || []).filter(f => f.studentId === child.id);
    const childAttendance = (attendance || []).filter(a => a.studentId === child.id);
    return {
      ...child,
      hasOverdueFees: childFees.some(f => f.status === 'pending'),
      hasRecentAbsence: childAttendance.some(a => a.status === 'absent'),
    };
  });

  const totalPending = (fees || []).filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const absentToday = (attendance || []).filter(a => a.status === 'absent').length;

  const urgencyItems = [
    ...(fees || []).filter(f => f.status === 'pending').map(f => ({
      id: f.id,
      label: `Fee due: ${f.studentName}`,
      urgency: 'high' as const,
      href: '/fees',
    })),
    ...(attendance || []).filter(a => a.status === 'absent').map(a => ({
      id: a.id,
      label: `${a.studentName} absent today`,
      urgency: 'info' as const,
    })),
  ].slice(0, 3);

  if (isLoading) {
    return (
      <ParentShell title="Dashboard">
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </ParentShell>
    );
  }

  return (
    <ParentShell title="Dashboard">
      {urgencyItems.length > 0 && <UrgencyStrip items={urgencyItems} />}
      <div className="space-y-6">
        {/* Stats row */}
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            title="Total Pending"
            value={`$${totalPending}`}
            icon={DollarSign}
            description="Outstanding fees"
          />
          <StatCard
            title="Absent Today"
            value={String(absentToday)}
            icon={ClipboardCheck}
            description="Children not in school"
          />
        </div>

        {/* Children grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Your Children
            </h2>
            <button
              onClick={() => navigate('/children')}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View all
            </button>
          </div>
          {enrichedChildren.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-[12px] text-slate-500 dark:text-slate-400">No children enrolled yet</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {enrichedChildren.slice(0, 4).map(child => (
                <ChildCard key={child.id} child={child} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ParentShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/dashboard/components/parent-dashboard.tsx
git commit -m "feat(parent): enhance parent dashboard with full implementation"
```

---

## Task 8: Attendance Page — Parent Filtered View

**Files:**
- Modify: `src/features/attendance/components/attendance-list.tsx` (add parent filtering)
- Modify: `src/pages/attendance/attendance-list-page.tsx` (add parent shell wrapper)

- [ ] **Step 1: Update AttendanceList for parent context**

Add a `showChildColumn` prop to AttendanceList (default: false). When true, show the child name column. Filter to only show attendance records for the parent's children.

- [ ] **Step 2: Create parent-filtered AttendancePage**

In the attendance page, detect if user is parent. If so, wrap in ParentShell and pass `showChildColumn={true}` to AttendanceList. Use `useChildrenAttendance()` hook instead of `useAttendance()`.

```tsx
// In attendance-list-page.tsx, add near top:
import { ParentShell } from '../../shared/components/parent';
import { useChildrenAttendance } from '../../features/children/hooks/use-children-attendance';

// Add inside component:
const isParent = useAuthStore(state => state.user?.role === 'parent');
const { data: attendanceData } = useChildrenAttendance();

// Use attendanceData instead of useAttendance() when isParent
```

- [ ] **Step 3: Commit**

```bash
git add src/features/attendance/components/attendance-list.tsx src/pages/attendance/attendance-list-page.tsx
git commit -m "feat(parent): filter attendance list to parent children"
```

---

## Task 9: Fees Page — Parent Filtered View

**Files:**
- Modify: `src/features/fees/components/fee-list.tsx`
- Modify: `src/pages/fees/fee-list-page.tsx`

- [ ] **Step 1: Update FeeList for parent context**

Add a `groupByChild` prop (default: false). When true for parent view, group fee items by child name.

- [ ] **Step 2: Create parent-filtered FeeListPage**

Similar to attendance page, detect if parent and wrap in ParentShell. Use `useChildrenFees()` hook. Show empty state "All fee payments are up to date" when no unpaid fees.

- [ ] **Step 3: Commit**

```bash
git add src/features/fees/components/fee-list.tsx src/pages/fees/fee-list-page.tsx
git commit -m "feat(parent): filter fee list to parent children"
```

---

## Task 10: Bottom Nav — Parent Tabs

**Files:**
- Modify: `src/shared/components/layout/bottom-nav.tsx`

- [ ] **Step 1: Add parent-specific bottom nav tabs**

Add `parentTabs` array with: Dashboard, Children, Attendance, Fees. In `BottomNav`, detect if parent role and render `parentTabs` instead of `mainTabs`. For parent, render 4 tabs without "More" button.

```tsx
const parentTabs: TabItem[] = [
  { label: 'Home', href: '/', icon: LayoutDashboard },
  { label: 'Children', href: '/children', icon: Users },
  { label: 'Attendance', href: '/attendance', icon: ClipboardCheck },
  { label: 'Fees', href: '/fees', icon: DollarSign },
];

// In BottomNav component:
const user = useAuthStore(state => state.user);
const isParent = user?.role === 'parent';
const tabs = isParent ? parentTabs : mainTabs;

// Render tabs.map, no More button for parent
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/components/layout/bottom-nav.tsx
git commit -m "feat(parent): add parent-specific bottom nav tabs"
```

---

## Task 11: BreadcrumbItem Type

**Files:**
- Create: `src/shared/types/breadcrumb-item.ts`

- [ ] **Step 1: Create BreadcrumbItem type**

```typescript
export interface BreadcrumbItem {
  label: string;
  href: string;
}
```

- [ ] **Step 2: Update StudentShell to use it**

Replace inline BreadcrumbItem interface in StudentShell with import.

- [ ] **Step 3: Commit**

```bash
git add src/shared/types/breadcrumb-item.ts src/shared/components/student/student-shell.tsx
git commit -m "feat: add BreadcrumbItem type"
```

---

## Task 12: Final Review and Build

- [ ] **Step 1: Run build to verify no errors**

```bash
npm run build
```

Expected: Clean build, no TypeScript errors.

- [ ] **Step 2: Commit all remaining changes**

```bash
git add -A && git commit -m "feat(parent): complete parent portal implementation"
```

- [ ] **Step 3: Start dev server**

```bash
npm run dev
```

Login as parent@school.com / parent123 to test.

---

## Spec Coverage Check

| Spec Requirement | Task |
|-----------------|------|
| Dashboard with overview | Task 7 |
| Children list and detail | Task 6 |
| Attendance filtered | Task 8 |
| Fees filtered | Task 9 |
| ParentShell wrapper | Task 3 |
| ChildCard component | Task 4 |
| UrgencyStrip reused | Tasks 3, 7 |
| Sidebar parent nav | Task 5 |
| Bottom nav parent tabs | Task 10 |
| Loading/error/empty states | Tasks 3-10 |
| Mock DB parent-children | Task 1 |
| Parent-specific hooks | Task 2 |