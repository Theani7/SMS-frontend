# Specification: Student Portal Redesign

**Date:** 2026-05-10
**Status:** Draft
**Role Focus:** Student
**Design Language:** Modern SaaS / "Productivity Stage" (Linear/Notion hybrid)

## 1. Vision & Purpose
The Student Portal is being transformed from a passive administrative view into a personal productivity workspace. The goal is to provide students with a "daily loop" experience that prioritizes urgency, momentum, and growth.

## 2. Core Modules & Information Architecture

### 2.1 Dashboard (The Hub)
The dashboard provides immediate answers to: "What now?", "What's next?", and "How am I doing?".
- **Above-the-Fold:** Personal greeting + status summary (e.g., "Good morning, Alex. You have 2 assignments due today.").
- **Urgency Ribbon:** High-contrast 2-column grid for "Critical Deadlines" (<3h or Due Today).
- **Next Best Action:** A focused recommendation engine widget based on upcoming deadlines and timetable gaps.
- **Performance Pulse:** Mini-visualizations for Attendance (5-day streak) and Grade Average (with context).
- **Contextual Sidebar:** Vertical timeline of "Today's Schedule" and a high-visibility "Quick Fees" card.

### 2.2 Assignments Inbox (Task Management)
A "Linear-style" inbox that treats homework as a productivity queue.
- **Primary Org:** Lifecycle status tabs (Todo, In Progress, Submitted).
- **Temporal Grouping:** Overdue, Today, Tomorrow, Next Week.
- **Metadata:** Subject tags, personal progress bars, and "Social Proof" indicators (e.g., "12 students submitted").
- **Filtering:** Global subject-based filter layer.

### 2.3 Performance Growth (Analytics)
A forward-looking growth dashboard rather than a historical transcript.
- **Academic Trajectory:** A trend chart showing "Actual vs. Projected" GPA.
- **Subject Breakdown:** Color-coded performance bars (Emerald/Indigo/Amber) with explicit "Strongest Subject" and "Growth Area" labels.
- **Personal Coach:** A high-contrast "Projection Card" predicting the end-of-term GPA and setting "Focus Goals."

### 2.4 Timetable (The Rhythm)
A full-page calendar/list view of the student's week.
- **Views:** Day/Week toggles.
- **Detail:** Room numbers, teachers, and "Class Materials" links.

### 2.5 Fees & Payments
A clean, transactional module.
- **Layout:** "Current Balance" header + "Payment History" table.
- **Action:** Primary "Pay Now" button integrated with the global toast system for success/failure feedback.

## 3. Design Standards & UX
- **Typography:** Inter (Standardized), `tracking-tight` for headers.
- **Density:** Vercel-style (12px metadata, p-4/p-6 containers, minimized whitespace).
- **Visuals:** `border-slate-200/60` (light), `bg-mesh` background (where appropriate), subtle Indigo accents (#6366f1).
- **Transitions:** 150ms ease-out for all interactions.
- **Mobile:** Mobile-first vertical stacking, sticky headers for critical context (Schedule/Urgency).

## 4. Navigation Structure (Role: Student)
- **Dashboard** (Home Icon)
- **Academics**
    - Timetable
    - Assignments (Linear Inbox)
- **Performance** (Growth Dashboard)
- **Finances** (Fees)
- **Community** (Announcements)

## 5. Technical Implementation Notes
- **State:** Optimized atomic Zustand selectors for student profile and preferences.
- **Data:** React Query with global `onError` notifications (Task-First approach means failures must be visible).
- **Components:** Reuse `MetricCard`, `DataTable` (optimized), and `PageContainer` (withMesh).
- **Performance:** Route-level code splitting for all Student-specific pages.

## 6. Success Criteria
- [ ] Dashboard answers "What do I do now?" in < 2 seconds.
- [ ] Assignments can be filtered by subject in 1 click.
- [ ] Mobile view maintains the "Urgency Ribbon" at the top.
- [ ] Performance trajectory is visually distinct from a simple grade list.
