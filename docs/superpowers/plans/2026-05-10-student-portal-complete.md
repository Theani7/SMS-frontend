# Student Portal Productivity Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the student role from a passive view into a personal productivity workspace featuring an urgency-driven dashboard, a Linear-style assignments inbox, and growth-oriented performance analytics.

**Architecture:** Role-based feature decomposition. Uses existing "Modern SaaS" standards (dense UI, Inter typography, mesh backgrounds). Implemented as a set of focused widgets and new feature modules.

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide React, Zustand (Auth/UI), TanStack Query (Data).

---

### Task 1: Navigation & Route Setup

**Files:**
- Modify: `src/shared/lib/constants.ts` (Add student routes)
- Modify: `src/app/routes.tsx` (Register new student pages)
- Modify: `src/shared/components/layout/sidebar.tsx` (Update student nav items)

- [ ] **Step 1: Update ROUTES constants**
```typescript
// Add to ROUTES in src/shared/lib/constants.ts
ASSIGNMENTS: '/assignments',
PERFORMANCE: '/performance',
```

- [ ] **Step 2: Update Sidebar navigation for students**
Ensure the sidebar shows Dashboard, Timetable, Assignments, Performance, Fees, and Announcements for the student role.

- [ ] **Step 3: Register Lazy-loaded routes**
```typescript
const AssignmentsPage = lazy(() => import('../pages/assignments/assignments-page').then(m => ({ default: m.AssignmentsPage })));
const PerformancePage = lazy(() => import('../pages/performance/performance-page').then(m => ({ default: m.PerformancePage })));
// Add to protected routes with student role check
```

- [ ] **Step 4: Commit**
```bash
git add . && git commit -m "feat(student): setup navigation and routes for student portal"
```

---

### Task 2: Student Dashboard (The Hub) - Base Layout

**Files:**
- Modify: `src/features/dashboard/components/student-dashboard.tsx`
- Create: `src/features/dashboard/components/widgets/urgency-ribbon.tsx`
- Create: `src/features/dashboard/components/widgets/next-best-action.tsx`

- [ ] **Step 1: Implement UrgencyRibbon**
Create a 2-column grid showing critical deadlines with Rose/Amber color coding.

- [ ] **Step 2: Implement NextBestAction**
Create the "Next Best Action" card with the lightning bolt icon and a suggested task.

- [ ] **Step 3: Refactor StudentDashboard**
Update to use the 8:4 split (Productivity Stage : Context Sidebar).
- Left: Greeting, UrgencyRibbon, NextBestAction, PerformancePulse.
- Right: Today's Schedule (Timeline), Announcements, Quick Fees.

- [ ] **Step 4: Commit**
```bash
git add . && git commit -m "feat(student): implement urgency-driven dashboard layout"
```

---

### Task 3: Assignments "Linear" Inbox

**Files:**
- Create: `src/features/assignments/types/index.ts`
- Create: `src/features/assignments/hooks/use-assignments.ts`
- Create: `src/features/assignments/components/assignments-inbox.tsx`
- Create: `src/pages/assignments/assignments-page.tsx`

- [ ] **Step 1: Define Assignment types & Mock data**
Define `AssignmentStatus` (todo, in-progress, submitted) and `Assignment` interfaces.

- [ ] **Step 2: Implement AssignmentsInbox**
Implement the status tabs (Todo, In Progress, Submitted) and the grouped list (Overdue, Today, etc.).
- Use the dense row-based layout with hover actions.

- [ ] **Step 3: Create AssignmentsPage**
Mount `AssignmentsInbox` inside a `PageContainer` with `withMesh={true}`.

- [ ] **Step 4: Commit**
```bash
git add . && git commit -m "feat(student): implement linear-style assignments inbox"
```

---

### Task 4: Performance Growth Dashboard

**Files:**
- Create: `src/features/performance/components/growth-dashboard.tsx`
- Create: `src/features/performance/components/trajectory-chart.tsx`
- Create: `src/pages/performance/performance-page.tsx`

- [ ] **Step 1: Implement TrajectoryChart**
Create the SVG-based trend chart showing Actual vs. Projected GPA.

- [ ] **Step 2: Implement GrowthDashboard**
Include the top metrics (GPA, Rank, Attendance) and the subject breakdown with growth area labels.

- [ ] **Step 3: Create PerformancePage**
Mount `GrowthDashboard` inside a `PageContainer` with `withMesh={true}`.

- [ ] **Step 4: Commit**
```bash
git add . && git commit -m "feat(student): implement growth-oriented performance dashboard"
```

---

### Task 5: Supporting Modules & Final Polish

**Files:**
- Modify: `src/features/dashboard/components/widgets/performance-pulse.tsx`
- Modify: `src/features/attendance/components/attendance-analytics.tsx` (New/Update)

- [ ] **Step 1: Implement PerformancePulse widget**
Add the 5-day attendance streak and grade average metric to the dashboard.

- [ ] **Step 2: Verify Mobile responsiveness**
Ensure all new grids (Urgency Ribbon, Dashboard split) stack correctly and use `scroll-x` for tables.

- [ ] **Step 3: Final Build check**
```bash
npm run build
```

- [ ] **Step 4: Final Commit**
```bash
git add . && git commit -m "feat(student): final polish and mobile optimization for student portal"
```
