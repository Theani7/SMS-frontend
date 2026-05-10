# Parent Portal Design Spec

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cohesive, production-quality Parent Portal with 4 pages: Dashboard, Children, Attendance, Fees.

**Architecture:** Mixed model — dashboard overview across all children + drill-down per child. ParentShell wrapper on all pages. Reuses existing shared components (StatCard, ErrorCard, SectionHeader, UrgencyStrip). Flat sidebar nav (no sections). Bottom tab bar on mobile with 4 tabs.

**Tech Stack:** React 18 + Vite + TypeScript + Tailwind CSS + Radix UI + Lucide React. Feature-based structure under `src/features/`. Zustand for auth store. React Query for data fetching.

---

## Pages

### Dashboard (`/dashboard`)
- UrgencyStrip at top: overdue fee alerts (high urgency), recent absence alerts (info urgency)
- Grid of ChildCard components (all enrolled children)
- Two StatCard widgets: total pending fees (DollarSign icon), children absent today (ClipboardCheck icon)
- Skeleton loading state, empty state: "No children enrolled yet"

### Children (`/children`)
- Grid of ChildCard components, click to navigate to `/children/:id`
- Each card shows: avatar with initials, name, class, status indicators (rose dot for overdue fees, amber dot for recent absence)
- Empty state: "No children linked to your account"

### Child Detail (`/children/:id`)
- Breadcrumb: Home → Children → [Name]
- Two sections: "Attendance Overview" (last 7 days) and "Fee Status" (current outstanding)
- Uses StudentCard for card styling, SectionHeader for section labels

### Attendance (`/attendance`)
- AttendanceList component (existing) filtered to parent's children only
- Table columns: Date, Child, Status, Class
- Filters: child dropdown, date range
- ErrorCard on failure, skeleton loading, empty state: "No attendance records found"

### Fees (`/fees`)
- FeeList component (existing) filtered to parent's children only
- Grouped by child, shows description, amount, due date, status badge
- "Pay" button per row (shows confirmation modal)
- Empty state: "All fee payments are up to date" with checkmark

---

## Components

### ParentShell
- Mirrors StudentShell structure: breadcrumb with Home icon, UrgencyStrip, page header (h1 + urgency count badge), content slot, action zone
- Props: `title: string`, `breadcrumbs?: BreadcrumbItem[]`, `urgencyCount?: number`, `actionZone?: { content: React.ReactNode, mobile?: boolean }`

### ChildCard
- Card-based component using StudentCard pattern (Urgency variant)
- Props: `child: { id, name, className, hasOverdueFees, hasRecentAbsence }`
- Border color: rose for overdue, amber for warning, slate for calm
- Click navigates to `/children/:id`

### UrgencyStrip
- Reused from student portal as-is
- Items: overdue fees (high), recent absences (info)
- localStorage dismissal, max 3 items + "+N more" inline

---

## Navigation

### Sidebar (desktop)
- Flat list, no section labels
- Items in order: Dashboard, Children, Attendance, Fees
- Active item: white bg, indigo text, left-side dot indicator
- Student identity card (avatar + name) below logo for parent role
- Collapsed state: icon-only

### Bottom tab bar (mobile)
- 4 tabs: Dashboard, Children, Attendance, Fees
- Active tab: indigo icon + fill, dot indicator below
- No "More" sheet — all nav fits in 4 tabs
- iOS safe area padding

---

## Data & API

### Mock database changes
- Add `children: string[]` to parent user records in mock database
- Parent "John Smith" (id: 3) linked to student IDs: `['1', '3']`

### New hooks
- `useChildren()` — fetches the logged-in parent's children from mock DB
- `useChildrenAttendance(childId?)` — fetches attendance for specific child or all parent children
- `useChildrenFees(childId?)` — fetches fees for specific child or all parent children

### Existing hooks reused
- `useFees()` — filtered by parent children in parent-feel hooks
- `useAttendance()` — filtered by parent children in parent-attendance hooks

---

## States

### Loading
- Skeleton pulse loading on all pages (matching student portal pattern)
- Not spinners — pulsing placeholder shapes

### Error
- ErrorCard on all pages with retry button
- Rose-tinted card with AlertCircle icon

### Empty
- Dashboard: "No children enrolled yet" (centered, muted text)
- Children: "No children linked to your account"
- Attendance: "No attendance records found for your children"
- Fees: "All fee payments are up to date" with CheckCircle icon

---

## Mobile experience
- Bottom tab bar with 4 tabs
- ParentShell page headers with tighter spacing (mb-4)
- UrgencyStrip visible on relevant pages
- All pages responsive (grid → single column on mobile)