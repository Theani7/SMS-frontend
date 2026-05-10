---
name: student-portal-cohesion-design
description: Consolidated design spec for unifying the Student Portal UX
type: project
---

# Student Portal Cohesion Design Specification

**Date:** 2026-05-11
**Status:** Approved for Implementation
**Scope:** Student Portal navigation, layout, workflow continuity, mobile UX, and design unification
**Design Philosophy:** The Student Portal is a **work surface**, not a database view. Every module answers: *what matters now, what needs attention next, what is at risk.*

---

## 1. Design Philosophy

The Student Portal serves one purpose: **help students track obligations and execute work effectively.** It is a personal academic workspace, not a reporting dashboard.

### Student Mindset Priority

1. What do I need to do **right now**?
2. What is **due soon**?
3. What should I **prepare for next**?
4. How am I **progressing over time**?
5. What **changed recently**?

### Core Principles

- **Context over data** — show meaning, not just numbers. Every metric links to a next action.
- **Actionable information** — every data point suggests what to do next.
- **Calm productivity** — no unnecessary alerts, no visual noise, no decoration.
- **Personal voice** — "Your dashboard," "Your grades," "Your schedule." Never system-first language.
- **Cognitive load reduction** — student should feel oriented, not lost in a menu of pages.

### Density Model

Three density tiers, enforced per page (no mixing within a single viewport):

| Tier | Use for | Card padding | Example |
|------|---------|--------------|---------|
| **Compact** | Action/decision lists | 12px | Assignments inbox, attendance log, fee history |
| **Standard** | Mixed content (most pages) | 20px | Announcements list, performance overview |
| **Breathing** | Immersive focus | 32px+ | Performance trajectory chart, announcement detail |

### Action Hierarchy

Every page follows this priority order, enforced by `StudentShell`:

1. **Urgency signal** — what's due, overdue, at risk (always first, always visible)
2. **Primary action** — the one thing the student came to do (submit, check in, view)
3. **Secondary information** — supporting context (metrics, trends, history)
4. **Tertiary navigation** — related modules, deeper links

---

## 2. Current State Critique

The following issues make modules feel disconnected:

| Problem | Where |
|---------|-------|
| Mixed page wrappers — `PageContainer` vs `DashboardGrid` vs raw | Assignments, Fees, Performance, Announcements |
| No student shell — each page rebuilds its own header/section structure | All student pages |
| "Management" section label renders empty for students | Sidebar |
| Mixed loading states — skeleton pulse vs spinner vs center spinner | Announcements uses oversized spinner |
| Inconsistent empty states — `EmptyState` vs `Card` vs inline | Across modules |
| Dashboard widgets are static mocks, not reactive | TimelineSchedule, QuickFees |
| No workflow breadcrumbs | All pages |
| No mobile bottom nav | Mobile |
| Modules feel isolated — no contextual previews | All module pages |
| Inconsistent density rhythm across modules | Across modules |
| Weak action hierarchy — some pages emphasize metrics, others lists | Across modules |
| Decorative "insights" instead of operationally meaningful signals | Widgets |
| Portal feels system-centric, not student-centric | Header, sidebar branding |

---

## 3. Navigation System

### 3.1 Sidebar Structure

The sidebar is obligation-first, visually flat (no nested accordion or expand/collapse). Section labels are **removed** — they add cognitive overhead for a student who navigates in 1-2 seconds.

```
┌──────────────────────────────┐
│ [EduCore logo + student name] │
├──────────────────────────────┤
│ ● Dashboard                  │ ← Active: filled indigo dot + bg tint
│ ○ Assignments               │
│ ○ Timetable                 │
│ ○ Performance               │
│ ○ Attendance               │
│ ○ Fees                       │
│ ○ Announcements             │
├──────────────────────────────┤
│ [Collapse toggle]            │
└──────────────────────────────┘
```

**Nav order (obligation-first):**
1. Dashboard (Focus)
2. Assignments (Work)
3. Timetable (Work)
4. Performance (Progress)
5. Attendance (Progress)
6. Fees (Account)
7. Announcements (Account)

**Active state:** Filled indigo dot (left) + subtle bg tint. Not bold text — that reads as admin emphasis.

**Hover state:** Gentle bg lift. No text change.

**Collapsed state:** Icon + dot only (fits in 56px sidebar).

**Student identity:** Sidebar shows student avatar + name below the logo area. Admin/teacher sidebar does not show this.

### 3.2 Bottom Tab Bar (Mobile)

5 tabs always visible at bottom of screen (fixed position, above keyboard safe area):

```
┌─────────────────────────────────────────┐
│         [Page content]                  │
│                                         │
├─────────────────────────────────────────┤
│ 🏠    📋    📅    📊    •••            │
│ Home  Assign Timetable Performance More │
└─────────────────────────────────────────┘
```

- Home = Dashboard (always first)
- 4 primary nav items get direct tabs
- `•••` opens a slide-up sheet with Fees + Announcements
- Active tab: filled icon + indigo underline
- Inactive: outline icon + muted label
- Uses `env(safe-area-inset-bottom)` for notched devices
- On smallest screens: icon only + dot

### 3.3 Workflow Breadcrumb

Appears below the page title on every module page (not on Dashboard):

```
Dashboard  ›  Assignments  ›  Physics Problem Set #3
```

- Each crumb is a clickable link back to that module's root
- Current page (rightmost) is not a link, shown in medium weight
- Separator: `›` in muted color
- **Not a URL path breadcrumb** — this is a workflow trail, not a filesystem path

### 3.4 Command Palette (Quick-Switch)

`Cmd/Ctrl + K` opens a command palette with fuzzy search:

```
┌─────────────────────────────┐
│ 🔍 Search modules, tasks...  │
├─────────────────────────────┤
│ 📋 Assignments              │
│ 📅 Timetable — Today        │
│ 📊 Performance — Week 12   │
│ ⚡ Submit Physics HW #3    │ ← Direct action shortcuts
│ 🏠 Back to Dashboard        │
└─────────────────────────────┘
```

---

## 4. Shared Student Components

### 4.1 StudentShell

The standard layout wrapper for every student page. Provides consistent structure without per-page duplication.

```tsx
<StudentShell
  title="Assignments"
  urgencyCount={criticalDeadlines.length}
  breadcrumbs={[
    { label: "Dashboard", href: "/" },
    { label: "Assignments" },
  ]}
  actionZone={{
    label: "Open Assignment",
    onClick: handleOpen,
    mobile: true,        // Only renders on mobile
    actionHeavy: true,  // Also renders on desktop when page is action-heavy
  }}
>
  {children}
</StudentShell>
```

**Provides:**
- Page context header: title + urgency count badge (if > 0)
- Workflow breadcrumb trail
- Consistent padding rhythm (p-6 desktop, p-4 mobile)
- Bottom action zone (conditional: mobile always, desktop when `actionHeavy: true`)

**Replaces:** All direct `PageContainer` usage in student pages.

### 4.2 StudentCard

The standard card for student context:

```tsx
<StudentCard
  urgency="overdue" | "warning" | "calm"
  density="compact" | "standard"
  onClick={navigate}
  action={<Button size="sm">Open</Button>}
>
  {content}
</StudentCard>
```

| Urgency | Border | Badge |
|---------|--------|-------|
| `overdue` | rose-200, rose glow | "Overdue" badge in rose |
| `warning` | amber-200 | "Due today" badge in amber |
| `calm` | slate-200/60 | No badge |

**Density variants:**
- `compact`: used in lists (assignments, attendance log) — tighter padding, smaller type
- `standard`: used in mixed content (announcements preview) — standard card padding

### 4.3 UrgencyStrip

Shared component surfacing across every module page as a persistent top strip:

```tsx
<UrgencyStrip
  items={[
    { label: "3 assignments due today", urgency: "high", href: "/assignments" },
    { label: "Physics class at 10:00am", urgency: "info", href: "/timetable" },
  ]}
/>
```

**Behavior:**
- Renders above the page title (inside `StudentShell`)
- Ordered by urgency
- Collapsible — student can dismiss, preference stored in localStorage
- If no urgent items exist, renders nothing (no empty state)
- Max 3 items shown, rest collapsed into "+N more"

### 4.4 SectionHeader

Shared section label used inside modules:

```tsx
<SectionHeader
  label="Upcoming"
  count={5}
  action={<Button variant="ghost" size="sm">View all</Button>}
/>
```

- Label: 11px uppercase bold, muted color
- Optional count badge (right-aligned)
- Optional action link/button (right-aligned)
- Consistent 24px vertical spacing before/after

### 4.5 TimelineWidget

Shared widget for schedule and temporal lists:

```tsx
<TimelineWidget
  items={slots}
  nowLabel="Now"
  upcomingLabel="Next"
  showConnector={true}
/>
```

- Timeline dot with glowing dot for "now" item
- Vertical connector line between items
- "View Full [Module] →" link at bottom

### 4.6 MetricCard

Unified stat card for quantitative data:

```
┌─ LABEL ──────────────────────────┐
│  VALUE           CHANGE INDICATOR │
│  Optional sub-description          │
└───────────────────────────────────┘
```

- Label: 10px uppercase bold, muted
- Value: 24-32px bold, tight tracking
- Change: emerald (up) / rose (down) / slate (neutral)
- Sub-description: 11px medium, muted

### 4.7 StatusBadge

Unified status indicators across all modules:

| Status | Badge color | Usage |
|--------|-----------|-------|
| `overdue` | rose bg, rose text | Assignments past due |
| `due-soon` | amber bg, amber text | Due within 24h |
| `in-progress` | indigo bg, indigo text | Work started |
| `submitted` | emerald bg, emerald text | Handed in |
| `complete` | slate bg, slate text | Archived/done |

### 4.8 Shared States

**Loading (all modules):** Skeleton pulse matching the page density tier. No full-page spinner.

- Compact pages: 5-6 skeleton rows
- Standard pages: skeleton card grid
- Breathing pages: skeleton chart area

**Empty (all modules):** Contextual message — never generic.

| Module | Empty message |
|--------|--------------|
| Assignments | "No assignments yet — enjoy the calm" |
| Timetable | "No classes today — use the free time wisely" |
| Fees | "All caught up — no outstanding fees" |
| Attendance | "No attendance records yet" |
| Announcements | "You're all caught up — no new announcements" |
| Performance | "No performance data available yet" |

**Error (all modules):**

```tsx
<ErrorCard
  title="Couldn't load your assignments"
  description="Check your connection and try again."
  onRetry={refetch}
/>
```

- Uses existing card pattern
- Retry button present
- No dismiss option — student must retry

---

## 5. Workflow Continuity

### 5.1 Integration Model

**Principle:** No large centralized student state. Use shared derived hooks, lightweight contextual embedding, and workflow continuity through composition.

- Dashboard remains the aggregation point (already partially built)
- Individual modules expose their data via hooks (already exists)
- Cross-module context is achieved through shared derived hooks

### 5.2 Cross-Module Preview Strips

Each module page embeds a one-line strip from the most related module:

| Module Page | Preview Strip |
|------------|-------------|
| Assignments | "Next class: Physics at 10:00am, Room 402" |
| Performance | "3 graded since you last checked" |
| Attendance | "Tomorrow: 4 classes scheduled" |
| Fees | "Fee payment reminder from administration" |

**Implementation:** Shared hook `useModulePreview(targetModule)` — returns the single most relevant item from that module. Renders as a one-line strip above module content inside `StudentShell`.

### 5.3 Dashboard Integration

Dashboard is the aggregation point. Existing widgets are refactored to use real hooks instead of static mocks:

| Widget | Hook to use |
|--------|-----------|
| TimelineSchedule | `useTodaySlots()` |
| QuickFees | `useOutstandingBalance()` |
| AnnouncementsList | `useRecentAnnouncements(count: 3)` |
| PerformancePulse | Already uses hooks |

### 5.4 Action Chaining

After key actions, a micro-card surfaces the next step. Implemented as a lightweight spotlight component (not a full notification system):

| Action | Next step shown |
|--------|---------------|
| Submit assignment | "Great work! You'll see feedback here when graded." |
| Mark attendance | "You're checked in. Next: Physics at 10am." |
| Pay fee | "Receipt saved. Updated balance: $340." |

---

## 6. Mobile UX Strategy

### 6.1 Responsive Density Shifts

| Desktop | Mobile |
|---------|--------|
| 8-col main / 4-col sidebar (12-col grid) | Full-width stacked |
| Cards: 24px padding | Cards: 16px padding |
| Tables: horizontal scroll | Condensed columns, row expansion |
| Charts: full trajectory | Key metric + "tap for details" |

### 6.2 Touch-Friendly Targets

- All interactive elements: minimum 40px touch target
- Action buttons: full-width on compact modules
- List items: entire row is tappable
- **No hover-reveal actions on mobile** — all actions visible at rest

### 6.3 Timeline Compression (Timetable)

On mobile Timetable daily view:

```
Desktop: Full-height vertical timeline with large cards
Mobile:  Horizontal day pills (Mon–Fri) + compact horizontal scroll of slots below
```

### 6.4 Sticky Actions (Mobile)

On action-heavy pages:

```
┌─────────────────────────────────────────┐
│ Page content (scrollable)               │
├─────────────────────────────────────────┤
│ [Sticky bottom bar — 56px height]       │
│  ● Mark Selected Done    (1 selected)  │
└─────────────────────────────────────────┘
```

### 6.5 Swipe Gestures (Optional Enhancement)

- Swipe left on assignment → mark complete
- Swipe left on announcement → mark read
- Swipe between days in Timetable

---

## 7. Design Language

### 7.1 Typography Scale

| Usage | Size | Weight | Line | Tailwind |
|-------|------|--------|------|----------|
| Page title | 20px | semibold | tight | `text-xl font-semibold tracking-tight` |
| Section label | 11px | bold | normal | `text-[11px] font-bold uppercase tracking-wider` |
| Card heading | 14px | semibold | tight | `text-[14px] font-semibold tracking-tight` |
| Body | 13px | regular | relaxed | `text-[13px] font-normal leading-relaxed` |
| Caption | 11px | medium | normal | `text-[11px] font-medium` |
| Micro/badge | 10px | bold | none | `text-[10px] font-bold uppercase tracking-widest` |

### 7.2 Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Badge padding, inline icon gaps |
| `sm` | 8px | List item gaps, related element gaps |
| `md` | 16px | Card padding (mobile), section gaps |
| `lg` | 24px | Card padding (desktop), major sections |
| `xl` | 32px | Page padding |

### 7.3 Color System

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg-student` | slate-50 | slate-950 | Student page background |
| `surface-student` | white | slate-900 | Cards, panels |
| `urgency-high` | rose-500 | rose-400 | Overdue, critical |
| `urgency-mid` | amber-500 | amber-400 | Due soon, at risk |
| `urgency-calm` | emerald-500 | emerald-400 | On track, completed |
| `accent-student` | indigo-600 | indigo-400 | Active states, CTAs |

### 7.4 Component Tokens

- Border radius: `rounded-xl` (12px) cards, `rounded-lg` (8px) buttons, `rounded-full` pills
- Shadows: `shadow-soft` (card elevation), no harsh box-shadows
- Borders: `border border-slate-200/60 dark:border-slate-800/60`
- Transitions: `duration-200` standard, `duration-300` hover lifts

---

## 8. Consistency Audit Checklist

Every student module must pass before considered complete:

- [ ] Uses `StudentShell` as the page wrapper
- [ ] UrgencyStrip renders when urgency signals exist
- [ ] Section headers use `SectionHeader` component
- [ ] Density tier is fixed for the whole page
- [ ] Action hierarchy follows: urgency → primary → secondary → tertiary
- [ ] Loading state uses skeleton pulse (not spinner or center loader)
- [ ] Empty state message is contextual (not generic)
- [ ] Error state uses `ErrorCard` with retry
- [ ] All touch targets ≥ 40px on mobile
- [ ] Workflow breadcrumb appears on module pages
- [ ] No hover-reveal-only actions on mobile
- [ ] Typography scale matches shared scale
- [ ] Cards use `StudentCard` or consistent tokens
- [ ] Bottom tab bar reflects current active route on mobile

---

## 9. Files to Create / Modify

### New files

```
src/shared/components/student/
├── student-shell.tsx      # Main layout wrapper
├── student-card.tsx        # Standard student card
├── urgency-strip.tsx      # Shared urgency signal strip
├── section-header.tsx     # Shared section label
├── timeline-widget.tsx    # Shared timeline for schedule
├── error-card.tsx         # Shared error state
└── index.ts               # Re-exports

src/shared/components/layout/
└── bottom-nav.tsx         # Mobile tab bar for students

src/features/students/
└── components/
    └── quick-switch-modal.tsx  # Cmd+K command palette
```

### Files to modify

```
src/shared/components/layout/sidebar.tsx         # Student variant, student identity
src/pages/assignments/assignments-page.tsx       # → StudentShell
src/pages/performance/performance-page.tsx        # → StudentShell
src/pages/fees/fee-list-page.tsx                 # → StudentShell
src/pages/announcements/announcements-page.tsx    # → StudentShell
src/features/dashboard/components/student-dashboard.tsx   # Refactor widgets to real hooks
src/features/dashboard/components/widgets/timeline-schedule.tsx  # → useTodaySlots()
src/features/dashboard/components/widgets/quick-fees.tsx       # → useOutstandingBalance()
src/features/dashboard/components/widgets/announcements-list.tsx  # → useRecentAnnouncements()
```

---

## 10. Implementation Phases

### Phase 1: Core Infrastructure
1. Create `src/shared/components/student/` shared components
2. Create `bottom-nav.tsx` for mobile
3. Create `quick-switch-modal.tsx`
4. Update `Sidebar` for student variant and student identity

### Phase 2: Page Migration
5. Migrate all student pages to `StudentShell`
6. Refactor `UrgencyRibbon` → `UrgencyStrip` (shared across all pages)
7. Audit and fix all section headers

### Phase 3: Workflow Continuity
8. Implement `useModulePreview()` hook
9. Add preview strips to each module page
10. Refactor dashboard widgets to use real hooks
11. Implement action chaining micro-cards

### Phase 4: Mobile Optimization
12. Implement bottom tab bar
13. Apply mobile density shifts to all modules
14. Add sticky action bars to action-heavy pages
15. Compress Timetable for mobile

### Phase 5: Polish
16. Audit all loading states → skeleton pulse
17. Audit all empty states → contextual messages
18. Audit all error states → `ErrorCard`
19. Verify all consistency checklist items pass

---

## 11. Constraints

- **Do NOT add major new modules**
- **Do NOT redesign admin UX** — preserve existing admin sidebar and layout
- **No large shared student store** — use shared derived hooks, not Zustand orchestration
- **Avoid overdesign/glassmorphism** — subtle shadows, no frosted glass
- **Avoid dashboard clutter** — one primary focus per section
- **Maintain accessibility** — WCAG AA contrast, keyboard navigation, screen reader support
- **Performance-first** — lazy load pages, skeleton states, no heavy animations on load