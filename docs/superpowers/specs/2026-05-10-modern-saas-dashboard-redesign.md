# Modern SaaS Dashboard Redesign — Hybrid Spec

**Goal:** Transform the current dashboard into a production-grade SaaS command center using a hybrid of Linear's operational structure, Resend's visual polish, and Vercel's density restraint.

**Core Philosophy:** Move from "reflective cards" to "actionable operational zones."

---

## 1. Composition Architecture (Linear-Style)

### 1.1 The Unified 12-Column Grid
The dashboard utilizes a nested grid structure to maximize information density without clutter.

- **Main Stage (Left 8 Columns):** Dedicated to high-signal analytics and operational lists.
- **Utility Sidebar (Right 4 Columns):** Dedicated to quick actions, urgent alerts, and real-time feeds.
- **Responsive Behavior:** 
  - Desktop: 8:4 split.
  - Tablet/Mobile: Utility Sidebar stacks below the Main Stage.

### 1.2 The Metric Ribbon
A horizontal strip at the top (above the split) for critical KPIs.
- **Density:** 4-5 cards in a single row.
- **Content:** Title, Value, Trend (%), and a subtle 48px width sparkline.
- **Visual:** No hero icons. Icons are 14px, Slate-500, placed next to the title.

---

## 2. Visual Polish & Typography (Resend-Style)

### 2.1 Typography Hierarchy
- **Font:** Inter (System Stack).
- **Page Title:** 20px / 600 / Slate-900 / Tracking-tight.
- **Section Headers:** 14px / 600 / Slate-900.
- **Metadata:** 11px / 500 / Slate-500 (used for timestamps, status labels).
- **Primary Metrics:** 24px / 700 / Slate-900 / Tabular-nums.

### 2.2 Visual Accents
- **Surface:** slate-50 background with a 2% opacity Indigo mesh gradient overlay to add depth.
- **Borders:** slate-200/60 for primary containers; slate-200/30 for internal dividers.
- **Shadows:** Minimal. Use shadow-sm on the main container only. Internal elements are flat with subtle borders.

---

## 3. Density & Restraint (Vercel-Style)

### 3.1 Spacing Rhythm
- **Container Padding:** p-4 (16px).
- **Internal Nesting:** p-3 (12px) or p-2 (8px).
- **Vertical Gap:** gap-4 between major zones; gap-1 between metadata items.

### 3.2 Component Constraints
- **Charts:** Maximum height of 240px. Charts must be supportive, not the hero.
- **Icons:** Restricted to 14px-16px. No oversized decorative icons.
- **Interaction:** No delayed animations. Hover states use a subtle bg-slate-50 or border-indigo-500/20.

---

## 4. Operational Zones (Role-Based)

### 4.1 Admin Command Center
- **Main Stage:** 
  - **Attendance Heatmap:** Weekly view across all classes (High-signal: "Who is missing today?").
  - **Revenue Matrix:** Tabular view of fee collection by class.
- **Utility Sidebar:**
  - **Action Vault:** 2x2 Grid (Add Student, Add Teacher, Record Fee, Mark Attendance).
  - **System Alerts:** (e.g., "5 Overdue Payments", "Low attendance in 10B").
  - **Activity Stream:** Compact list of recent registrations and fee updates.

### 4.2 Teacher Pulse
- **Main Stage:**
  - **Today's Schedule:** Dense timeline of assigned classes.
  - **Class Health:** Mini-cards for each assigned class (Attendance %, Recent Grade Avg).
- **Utility Sidebar:**
  - **Quick Mark:** Instant access to mark attendance for the current period.
  - **Student Flags:** Urgent notifications for student behavioral or academic drops.

### 4.3 Parent/Student View
- **Main Stage:**
  - **Attendance Calendar:** Monthly dot-map.
  - **Fee Timeline:** Status of upcoming and past payments.
- **Utility Sidebar:**
  - **Notice Board:** School-wide announcements.
  - **Next Class:** Immediate countdown to the next period/exam.

---

## 5. Content & Copy Strategy

- **NO LOREM IPSUM:** Use realistic data (e.g., "Class 10-A", "$4,200 collected", "Registration: John Doe").
- **Dynamic Greetings:** "Good Morning, [Name]" + Current Date/Time.
- **Actionable Labels:** "Review Absences" instead of "View All"; "Resolve Overdue" instead of "Fees".

---

## 6. Technical Implementation Notes

- **Layout:** Use CSS Grid for the 12-column layout.
- **State:** Leverage useAuthStore for role-aware rendering.
- **Data:** Refactor useDashboardStats to include granular data needed for sparklines and heatmaps.
