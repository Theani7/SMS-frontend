# Dashboard UI Redesign — Indigo Clarity

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the school management frontend with Indigo Clarity design system — refined color palette, collapsible sidebar, soft-shadow cards, and cohesive typography.

**Architecture:** Update CSS variables in index.css for theming, refine existing components in-place, add new layout components without breaking existing feature architecture.

**Tech Stack:** Tailwind CSS (existing), Inter font, Lucide icons, CSS variables for theming.

---

## File Structure

### Files to Modify

| File | Responsibility |
|------|----------------|
| `src/index.css` | CSS variables for Indigo Clarity palette + spacing |
| `src/shared/components/layout/sidebar.tsx` | Collapsible sidebar with icon-only state |
| `src/shared/components/layout/header.tsx` | Update for sidebar toggle state |
| `src/shared/store/ui-store.ts` | Persist collapsed sidebar state |
| `src/shared/components/data-display/stat-card.tsx` | Soft shadow card with hover |
| `src/shared/components/data-display/data-table.tsx` | Refined table styling |
| `src/shared/components/data-display/empty-state.tsx` | Updated empty state |
| `src/pages/auth/login-page.tsx` | Split-screen layout |
| `src/features/auth/components/login-form.tsx` | Refined form styling |
| `src/app/layouts/app-layout.tsx` | Main layout adjustments |
| `src/features/dashboard/components/admin-dashboard.tsx` | Updated grid layout |

### Files to Create

| File | Responsibility |
|------|----------------|
| `src/shared/components/layout/sidebar-toggle.tsx` | Animated collapse toggle button |

---

## Implementation Phases

### Phase 1: Design Tokens & Theme Variables

### Task 1: Update index.css with Indigo Clarity palette

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Update CSS variables**

Replace the existing :root and .dark blocks with Indigo Clarity palette:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 40% 98%;      /* slate-50: #f8fafc */
    --foreground: 222.2 47.4% 9.1%; /* slate-900: #0f172a */
    --card: 0 0% 100%;             /* white */
    --card-foreground: 222.2 47.4% 9.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 9.1%;
    --primary: 239 84% 67%;        /* indigo-500: #6366f1 */
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;     /* slate-100 */
    --secondary-foreground: 222.2 47.4% 9.1%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 9.1%;
    --destructive: 0 84.2% 60.2%;   /* red-500 */
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;    /* slate-200 */
    --input: 214.3 31.8% 91.4%;
    --ring: 239 84% 67%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;   /* slate-950: #020617 */
    --foreground: 210 40% 98%;
    --card: 217.2 32.6% 17%;        /* slate-900: #0f172a */
    --card-foreground: 210 40% 98%;
    --popover: 217.2 32.6% 17%;
    --popover-foreground: 210 40% 98%;
    --primary: 229 80% 76%;         /* indigo-400: #818cf8 */
    --primary-foreground: 222.2 47.4% 9.1%;
    --secondary: 217.2 32.6% 17%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17%;      /* slate-700: #334155 */
    --input: 217.2 32.6% 17%;
    --ring: 229 80% 76%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    letter-spacing: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -0.01em;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds, no errors

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(ui): apply Indigo Clarity color palette"
```

---

### Phase 2: Typography & Global Layout Polish

### Task 2: Update index.html with Inter font

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Inter font preconnect and link**

Add in the `<head>` before existing stylesheet:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Verify font loads**

Run dev server, inspect in browser DevTools Network tab for font request

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(ui): add Inter font from Google Fonts"
```

---

### Phase 3: Sidebar Redesign

### Task 3: Add sidebar collapse state to UI store

**Files:**
- Modify: `src/shared/store/ui-store.ts`

- [ ] **Step 1: Add sidebarCollapsed state**

Update the interface and store implementation:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;  // NEW: for desktop collapse state
  notifications: Notification[];
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;  // NEW
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;  // NEW
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      sidebarCollapsed: false,  // NEW: default to expanded
      notifications: [],

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleSidebarCollapse: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),  // NEW
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),  // NEW

      addNotification: (notification) => set((state) => ({
        notifications: [
          ...state.notifications,
          { ...notification, id: crypto.randomUUID() },
        ],
      })),

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ 
        sidebarOpen: state.sidebarOpen,
        sidebarCollapsed: state.sidebarCollapsed,  // NEW: persist collapse state
      }),
    }
  )
);
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/shared/store/ui-store.ts
git commit -m "feat(ui): add sidebar collapsed state to UI store"
```

---

### Task 4: Create sidebar toggle button component

**Files:**
- Create: `src/shared/components/layout/sidebar-toggle.tsx`

- [ ] **Step 1: Create toggle component**

```typescript
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useUIStore } from '../../store/ui-store';
import { cn } from '../../lib/utils';

export function SidebarToggle() {
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebarCollapse}
      className="hidden lg:flex absolute top-20 -right-3 h-6 w-6 rounded-full border bg-background shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {sidebarCollapsed ? (
        <ChevronRight className="h-3 w-3" />
      ) : (
        <ChevronLeft className="h-3 w-3" />
      )}
    </Button>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/layout/sidebar-toggle.tsx
git commit -m "feat(ui): add sidebar collapse toggle button"
```

---

### Task 5: Refactor sidebar component

**Files:**
- Modify: `src/shared/components/layout/sidebar.tsx`

- [ ] **Step 1: Update sidebar with collapse support**

```typescript
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { useUIStore } from '../../store/ui-store';
import { useAuthStore } from '../../store/auth-store';
import { ROUTES } from '../../lib/constants';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SidebarToggle } from './sidebar-toggle';

const navigation = [
  {
    name: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    roles: ['admin', 'teacher', 'parent', 'student'],
    section: 'main',
  },
  {
    name: 'Students',
    href: ROUTES.STUDENTS,
    icon: Users,
    roles: ['admin', 'teacher'],
    section: 'management',
  },
  {
    name: 'Teachers',
    href: ROUTES.TEACHERS,
    icon: GraduationCap,
    roles: ['admin'],
    section: 'management',
  },
  {
    name: 'Classes',
    href: ROUTES.CLASSES,
    icon: BookOpen,
    roles: ['admin', 'teacher'],
    section: 'management',
  },
  {
    name: 'Attendance',
    href: ROUTES.ATTENDANCE,
    icon: ClipboardCheck,
    roles: ['admin', 'teacher', 'parent', 'student'],
    section: 'operations',
  },
  {
    name: 'Fees',
    href: ROUTES.FEES,
    icon: DollarSign,
    roles: ['admin', 'parent'],
    section: 'operations',
  },
];

const sections = [
  { key: 'main', label: 'MAIN' },
  { key: 'management', label: 'MANAGEMENT' },
  { key: 'operations', label: 'OPERATIONS' },
];

export function Sidebar() {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebarCollapse } = useUIStore();
  const { role, user } = useAuthStore();

  const filteredNavigation = navigation.filter((item) =>
    role && item.roles.includes(role)
  );

  const groupedNavigation = sections.map((section) => ({
    ...section,
    items: filteredNavigation.filter((item) => item.section === section.key),
  }));

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-background border-r transition-all duration-200 ease-out lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          sidebarCollapsed ? 'lg:w-14' : 'lg:w-60'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className={cn('flex items-center gap-3', sidebarCollapsed && 'lg:justify-center lg:w-full')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <span className={cn('text-lg font-bold transition-opacity lg:block', sidebarCollapsed && 'lg:hidden lg:opacity-0')}>
              School App
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop collapse toggle */}
        <div className="relative hidden lg:block">
          <SidebarToggle />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {groupedNavigation.map((group) =>
            group.items.length > 0 ? (
              <div key={group.key} className="mb-6">
                <h3 className={cn(
                  'mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all',
                  sidebarCollapsed && 'lg:hidden lg:opacity-0'
                )}>
                  {group.label}
                </h3>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 mb-1 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        sidebarCollapsed && 'lg:justify-center lg:px-2'
                      )}
                      title={sidebarCollapsed ? item.name : undefined}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-0.5 rounded-r bg-primary" />
                      )}
                      <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-primary')} />
                      <span className={cn('transition-opacity lg:block', sidebarCollapsed && 'lg:hidden lg:opacity-0')}>
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : null
          )}
        </nav>

        {/* User section */}
        <div className={cn(
          'border-t p-4 transition-all',
          sidebarCollapsed && 'lg:p-2'
        )}>
          <div className={cn(
            'flex items-center gap-3 transition-all',
            sidebarCollapsed && 'lg:justify-center'
          )}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-semibold text-primary">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className={cn('flex-1 min-w-0 transition-opacity lg:block', sidebarCollapsed && 'lg:hidden lg:opacity-0')}>
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground capitalize">{role || 'Guest'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
```

- [ ] **Step 2: Update app-layout to handle collapsed sidebar**

Modify `src/app/layouts/app-layout.tsx`:

```typescript
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../shared/components/layout/sidebar';
import { Header } from '../../shared/components/layout/header';
import { useUIStore } from '../../shared/store/ui-store';

export function AppLayout() {
  const { sidebarOpen, sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <Sidebar />
      <div id="main-content" className={cn(
        'transition-all duration-200 ease-out',
        sidebarOpen ? 'lg:ml-60' : 'lg:ml-14'
      )}>
        <Header />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/shared/components/layout/sidebar.tsx src/app/layouts/app-layout.tsx
git commit -m "feat(ui): implement collapsible sidebar with icon-only state"
```

---

### Phase 4: Dashboard & Stat Cards

### Task 6: Update StatCard with soft shadow styling

**Files:**
- Modify: `src/shared/components/data-display/stat-card.tsx`

- [ ] **Step 1: Update StatCard component**

```typescript
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
  return (
    <Card className="transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <p className={cn(
            'text-xs mt-2 font-medium',
            trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          )}>
            {trend.positive ? '+' : '-'}{trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/data-display/stat-card.tsx
git commit -m "feat(ui): update StatCard with soft shadow and hover effect"
```

---

### Task 7: Update admin dashboard layout

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`

- [ ] **Step 1: Update dashboard with Indigo Clarity styling**

```typescript
import { useAdminStats } from '../hooks/use-dashboard-stats';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { Users, GraduationCap, BookOpen, ClipboardCheck, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { formatDate } from '../../../shared/lib/utils';

export function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Good morning, Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's what's happening today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={Users}
          description="Active enrollment"
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Total Teachers"
          value={stats?.totalTeachers || 0}
          icon={GraduationCap}
          description="Active staff"
        />
        <StatCard
          title="Total Classes"
          value={stats?.totalClasses || 0}
          icon={BookOpen}
          description="Across all grades"
        />
        <StatCard
          title="Today's Attendance"
          value={`${stats?.todayAttendance || 0}%`}
          icon={ClipboardCheck}
          description="Present rate"
          trend={{ value: 2, positive: true }}
        />
      </div>

      {/* Content Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <DollarSign className="h-5 w-5 text-primary" />
              Pending Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">{stats?.pendingFees || 0}</p>
            <p className="text-sm text-muted-foreground mt-1">students with pending fees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recentActivities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 text-sm">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/features/dashboard/components/admin-dashboard.tsx
git commit -m "feat(ui): update admin dashboard with Indigo Clarity styling"
```

---

### Phase 5: Tables & Data Display

### Task 8: Refine DataTable styling

**Files:**
- Modify: `src/shared/components/data-display/data-table.tsx`

- [ ] **Step 1: Update DataTable with refined styling**

```typescript
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { cn } from '../../lib/utils';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50 border-b">
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      aria-sort={
                        isSorted === 'asc'
                          ? 'ascending'
                          : isSorted === 'desc'
                          ? 'descending'
                          : undefined
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update Table component with better overflow**

Modify `src/shared/components/ui/table.tsx`:

```typescript
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/shared/components/data-display/data-table.tsx src/shared/components/ui/table.tsx
git commit -m "feat(ui): refine DataTable styling with Indigo Clarity"
```

---

### Task 9: Update EmptyState component

**Files:**
- Modify: `src/shared/components/data-display/empty-state.tsx`

- [ ] **Step 1: Update EmptyState with refined styling**

```typescript
import { Button } from '../ui/button';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
        <FileQuestion className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/data-display/empty-state.tsx
git commit -m "feat(ui): update EmptyState with refined styling"
```

---

### Phase 6: Login Page Redesign

### Task 10: Create split-screen login page layout

**Files:**
- Modify: `src/pages/auth/login-page.tsx`

- [ ] **Step 1: Update login page with split-screen layout**

```typescript
import { LoginForm } from '../../features/auth/components/login-form';
import { School, Users, BookOpen, ClipboardCheck, DollarSign } from 'lucide-react';

const features = [
  { icon: Users, text: 'Streamlined student management' },
  { icon: ClipboardCheck, text: 'Real-time attendance tracking' },
  { icon: DollarSign, text: 'Automated fee management' },
  { icon: BookOpen, text: 'Class scheduling made simple' },
];

export function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-100 dark:from-indigo-950 dark:via-slate-950 dark:to-indigo-950 relative overflow-hidden">
        {/* Dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex flex-col justify-center p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
              <School className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">School App</h1>
              <p className="text-sm text-muted-foreground">Management Platform</p>
            </div>
          </div>

          {/* Headline */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Education Platform
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Modern management for progressive schools. Streamline attendance, fees, and communication in one place.
            </p>
          </div>

          {/* Abstract illustration */}
          <div className="mb-12">
            <svg className="w-full max-w-sm mx-auto" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Connected nodes representing students/teachers/classes */}
              <circle cx="100" cy="60" r="20" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="2"/>
              <circle cx="40" cy="40" r="12" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
              <circle cx="160" cy="40" r="12" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
              <circle cx="40" cy="90" r="12" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
              <circle cx="160" cy="90" r="12" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
              <line x1="85" y1="50" x2="52" y2="44" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="115" y1="50" x2="148" y2="44" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="85" y1="70" x2="52" y2="86" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4"/>
              <line x1="115" y1="70" x2="148" y2="86" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.4"/>
            </svg>
          </div>

          {/* Feature list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-4 w-4 text-primary" />
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo (visible on mobile) */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
              <School className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">School App</span>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/pages/auth/login-page.tsx
git commit -m "feat(ui): implement split-screen login page layout"
```

---

### Task 11: Refine LoginForm component

**Files:**
- Modify: `src/features/auth/components/login-form.tsx`

- [ ] **Step 1: Update LoginForm with refined styling**

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/use-login';
import { ROUTES } from '../../../shared/lib/constants';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { Label } from '../../../shared/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';

export function LoginForm() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => navigate(ROUTES.DASHBOARD),
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your dashboard</p>
      </div>

      <Card className="border-0 shadow-none lg:border lg:shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 rounded-lg"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Demo Credentials */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Demo Accounts</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-1">
          <p><span className="font-medium text-foreground">Admin:</span> admin@school.com</p>
          <p><span className="font-medium text-foreground">Teacher:</span> teacher@school.com</p>
          <p><span className="font-medium text-foreground">Parent:</span> parent@school.com</p>
          <p><span className="font-medium text-foreground">Student:</span> student@school.com</p>
          <p className="pt-1 border-t border-dashed border-muted-foreground/20 mt-2">
            Password for all: admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/features/auth/components/login-form.tsx
git commit -m "feat(ui): refine LoginForm with Indigo Clarity styling"
```

---

### Phase 7: Dark Mode Refinement

### Task 12: Verify dark mode transitions and polish

**Files:**
- Modify: `src/index.css` (if needed based on testing)

- [ ] **Step 1: Add smooth theme transitions**

Add to the end of index.css:

```css
/* Smooth theme transitions */
html {
  scroll-behavior: smooth;
}

body {
  transition: background-color 200ms ease-out, color 200ms ease-out;
}

/* Card hover improvements for dark mode */
@media (prefers-color-scheme: dark) {
  .dark .shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  }
}
```

- [ ] **Step 2: Verify dark mode**

Start dev server, toggle dark mode, verify:
- Smooth transitions (no jarring color changes)
- Indigo-400 primary visible in dark mode
- Cards use slate-900 background (not pure black)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(ui): add smooth dark mode transitions"
```

---

### Phase 8: Accessibility & Responsive Verification

### Task 13: Verify accessibility and responsive behavior

**Files:**
- Review all modified components

- [ ] **Step 1: TypeScript and build verification**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds, no errors

- [ ] **Step 2: Verify keyboard navigation**

Test in browser:
- Tab through all interactive elements
- Skip-to-content link works
- Sidebar collapse via keyboard
- Focus rings visible (indigo-500)

- [ ] **Step 3: Verify responsive breakpoints**

Test at:
- 320px (mobile)
- 768px (tablet)
- 1024px (tablet landscape / small desktop)
- 1280px+ (desktop)

- [ ] **Step 4: Verify reduced motion**

Browser DevTools → Accessibility → Reduced motion preference:
- Verify animations respect preference

- [ ] **Step 5: Verify screen reader**

Check:
- aria-labels present on icon buttons
- Table headers have aria-sort
- Navigation has role="navigation"

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(ui): complete Indigo Clarity UI redesign"
```

---

## Self-Review Checklist

1. **Spec coverage:** All sections from spec have implementation tasks
2. **Placeholder scan:** No TBD/TODO in implementation steps
3. **Type consistency:** All TypeScript types match existing code

## Execution Options

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
