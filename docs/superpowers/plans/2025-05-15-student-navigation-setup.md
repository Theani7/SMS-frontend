# Student Portal Navigation & Route Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Register new routes and update sidebar navigation to support the enhanced student portal experience.

**Architecture:** Update centralized route constants, register lazy-loaded route components with role-based protection, and expand the sidebar navigation structure.

**Tech Stack:** React, React Router 7, TypeScript, Lucide React (for icons).

---

### Task 1: Update Route Constants

**Files:**
- Modify: `src/shared/lib/constants.ts`

- [ ] **Step 1: Add new routes to the ROUTES constant**

Update `ROUTES` in `src/shared/lib/constants.ts`:
```typescript
  ASSIGNMENTS: '/assignments',
  PERFORMANCE: '/performance',
  TIMETABLE: '/timetable',
  ANNOUNCEMENTS: '/announcements',
```

- [ ] **Step 2: Commit changes**

```bash
git add src/shared/lib/constants.ts
git commit -m "feat(student-portal): add assignments, performance, timetable, and announcements routes"
```

### Task 2: Create Placeholder Pages

**Files:**
- Create: `src/pages/assignments/assignments-page.tsx`
- Create: `src/pages/performance/performance-page.tsx`
- Create: `src/pages/timetable/timetable-page.tsx`
- Create: `src/pages/announcements/announcements-page.tsx`

- [ ] **Step 1: Create placeholder for AssignmentsPage**

```tsx
// src/pages/assignments/assignments-page.tsx
export function AssignmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Assignments</h1>
      <p className="text-slate-500">Coming soon...</p>
    </div>
  );
}
```

- [ ] **Step 2: Create placeholder for PerformancePage**

```tsx
// src/pages/performance/performance-page.tsx
export function PerformancePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Performance</h1>
      <p className="text-slate-500">Coming soon...</p>
    </div>
  );
}
```

- [ ] **Step 3: Create placeholder for TimetablePage**

```tsx
// src/pages/timetable/timetable-page.tsx
export function TimetablePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Timetable</h1>
      <p className="text-slate-500">Coming soon...</p>
    </div>
  );
}
```

- [ ] **Step 4: Create placeholder for AnnouncementsPage**

```tsx
// src/pages/announcements/announcements-page.tsx
export function AnnouncementsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Announcements</h1>
      <p className="text-slate-500">Coming soon...</p>
    </div>
  );
}
```

- [ ] **Step 5: Commit changes**

```bash
git add src/pages/assignments/assignments-page.tsx src/pages/performance/performance-page.tsx src/pages/timetable/timetable-page.tsx src/pages/announcements/announcements-page.tsx
git commit -m "feat(student-portal): create placeholder pages for new student routes"
```

### Task 3: Register Protected Routes

**Files:**
- Modify: `src/app/routes.tsx`

- [ ] **Step 1: Import lazy components**

```tsx
const AssignmentsPage = lazy(() => import('../pages/assignments/assignments-page').then(m => ({ default: m.AssignmentsPage })));
const PerformancePage = lazy(() => import('../pages/performance/performance-page').then(m => ({ default: m.PerformancePage })));
const TimetablePage = lazy(() => import('../pages/timetable/timetable-page').then(m => ({ default: m.TimetablePage })));
const AnnouncementsPage = lazy(() => import('../pages/announcements/announcements-page').then(m => ({ default: m.AnnouncementsPage })));
```

- [ ] **Step 2: Register routes with student role check**

Add routes inside the `AppLayout` route block:
```tsx
          <Route
            path={ROUTES.ASSIGNMENTS}
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <AssignmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PERFORMANCE}
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <PerformancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.TIMETABLE}
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <TimetablePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ANNOUNCEMENTS}
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher', 'student', 'parent']}>
                <AnnouncementsPage />
              </ProtectedRoute>
            }
          />
```

- [ ] **Step 3: Update Fees route to include student role**

```tsx
          <Route
            path={ROUTES.FEES}
            element={
              <ProtectedRoute allowedRoles={['admin', 'parent', 'student']}>
                <FeesPage />
              </ProtectedRoute>
            }
          />
```

- [ ] **Step 4: Commit changes**

```bash
git add src/app/routes.tsx
git commit -m "feat(student-portal): register new student portal routes"
```

### Task 4: Update Sidebar Navigation

**Files:**
- Modify: `src/shared/components/layout/sidebar.tsx`

- [ ] **Step 1: Import icons**

```typescript
import {
  // ... existing icons
  Calendar,
  FileText,
  LineChart,
  Megaphone,
} from 'lucide-react';
```

- [ ] **Step 2: Update navigation arrays**

```typescript
const operationsNavigation = [
  { name: 'Attendance', href: ROUTES.ATTENDANCE, icon: ClipboardCheck, roles: ['admin', 'teacher', 'parent', 'student'] },
  { name: 'Timetable', href: ROUTES.TIMETABLE, icon: Calendar, roles: ['student'] },
  { name: 'Assignments', href: ROUTES.ASSIGNMENTS, icon: FileText, roles: ['student'] },
  { name: 'Performance', href: ROUTES.PERFORMANCE, icon: LineChart, roles: ['student'] },
  { name: 'Fees', href: ROUTES.FEES, icon: DollarSign, roles: ['admin', 'parent', 'student'] },
  { name: 'Announcements', href: ROUTES.ANNOUNCEMENTS, icon: Megaphone, roles: ['admin', 'teacher', 'parent', 'student'] },
];
```

- [ ] **Step 3: Commit changes**

```bash
git add src/shared/components/layout/sidebar.tsx
git commit -m "feat(student-portal): update sidebar with new student navigation items"
```

### Task 5: Verification

- [ ] **Step 1: Run build to check for errors**
Run: `npm run build`

- [ ] **Step 2: Run lint**
Run: `npm run lint`
