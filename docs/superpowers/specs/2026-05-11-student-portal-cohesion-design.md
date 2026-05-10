---
name: student-portal-cohesion-design
description: Consolidated design spec for unifying the Student Portal UX
type: project
---

# Student Portal Cohesion Design Specification

**Date:** 2026-05-11
**Status:** Approved for Implementation
**Scope:** Student Portal navigation, layout, workflow continuity, mobile UX, and design unification

---

## 1. Overview

The Student Portal currently has individual modules (Assignments, Performance, Timetable, Announcements, Fees, Attendance) that feel like disconnected CRUD pages. This spec defines the unified Student Portal experience — a single integrated productivity workspace that feels fundamentally different from the admin interface.

**Design Principles:**
- Context over data — show meaning, not just numbers
- Actionable information — every data point suggests a next step
- Calm productivity — no unnecessary alerts, no visual noise
- Personal voice — "Your" dashboard, "Your" grades, "Your" schedule

---

## 2. Architecture Decision

**Solution:** Shared `AppLayout` with student-specific sidebar variant.

- **Why:** Avoids duplicating route infrastructure; student pages already exist under existing paths
- **How:** `Sidebar` component receives a `variant` prop (`default` | `student`). Student role triggers student-friendly nav grouping and branding.
- **Route structure unchanged:** Student routes remain at `/assignments`, `/performance`, etc.

---

## 3. Navigation System

### 3.1 Sidebar Structure

The sidebar renders role-appropriate navigation. For `student` role, the nav is restructured to match student mental model:

```
STUDENT PORTAL (replaces "EduCore" branding)

🎯 FOCUS
• My Dashboard

📚 LEARNING
• Timetable
• Assignments
• Grades & Performance

📋 ADMINISTRATION
• Attendance
• Fees

📢 UPDATES
• Announcements
```

**Navigation Categories for Student:**

| Section | Items | Icon |
|---------|-------|------|
| Focus | My Dashboard | LayoutDashboard |
| Learning | Timetable, Assignments, Grades & Performance | Calendar, ClipboardList, TrendingUp |
| Administration | Attendance, Fees | ClipboardCheck, DollarSign |
| Updates | Announcements | Bell |

### 3.2 Active State Behavior

- **Indicator:** 3px left accent bar (indigo) + background highlight `bg-white dark:bg-slate-800` + `font-semibold`
- **Hover:** `hover:bg-slate-100 dark:hover:bg-slate-800/50` with subtle shadow lift
- **Collapsed mode:** Icon-only with tooltip, accent bar visible on active item
- **Dot indicator:** Small indigo dot on right side of active item (when expanded)

### 3.3 Contextual Breadcrumbs

| Page | Breadcrumb Pattern |
|------|-------------------|
| Dashboard | Home |
| Timetable | Home / May 11–15, 2026 (current week) |
| Assignments | Home / Assignments / [Subject] (filter persists) |
| Performance | Home / Performance / Term 2 (auto-selected) |
| Attendance | Home / Attendance / This Term |
| Fees | Home / Finances / May 2026 |
| Announcements | Home / Announcements |

### 3.4 Quick-Switch Pattern

- **Trigger:** Cmd/Ctrl+K (keyboard shortcut)
- **UI:** Modal overlay with search input + recent pages + nav commands
- **Implementation:** New `QuickSwitchModal` component using existing dialog patterns

### 3.5 Mobile Navigation

- **Primary:** Bottom tab bar with 5 tabs — Home, Timetable, Assignments, Grades, Announcements
- **Secondary:** Hamburger → full-screen drawer with complete navigation tree
- **Behavior:** Bottom bar uses `position: fixed`, z-index above content, `safe-area-inset-bottom` padding for notched devices

---

## 4. Shared Student Layout Components

### 4.1 StudentShell Component

New wrapper component for student pages that provides:
- Module-level header (breadcrumb + actions + context)
- Workflow-aware back navigation
- Module-specific quick actions
- Consistent content padding

```tsx
<StudentShell
  breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Assignments' }]}
  actions={<Button variant="outline" size="sm">View Calendar</Button>}
  context="3 assignments due this week"
>
  {children}
</StudentShell>
```

**Replaces:** Direct `PageContainer` usage in student pages.
**Migrates:** AssignmentsPage, PerformancePage, TimetablePage, AnnouncementsPage, FeesPage.

### 4.2 Section Header Pattern

Unified component for section labels across all modules.

**Usage:**
```tsx
<SectionHeader
  title="Pending Work"
  description="Due this week"
  action={<Button variant="ghost" size="sm">View All</Button>}
/>
```

**Styles:**
- Title: `text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500`
- Description: `text-[11px] text-slate-400` (optional, below title)
- Action: Right-aligned, typically "View All" link or button

### 4.3 Productivity Card

Unified card pattern for dashboard widgets and inline content.

**Base styles:**
```tsx
<div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-soft p-5">
```

**Hover state:** `hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow`

**Variants:**
- `elevated`: `shadow-medium` (0 4px 6px rgba)
- `flat`: no shadow, `bg-slate-50/50`
- `accent`: left border 3px indigo

### 4.4 Timeline Widget

For temporal-ordered items (assignments, schedule).

**Structure:**
```
[●] ── Timeline dot with time
    Card content
    Actions
```

**Implementation:**
- Container: `relative space-y-4 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800`
- Dot: `absolute left-0 top-3 w-9 h-9 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center z-10`
- Inner dot: `w-2.5 h-2.5 rounded-full bg-primary`
- Connected cards: Use `ProductivityCard` base with consistent padding

### 4.5 Metric Component

Unified stat card for quantitative data.

**Structure:**
```
┌─ LABEL ──────────────────────────┐
│  VALUE           CHANGE INDICATOR │
│  Optional sub-label              │
└───────────────────────────────────┘
```

**Styles:**
- Label: `text-[10px] font-bold uppercase tracking-wider text-slate-400`
- Value: `text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100`
- Change: `text-[11px] font-bold` — emerald for up, rose for down, slate for neutral
- Sub-label: `text-[11px] text-slate-500`

### 4.6 Status/Tags Component

Unified status indicators with consistent color mapping.

| Status | Color | Background |
|--------|-------|------------|
| Overdue | rose-500 / rose-400 | rose-50 dark:rose-950/30 |
| Due Soon (<24h) | amber-500 | amber-50 dark:amber-950/30 |
| Complete | emerald-500 | emerald-50 dark:emerald-950/30 |
| In Progress | indigo-500 | indigo-50 dark:indigo-950/30 |
| Not Started | slate-400 | slate-50 |

**Badge pattern:** `text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full`

### 4.7 Empty State Component

Unified empty state for all modules.

```tsx
<EmptyState
  icon={Calendar}
  title="No classes scheduled"
  description="Enjoy your free time!"
  action={<Button>Add Class</Button>}
/>
```

**Styles:**
- Icon wrapper: `w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4`
- Icon: `w-6 h-6 text-slate-400`
- Title: `text-sm font-medium text-slate-900 dark:text-slate-100`
- Description: `text-sm text-slate-500 max-w-[200px] mt-1`
- Action: optional, below description

### 4.8 Loading State Pattern

Consistent skeleton animations across all modules.

```tsx
<div className="animate-pulse space-y-4">
  {[...Array(count)].map((_, i) => <SkeletonCard />)}
</div>
```

**SkeletonCard:**
```tsx
<div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
```

No module-specific skeleton variations allowed.

### 4.9 Error State Component

```tsx
<ErrorState
  title="Failed to load assignments"
  description="Check your connection and try again."
  onRetry={() => refetch()}
/>
```

---

## 5. Typography Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| Page Title | 20px (text-xl) | 600 (semibold) | tight | Page headers |
| Section Header | 11px (text-[11px]) | 700 (bold) | normal | Section labels |
| Card Title | 14px (text-[14px]) | 500 (medium) | none | Card headings |
| Body | 14px (text-sm) | 400 (normal) | relaxed | Content text |
| Caption | 12px (text-[12px]) | 500 (medium) | none | Metadata, timestamps |
| Micro | 10px (text-[10px]) | 700 (bold) | none | Tags, badges, labels |

---

## 6. Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| section-gap | 24px (gap-6) | Between major sections |
| card-padding | 20px (p-5) | Inside cards |
| card-gap | 16px (gap-4) | Between cards |
| element-gap | 8px (gap-2) | Between related elements |
| tight-gap | 4px (gap-1) | Between tightly related items |

---

## 7. Border & Shadow System

| Token | Value |
|-------|-------|
| card-border | `border border-slate-200/60 dark:border-slate-800/60` |
| card-shadow | `shadow-soft` (0 1px 2px rgba) |
| elevated-shadow | `shadow-medium` (0 4px 6px rgba) |
| card-radius | `rounded-xl` (12px) |
| button-radius | `rounded-lg` (8px) |
| input-radius | `rounded-md` (6px) |

---

## 8. Workflow Continuity

### 8.1 Dashboard as Context Hub

Student dashboard surfaces contextual workflow links:

**Today Section (primary):**
- Next class with time, room, teacher
- Up to 3 upcoming classes
- "Full Timetable →" action

**Pending Work Section:**
- Top 3 assignments due (with due date context)
- Subject + assignment title + time remaining
- "View Assignments →" action

**Performance Snapshot:**
- Current GPA + change indicator
- This week's average
- "View Grades →" action

**Attendance Health:**
- Percentage + status (On Track / Needs Attention)
- Correlation insight ("Your 98% attendance correlates with top-quartile performance")
- "View Attendance →" action

### 8.2 Timetable → Assignments

When viewing a day's schedule:
- Each slot shows current/next class with "Now" badge
- Subject pill on each slot
- If that subject has assignments due within 7 days, show subtle indicator: `📝 2 due`
- Tap indicator → Assignments page with subject pre-filtered

### 8.3 Assignments → Grades

When viewing an assignment:
- Status "Submitted" shows grade if available: `Grade: A (95%)`
- "View in Grades →" action → Performance page, highlights that subject
- Shows which assessment bucket this falls into (e.g., "Homework • Physics")

### 8.4 Performance → Attendance

Performance page shows:
- Attendance metric card with correlation text
- "98% attendance correlates with your top-quartile standing"
- Link to full attendance view

### 8.5 Announcements as Contextual Triggers

- "Assignment deadline extended" → visible in Assignments with updated date, toast notification
- "Class cancelled" → shows in Timetable with visual indicator (amber badge)
- "Grade posted" → visible in Performance with subject highlighted

### 8.6 Fees as Health Metric

Fees page shows:
- Payment health: "All payments up to date" or "1 payment overdue"
- Next payment due date + amount
- "Manage Payments →" action

---

## 9. Mobile UX Strategy

### 9.1 Layout Patterns

**Stacking:** No side-by-side columns. Single column flow with semantic grouping.

**Touch Targets:** Minimum 44x44px for all interactive elements.

**Collapsible Sections:** Accordion for dense content (e.g., subject list in Performance).

**Sticky Elements:**
- Page title + back button at top
- Primary action at bottom (sticky)
- Tab bar at bottom (if applicable)

### 9.2 Timeline Compression

Timetable mobile:
- Default: current day with horizontal swipe to change days (iOS calendar pattern)
- Week view available as secondary option
- "Today" button to snap back

### 9.3 Mobile Action Placement

| Action Type | Position |
|-------------|----------|
| Primary (submit, save) | Fixed bottom |
| Secondary (cancel, back) | Top bar |
| Contextual (filter, sort) | Inline with content |
| Navigation | Bottom tab bar |

### 9.4 Swipe Gestures

- Swipe left on assignment → mark complete
- Swipe left on announcement → mark read
- Swipe between days in timetable

### 9.5 Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| < 640px (sm) | Single column, bottom nav, stacked cards |
| 640–1024px (md) | 2-column grid where appropriate, expanded nav |
| > 1024px (lg) | Full sidebar, multi-column layouts |

---

## 10. Color Application

### 10.1 Semantic Colors

| Purpose | Light Mode | Dark Mode |
|---------|------------|-----------|
| Primary Action | indigo-600 | indigo-400 |
| Success | emerald-500 | emerald-400 |
| Warning | amber-500 | amber-400 |
| Danger | rose-500 | rose-400 |
| Background | white / slate-50 | slate-950 / slate-900 |
| Surface | white | slate-900 |
| Border | slate-200/60 | slate-800/60 |

### 10.2 Status Color Mapping

| Status | Color | Usage |
|--------|-------|-------|
| Excellent | emerald | GPA > 3.7, attendance > 95% |
| Good | indigo | GPA 3.0-3.7, attendance 85-95% |
| Needs Attention | amber | GPA 2.0-3.0, attendance 75-85% |
| Critical | rose | GPA < 2.0, attendance < 75% |

### 10.3 Subject Colors (Timetable)

Predefined colors for subject differentiation:
- Physics: `bg-blue-100 text-blue-700`
- Math: `bg-purple-100 text-purple-700`
- Chemistry: `bg-green-100 text-green-700`
- English: `bg-amber-100 text-amber-700`
- History: `bg-rose-100 text-rose-700`
- Art: `bg-pink-100 text-pink-700`

---

## 11. Implementation Phases

### Phase 1: Core Infrastructure (Foundation)

1. **Create shared components:**
   - `StudentShell` component
   - `SectionHeader` component
   - `MetricCard` component
   - `TimelineItem` component
   - `EmptyState` component
   - `SkeletonCard` component
   - `ErrorState` component

2. **Update Sidebar for student variant:**
   - Add `variant` prop to Sidebar
   - Implement student-specific nav grouping
   - Student branding (logo/icon + "Student Portal" text)

3. **Create QuickSwitchModal component**

### Phase 2: Page Migration

4. **Migrate student pages to StudentShell:**
   - AssignmentsPage
   - PerformancePage
   - TimetablePage
   - AnnouncementsPage
   - FeesPage

5. **Update PageContainer to support breadcrumbs and actions**

### Phase 3: Workflow Continuity

6. **Implement cross-module links:**
   - Timetable → Assignments indicator
   - Assignments → Performance links
   - Performance → Attendance correlation
   - Dashboard contextual cards

7. **Create workflow-aware state management** (if needed)

### Phase 4: Mobile Optimization

8. **Implement bottom tab bar for student mobile**
9. **Update all layouts for mobile-first responsive**
10. **Add swipe gestures**

### Phase 5: Polish

11. **Unified loading skeletons across all modules**
12. **Consistent empty states**
13. **Error handling consistency**

---

## 12. Files to Create

```
src/shared/components/student/
├── student-shell.tsx
├── section-header.tsx
├── metric-card.tsx
├── timeline-item.tsx
├── empty-state.tsx
├── skeleton-card.tsx
├── error-state.tsx
└── index.ts

src/shared/components/layout/
├── bottom-nav.tsx (mobile student nav)

src/features/students/
├── components/
│   └── quick-switch-modal.tsx
```

---

## 13. Constraints

- **Do NOT add major new modules**
- **Do NOT redesign admin UX**
- **Preserve Modern SaaS aesthetic** — clean, minimal, professional
- **Avoid overdesign/glassmorphism** — subtle shadows, not frosted glass
- **Avoid dashboard clutter** — one primary focus per section
- **Maintain accessibility** — WCAG AA contrast, keyboard navigation, screen reader support
- **Performance-first** — lazy load pages, skeleton states, no heavy animations on load

---

## 14. Success Criteria

The Student Portal is cohesive when:
1. Navigation feels purpose-built for students, not filtered admin nav
2. Every module has consistent card patterns, spacing, and typography
3. Clicking a subject in Performance navigates to filtered Assignments
4. Dashboard shows today's schedule with upcoming assignment indicators
5. Mobile experience uses bottom tab bar with stacked layouts
6. Empty, loading, and error states are visually consistent across all modules
7. The portal feels like a single product, not 6 separate pages