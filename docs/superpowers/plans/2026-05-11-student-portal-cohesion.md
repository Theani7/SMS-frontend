# Student Portal Cohesion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the unified Student Portal experience — student shell, shared components, workflow continuity, and mobile navigation — to make the portal feel like one integrated productivity workspace.

**Architecture:** New `src/shared/components/student/` directory with atomic student-specific components. Shared student layout builds on existing `AppLayout` infrastructure. Integration via lightweight derived hooks, not centralized state. Bottom nav on mobile via new `BottomNav` component with route-aware active state.

**Tech Stack:** React 18 + Vite, TypeScript, Tailwind CSS, React Router, Zustand (existing auth store), React Query (existing data fetching)

---

## File Map

```
src/shared/components/student/
├── index.ts                          # Re-exports all student components
├── student-shell.tsx                 # Main layout wrapper for student pages
├── student-card.tsx                 # Standard student card with urgency states
├── urgency-strip.tsx                # Shared urgency signal strip
├── section-header.tsx               # Unified section label
├── error-card.tsx                   # Shared error state with retry

src/shared/components/layout/
├── bottom-nav.tsx                   # NEW: Mobile tab bar for students
└── sidebar.tsx                     # MODIFIED: Student variant, student identity

src/features/students/
└── components/
    └── quick-switch-modal.tsx       # NEW: Cmd+K command palette

src/pages/assignments/assignments-page.tsx           # MODIFIED: → StudentShell
src/pages/performance/performance-page.tsx           # MODIFIED: → StudentShell
src/pages/fees/fee-list-page.tsx                     # MODIFIED: → StudentShell
src/pages/announcements/announcements-page.tsx       # MODIFIED: → StudentShell

src/features/dashboard/components/widgets/
├── timeline-schedule.tsx            # MODIFIED: Use useTodaySlots()
├── quick-fees.tsx                   # MODIFIED: Use useOutstandingBalance()
├── announcements-list.tsx           # MODIFIED: Use useRecentAnnouncements()
```

---

## Phase 1: Shared Student Components

### Task 1: Create `section-header.tsx`

**Files:**
- Create: `src/shared/components/student/section-header.tsx`
- Modify: `src/shared/components/student/index.ts`

- [ ] **Step 1: Create the component file**

```tsx
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  count?: number;
  action?: ReactNode;
  className?: string;
}

/**
 * Unified section label used inside modules.
 * Consistent 11px uppercase bold label, optional count badge, optional action.
 */
export function SectionHeader({ label, count, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </h3>
        {count !== undefined && (
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
```

- [ ] **Step 2: Update index.ts**

```ts
export { SectionHeader } from './section-header';
```

- [ ] **Step 3: Test it renders**

Check that the component renders correctly without errors.

- [ ] **Step 4: Commit**

```bash
git add src/shared/components/student/section-header.tsx src/shared/components/student/index.ts
git commit -m "feat(student): add SectionHeader component"
```

---

### Task 2: Create `error-card.tsx`

**Files:**
- Create: `src/shared/components/student/error-card.tsx`
- Modify: `src/shared/components/student/index.ts`

- [ ] **Step 1: Create the component**

```tsx
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

interface ErrorCardProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Shared error state for all student modules.
 * Uses existing card pattern, retry button, no dismiss.
 */
export function ErrorCard({
  title = "Couldn't load this data",
  description = 'Check your connection and try again.',
  onRetry,
  className,
}: ErrorCardProps) {
  return (
    <Card className={cn('border-rose-200 dark:border-rose-900/30', className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-rose-500" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[240px] mb-6">
          {description}
        </p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="gap-2"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Update index.ts**

```ts
export { ErrorCard } from './error-card';
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/student/error-card.tsx src/shared/components/student/index.ts
git commit -m "feat(student): add ErrorCard component"
```

---

### Task 3: Create `student-card.tsx`

**Files:**
- Create: `src/shared/components/student/student-card.tsx`
- Modify: `src/shared/components/student/index.ts`

- [ ] **Step 1: Create the component**

```tsx
import { cn } from '../../lib/utils';
import { Card, CardContent } from '../ui/card';
import type { ReactNode, MouseEvent } from 'react';

type Urgency = 'overdue' | 'warning' | 'calm';
type Density = 'compact' | 'standard';

interface StudentCardProps {
  urgency?: Urgency;
  density?: Density;
  onClick?: (e: MouseEvent) => void;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

const urgencyStyles: Record<Urgency, string> = {
  overdue: 'border-rose-200 dark:border-rose-900/30 ring-1 ring-rose-100 dark:ring-rose-900/10',
  warning: 'border-amber-200 dark:border-amber-900/30 ring-1 ring-amber-100 dark:ring-amber-900/10',
  calm: 'border-slate-200/60 dark:border-slate-800/60',
};

const urgencyBadge: Record<Urgency, string> = {
  overdue: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  warning: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  calm: '',
};

const densityPadding: Record<Density, string> = {
  compact: 'p-3',
  standard: 'p-5',
};

/**
 * Standard card for student context.
 * Compact = tight lists (assignments, attendance). Standard = mixed content.
 * Urgency drives border color + optional badge.
 */
export function StudentCard({
  urgency = 'calm',
  density = 'standard',
  onClick,
  action,
  children,
  className,
}: StudentCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-slate-900 shadow-soft transition-all duration-200 hover:shadow-md cursor-pointer',
        urgencyStyles[urgency],
        className
      )}
    >
      <CardContent className={cn(densityPadding[density], 'flex items-start justify-between gap-4')}>
        <div className="flex-1 min-w-0">{children}</div>
        {action && <div className="shrink-0">{action}</div>}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Update index.ts**

```ts
export { StudentCard } from './student-card';
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/student/student-card.tsx src/shared/components/student/index.ts
git commit -m "feat(student): add StudentCard component"
```

---

### Task 4: Create `urgency-strip.tsx`

**Files:**
- Create: `src/shared/components/student/urgency-strip.tsx`
- Modify: `src/shared/components/student/index.ts`

- [ ] **Step 1: Create the component**

```tsx
import { Link } from 'react-router-dom';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { MouseEvent } from 'react';
import { useState } from 'react';

type UrgencyLevel = 'high' | 'info';

interface UrgencyItem {
  id: string;
  label: string;
  urgency: UrgencyLevel;
  href?: string;
}

interface UrgencyStripProps {
  items: UrgencyItem[];
  className?: string;
}

/**
 * Shared urgency strip surfacing across every student module page.
 * Renders above page title. Collapsible per-session in localStorage.
 * Max 3 items shown, rest collapsed into "+N more".
 */
const STORAGE_KEY = 'student-urgency-strip-dismissed';

export function UrgencyStrip({ items, className }: UrgencyStripProps) {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  if (dismissed || items.length === 0) return null;

  const visibleItems = items.slice(0, 3);
  const overflowCount = items.length - 3;

  const handleDismiss = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore localStorage errors
    }
    setDismissed(true);
  };

  const urgencyIcon = (urgency: UrgencyLevel) => {
    if (urgency === 'high') return <AlertTriangle className="h-3.5 w-3.5" />;
    return <Info className="h-3.5 w-3.5" />;
  };

  const urgencyStyle = (urgency: UrgencyLevel) => {
    if (urgency === 'high') return 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/30';
    return 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/30';
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60', className)}>
      {visibleItems.map((item) => {
        const content = (
          <>
            <span className={cn('flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider', urgencyStyle(item.urgency))}>
              {urgencyIcon(item.urgency)}
              {item.label}
            </span>
          </>
        );

        return item.href ? (
          <Link key={item.id} to={item.href} className="hover:opacity-80 transition-opacity">
            {content}
          </Link>
        ) : (
          <span key={item.id}>{content}</span>
        );
      })}
      {overflowCount > 0 && (
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
          +{overflowCount} more
        </span>
      )}
      <button
        onClick={handleDismiss}
        className="ml-auto p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        aria-label="Dismiss urgency strip"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Update index.ts**

```ts
export { UrgencyStrip } from './urgency-strip';
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/student/urgency-strip.tsx src/shared/components/student/index.ts
git commit -m "feat(student): add UrgencyStrip component"
```

---

### Task 5: Create `student-shell.tsx`

**Files:**
- Create: `src/shared/components/student/student-shell.tsx`
- Modify: `src/shared/components/student/index.ts`

- [ ] **Step 1: Create the component**

```tsx
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { cn } from '../../lib/utils';
import { UrgencyStrip } from './urgency-strip';
import type { ReactNode, MouseEvent } from 'react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ActionZone {
  label: string;
  onClick: (e: MouseEvent) => void;
  mobile?: boolean;
  actionHeavy?: boolean;
}

interface UrgencyItem {
  id: string;
  label: string;
  urgency: 'high' | 'info';
  href?: string;
}

interface StudentShellProps {
  title: string;
  urgencyItems?: UrgencyItem[];
  breadcrumbs?: Breadcrumb[];
  actionZone?: ActionZone;
  mobile?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Standard layout wrapper for every student page.
 * Provides: page context header, workflow breadcrumb trail, consistent padding.
 * Bottom action zone shown on mobile always, on desktop when actionHeavy: true.
 */
export function StudentShell({
  title,
  urgencyItems = [],
  breadcrumbs = [],
  actionZone,
  mobile = false,
  children,
  className,
}: StudentShellProps) {
  const showActionZone = actionZone && (mobile || actionZone.actionHeavy);

  return (
    <div className={cn('flex flex-col gap-4 lg:gap-6 p-4 lg:p-6', className)}>
      {/* Breadcrumb trail */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500" aria-label="Breadcrumb">
          <Link to="/" className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Home className="h-3 w-3" />
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              <span className="text-slate-300 dark:text-slate-700">›</span>
              {crumb.href && index < breadcrumbs.length - 1 ? (
                <Link to={crumb.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className={cn(
                  'font-medium',
                  index === breadcrumbs.length - 1 ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'
                )}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Urgency strip */}
      <UrgencyStrip items={urgencyItems} />

      {/* Page header */}
      <header className="flex flex-col gap-0.5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          {urgencyItems.length > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-[10px] font-bold text-rose-600 dark:text-rose-400">
              {urgencyItems.length}
            </span>
          )}
        </div>
      </header>

      {/* Page content */}
      <div className="flex-1">{children}</div>

      {/* Sticky bottom action zone */}
      {showActionZone && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(4+env(safe-area-inset-bottom)) bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 lg:hidden">
          <button
            onClick={actionZone.onClick}
            className="w-full h-12 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 active:scale-[0.98] transition-all"
          >
            {actionZone.label}
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Update index.ts**

```ts
export { StudentShell } from './student-shell';
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/student/student-shell.tsx src/shared/components/student/index.ts
git commit -m "feat(student): add StudentShell component"
```

---

## Phase 2: Mobile Bottom Nav

### Task 6: Create `bottom-nav.tsx`

**Files:**
- Create: `src/shared/components/layout/bottom-nav.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Calendar, TrendingUp, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { DollarSign, Bell } from 'lucide-react';

const mainTabs = [
  { label: 'Home', href: '/', icon: LayoutDashboard },
  { label: 'Assignments', href: '/assignments', icon: ClipboardList },
  { label: 'Timetable', href: '/timetable', icon: Calendar },
  { label: 'Performance', href: '/performance', icon: TrendingUp },
];

const moreTabs = [
  { label: 'Fees', href: '/fees', icon: DollarSign },
  { label: 'Announcements', href: '/announcements', icon: Bell },
];

/**
 * Bottom tab bar for student mobile navigation.
 * 4 primary tabs + "More" sheet for secondary nav items.
 * Route-aware active state with indigo underline.
 */
export function BottomNav() {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();

  const isActive = (href: string) => location === href || location.startsWith(`${href}/`);

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const handleMoreNavigate = (href: string) => {
    setMoreOpen(false);
    navigate(href);
  };

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-14 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {mainTabs.map((tab) => (
          <button
            key={tab.href}
            onClick={() => handleNavigate(tab.href)}
            className={cn(
              'flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors',
              isActive(tab.href)
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-400 dark:text-slate-600'
            )}
            aria-label={tab.label}
            aria-current={isActive(tab.href) ? 'page' : undefined}
          >
            <tab.icon
              className={cn('h-5 w-5 transition-all', isActive(tab.href) ? 'fill-indigo-100 dark:fill-indigo-900/30' : '')}
            />
            <span className="text-[10px] font-bold">{tab.label}</span>
            {isActive(tab.href) && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>
        ))}

        {/* More tab opens sheet */}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-col items-center justify-center gap-1 w-16 h-full text-slate-400 dark:text-slate-600"
          aria-label="More options"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-[10px] font-bold">More</span>
        </button>
      </nav>

      {/* More sheet */}
      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl pb-[env(safe-area-inset-bottom)]">
          <SheetHeader className="sr-only">
            <SheetTitle>More navigation</SheetTitle>
          </SheetHeader>
          <div className="space-y-1 mt-4">
            {moreTabs.map((tab) => (
              <button
                key={tab.href}
                onClick={() => handleMoreNavigate(tab.href)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors',
                  isActive(tab.href)
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                )}
              >
                <tab.icon className="h-5 w-5" />
                <span className="text-sm font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/components/layout/bottom-nav.tsx
git commit -m "feat(student): add BottomNav mobile tab bar"
```

---

## Phase 3: Sidebar Student Variant

### Task 7: Update sidebar for student variant

**Files:**
- Modify: `src/shared/components/layout/sidebar.tsx`

- [ ] **Step 1: Review current sidebar structure**

Read `src/shared/components/layout/sidebar.tsx` — especially the nav items array and user identity section.

- [ ] **Step 2: Add student nav order (obligation-first)**

In `mainNavigation` array, update order for student role to: Dashboard, Assignments, Timetable, Performance, Attendance, Fees, Announcements. Keep existing nav items, reorder the filtered display for students.

- [ ] **Step 3: Remove section labels for students**

The `SectionNav` component renders section titles. For student role, hide all section titles (render them with `sr-only` class or return null).

- [ ] **Step 4: Add student identity below logo**

Below the logo area, add student avatar + name for student role. Show user.name and a small avatar with user initial.

- [ ] **Step 5: Update active dot indicator**

The active item currently shows a small dot on the right side. For student role, move it to the left side as a filled indigo dot indicator.

- [ ] **Step 6: Commit**

```bash
git add src/shared/components/layout/sidebar.tsx
git commit -m "feat(student): update sidebar for student variant"
```

---

## Phase 4: Migrate Pages to StudentShell

### Task 8: Migrate `assignments-page.tsx`

**Files:**
- Modify: `src/pages/assignments/assignments-page.tsx`
- Read: `src/shared/components/student/index.ts` (for imports)

- [ ] **Step 1: Read the current page**

```bash
cat src/pages/assignments/assignments-page.tsx
```

- [ ] **Step 2: Replace PageContainer with StudentShell**

Import `StudentShell` and `UrgencyStrip` from the student components. Wrap content with `StudentShell`. Pass breadcrumbs `[{ label: 'Dashboard', href: '/' }, { label: 'Assignments' }]`. Replace the `withMesh` prop with standard page container behavior.

- [ ] **Step 3: Add preview strip from timetable**

Import `useModulePreview` hook (will be created in Phase 5). Add a one-line strip above the assignments inbox showing "Next class: [Subject] at [Time], [Room]".

- [ ] **Step 4: Fix loading state**

The current AssignmentsInbox uses skeleton pulse — verify it matches the spec's compact density pattern (5-6 skeleton rows). If it uses a different pattern, update to match.

- [ ] **Step 5: Commit**

```bash
git add src/pages/assignments/assignments-page.tsx
git commit -m "refactor(assignments): migrate to StudentShell"
```

---

### Task 9: Migrate `performance-page.tsx`

**Files:**
- Modify: `src/pages/performance/performance-page.tsx`

- [ ] **Step 1: Read the current page**

```bash
cat src/pages/performance/performance-page.tsx
```

- [ ] **Step 2: Replace PageContainer with StudentShell**

Wrap content with `StudentShell`. Pass breadcrumbs `[{ label: 'Dashboard', href: '/' }, { label: 'Performance' }]`.

- [ ] **Step 3: Add preview strip**

Add "3 graded since you last checked" strip using derived hook.

- [ ] **Step 4: Audit section headers**

In `GrowthDashboard.tsx`, replace any inline section label elements with `SectionHeader` component.

- [ ] **Step 5: Audit empty state**

Verify the performance page uses contextual empty message. If not, update.

- [ ] **Step 6: Commit**

```bash
git add src/pages/performance/performance-page.tsx
git commit -m "refactor(performance): migrate to StudentShell"
```

---

### Task 10: Migrate `fee-list-page.tsx`

**Files:**
- Modify: `src/pages/fees/fee-list-page.tsx`

- [ ] **Step 1: Read the current page**

```bash
cat src/pages/fees/fee-list-page.tsx
```

- [ ] **Step 2: Replace PageContainer with StudentShell**

Wrap content with `StudentShell`. Pass breadcrumbs `[{ label: 'Dashboard', href: '/' }, { label: 'Finances' }]`.

- [ ] **Step 3: Add preview strip**

Add "Fee payment reminder from administration" strip.

- [ ] **Step 4: Audit action hierarchy**

The Fees page uses `DashboardGrid` with a sidebar. Verify the urgency signal (outstanding balance) appears first, then the primary action (transaction history), then secondary info. Reorder if needed.

- [ ] **Step 5: Commit**

```bash
git add src/pages/fees/fee-list-page.tsx
git commit -m "refactor(fees): migrate to StudentShell"
```

---

### Task 11: Migrate `announcements-page.tsx`

**Files:**
- Modify: `src/pages/announcements/announcements-page.tsx`

- [ ] **Step 1: Read the current page**

```bash
cat src/pages/announcements/announcements-page.tsx
```

- [ ] **Step 2: Replace PageContainer with StudentShell**

Wrap content with `StudentShell`. Pass breadcrumbs `[{ label: 'Dashboard', href: '/' }, { label: 'Announcements' }]`.

- [ ] **Step 3: Fix loading state**

The current `AnnouncementsInbox` uses a large center spinner. Replace with skeleton pulse matching standard density (skeleton card grid, not full-page loading state).

- [ ] **Step 4: Audit section headers**

Use `SectionHeader` for any inline section labels inside the inbox component.

- [ ] **Step 5: Commit**

```bash
git add src/pages/announcements/announcements-page.tsx
git commit -m "refactor(announcements): migrate to StudentShell, fix loading state"
```

---

## Phase 5: Workflow Continuity

### Task 12: Create `use-module-preview.ts` hook

**Files:**
- Create: `src/shared/hooks/use-module-preview.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useTimetable } from '../../features/timetable/hooks/use-timetable';
import { useAssignments } from '../../features/assignments/hooks/use-assignments';
import { useAnnouncements } from '../../features/announcements/hooks/use-announcements';

/**
 * Shared derived hook for cross-module previews.
 * Returns the single most relevant item from a target module.
 * Used for one-line preview strips on module pages.
 */

export function useModulePreview(module: 'timetable' | 'assignments' | 'announcements') {
  switch (module) {
    case 'timetable': {
      const { data: slots } = useTimetable();
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      const todaySlots = (slots || []).filter(s => s.day === today).sort((a, b) => a.startTime.localeCompare(b.startTime));
      const nextSlot = todaySlots.find(s => s.startTime > now);

      if (!nextSlot) return null;
      return {
        label: `Next class: ${nextSlot.subject} at ${nextSlot.startTime}, ${nextSlot.room}`,
        href: '/timetable',
      };
    }
    case 'assignments': {
      const { data: assignments } = useAssignments();
      const recent = (assignments || []).filter(a => a.status === 'submitted').slice(0, 3);
      if (recent.length === 0) return null;
      return {
        label: `${recent.length} graded since you last checked`,
        href: '/performance',
      };
    }
    case 'announcements': {
      const { announcements } = useAnnouncements();
      if (!announcements || announcements.length === 0) return null;
      const latest = announcements[0];
      return {
        label: `Latest: ${latest.title}`,
        href: '/announcements',
      };
    }
    default:
      return null;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/hooks/use-module-preview.ts
git commit -m "feat(student): add useModulePreview hook"
```

---

### Task 13: Create `use-urgency-signals.ts` hook

**Files:**
- Create: `src/shared/hooks/use-urgency-signals.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useAssignments } from '../../features/assignments/hooks/use-assignments';
import { useFees } from '../../features/fees/hooks/use-fees';

/**
 * Aggregates urgency signals across all student modules.
 * Used by StudentShell to populate the UrgencyStrip.
 */

interface UrgencySignal {
  id: string;
  label: string;
  urgency: 'high' | 'info';
  href?: string;
}

export function useUrgencySignals(): UrgencySignal[] {
  const { data: assignments } = useAssignments();
  const { data: fees } = useFees();

  const signals: UrgencySignal[] = [];

  // Overdue assignments
  const overdue = (assignments || []).filter(
    a => new Date(a.dueDate) < new Date() && a.status !== 'submitted'
  );
  if (overdue.length > 0) {
    signals.push({
      id: 'assignments-overdue',
      label: `${overdue.length} assignment${overdue.length > 1 ? 's' : ''} overdue`,
      urgency: 'high',
      href: '/assignments',
    });
  }

  // Due today
  const today = new Date().toDateString();
  const dueToday = (assignments || []).filter(
    a => new Date(a.dueDate).toDateString() === today && a.status !== 'submitted'
  );
  if (dueToday.length > 0) {
    signals.push({
      id: 'assignments-due-today',
      label: `${dueToday.length} due today`,
      urgency: 'high',
      href: '/assignments',
    });
  }

  // Outstanding fees
  const outstanding = (fees || []).filter(f => f.status !== 'paid');
  if (outstanding.length > 0) {
    signals.push({
      id: 'fees-outstanding',
      label: `${outstanding.length} payment${outstanding.length > 1 ? 's' : ''} outstanding`,
      urgency: 'info',
      href: '/fees',
    });
  }

  return signals;
}
```

- [ ] **Step 2: Update StudentShell to use the hook**

Modify `src/shared/components/student/student-shell.tsx` to accept `urgencyItems` prop, which is derived from the `useUrgencySignals` hook at the page level (not inside the shell — keep the shell as a presentational component).

- [ ] **Step 3: Commit**

```bash
git add src/shared/hooks/use-urgency-signals.ts
git commit -m "feat(student): add useUrgencySignals hook"
```

---

### Task 14: Refactor dashboard widgets to real hooks

**Files:**
- Modify: `src/features/dashboard/components/widgets/timeline-schedule.tsx`
- Modify: `src/features/dashboard/components/widgets/quick-fees.tsx`
- Modify: `src/features/dashboard/components/widgets/announcements-list.tsx`

- [ ] **Step 1: Read current widget implementations**

- [ ] **Step 2: Refactor `timeline-schedule.tsx`**

Replace the static `MOCK_SCHEDULE` array with data from the `useTimetable()` hook. Filter for today's slots, sort by start time. Keep the same visual output but make it reactive.

- [ ] **Step 3: Refactor `quick-fees.tsx`**

Replace the static balance with data from `useFees()` hook. Calculate outstanding balance from unpaid fees. Keep the same dark card visual.

- [ ] **Step 4: Refactor `announcements-list.tsx`**

Replace the static mock array with `useAnnouncements()` hook. Display the 2 most recent announcements. Keep the same visual output but make it reactive.

- [ ] **Step 5: Commit**

```bash
git add src/features/dashboard/components/widgets/timeline-schedule.tsx src/features/dashboard/components/widgets/quick-fees.tsx src/features/dashboard/components/widgets/announcements-list.tsx
git commit -m "refactor(dashboard): wire widgets to real data hooks"
```

---

## Phase 6: Polish & Audit

### Task 15: Consistency audit — loading states

**Files:**
- Review: All student module components

- [ ] **Step 1: Audit loading states across all modules**

Check each module's loading state:

| Module | Component | Current Loading | Expected |
|--------|-----------|----------------|----------|
| Assignments | AssignmentsInbox | Skeleton rows | Compact skeleton (5-6 rows) |
| Performance | GrowthDashboard | Skeleton grid | Standard skeleton (card grid) |
| Timetable | TimetableView | Center spinner | Skeleton pulse |
| Attendance | AttendanceList | Skeleton rows | Compact skeleton |
| Fees | FeeList | Skeleton rows | Compact skeleton |
| Announcements | AnnouncementsInbox | **Center spinner** | **Skeleton grid** ← fix this |

- [ ] **Step 2: Fix Announcements loading state**

Replace the large center spinner with a skeleton pulse matching standard density.

- [ ] **Step 3: Verify all skeletons use consistent pattern**

`h-16 bg-slate-100 dark:bg-slate-800 rounded-xl` for list items. `h-96 rounded-2xl` for card areas.

- [ ] **Step 4: Commit**

```bash
git add [files changed]
git commit -m "fix(student): standardize loading states"
```

---

### Task 16: Consistency audit — empty states

**Files:**
- Review: All student module components

- [ ] **Step 1: Audit empty states across all modules**

Check each module's empty state:

| Module | Component | Current Empty Message | Status |
|--------|-----------|----------------------|--------|
| Assignments | AssignmentsInbox | (none — shows empty list) | Needs empty state |
| Timetable | TimetableView | "No classes today — use the free time wisely" | Correct |
| Attendance | AttendanceList | "No attendance records" | Generic — fix |
| Fees | FeeList | "Your payment history will appear here" | Generic — fix |
| Performance | GrowthDashboard | (chart always shows data) | OK |
| Announcements | AnnouncementsInbox | "No announcements" | Generic — fix |

- [ ] **Step 2: Fix empty state messages**

Update generic messages to be contextual per the spec:

- Attendance: "No attendance records yet" (add "yet" for optimism)
- Fees: "All caught up — no outstanding fees" (if search empty: "No transactions match your search")
- Announcements: "You're all caught up — no new announcements" (if filtered empty: "No announcements in this category")

- [ ] **Step 3: Add empty state to AssignmentsInbox**

Add an empty state for when no assignments exist: "No assignments yet — enjoy the calm."

- [ ] **Step 4: Commit**

```bash
git add [files changed]
git commit -m "fix(student): contextual empty state messages"
```

---

### Task 17: Consistency audit — error states

**Files:**
- Review: All student module components

- [ ] **Step 1: Audit error handling across all modules**

Check each module for error handling:

| Module | Component | Error Handling | Status |
|--------|-----------|---------------|--------|
| Assignments | AssignmentsInbox | React Query error | OK |
| Performance | GrowthDashboard | React Query error | OK |
| Timetable | TimetableView | React Query error | OK |
| Attendance | AttendanceList | (none visible) | Add ErrorCard |
| Fees | FeeList | React Query error | OK |
| Announcements | AnnouncementsInbox | React Query error | OK |

- [ ] **Step 2: Add ErrorCard to AttendanceList**

In `AttendanceList.tsx`, add error state handling using the `ErrorCard` component with `onRetry` pointing to `refetch()`.

- [ ] **Step 3: Commit**

```bash
git add src/features/attendance/components/attendance-list.tsx
git commit -m "fix(attendance): add ErrorCard with retry"
```

---

### Task 18: Verify consistency checklist

**Files:**
- Review: All student modules

- [ ] **Step 1: Run through the consistency audit checklist**

Go through each item:

- [ ] Uses `StudentShell` as the page wrapper
- [ ] UrgencyStrip renders when urgency signals exist
- [ ] Section headers use `SectionHeader` component
- [ ] Density tier is fixed for the whole page
- [ ] Action hierarchy: urgency → primary → secondary → tertiary
- [ ] Loading state uses skeleton pulse (not spinner or center loader)
- [ ] Empty state message is contextual (not generic)
- [ ] Error state uses `ErrorCard` with retry
- [ ] All touch targets ≥ 40px on mobile
- [ ] Workflow breadcrumb appears on module pages
- [ ] No hover-reveal-only actions on mobile
- [ ] Typography scale matches shared scale
- [ ] Cards use `StudentCard` or consistent tokens
- [ ] Bottom tab bar reflects current active route on mobile

- [ ] **Step 2: Fix any remaining checklist items**

Address any checklist items not yet satisfied. Commit each fix.

- [ ] **Step 3: Final commit**

```bash
git add [all remaining changes]
git commit -m "fix(student): consistency audit — final pass"
```

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 1 | 1–5 | Shared student components |
| 2 | 6 | Mobile bottom nav |
| 3 | 7 | Sidebar student variant |
| 4 | 8–11 | Page migrations |
| 5 | 12–14 | Workflow continuity |
| 6 | 15–18 | Polish and audit |

**Total: 18 tasks across 6 phases.**

After Phase 4, all student pages should use `StudentShell` and feel unified. After Phase 5, modules should reference each other contextually. After Phase 6, the portal should pass all consistency checks and feel like one integrated product.
