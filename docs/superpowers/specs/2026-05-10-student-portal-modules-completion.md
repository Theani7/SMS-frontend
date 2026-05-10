# Specification: Student Portal Modules Completion

**Date:** 2026-05-10
**Status:** Approved
**Role Focus:** Student
**Design Language:** Modern SaaS / "Operational Stage"

## 1. Vision & Purpose
This specification covers the completion of the Attendance, Performance, Fees, and Announcements modules for the Student Portal. These modules are being transformed from passive lists into proactive "Operational Stages" that feed into the student's daily productivity loop.

## 2. Module Specifications

### 2.1 Announcements (Categorized Inbox)
- **UI Pattern:** Split-pane "Linear" style inbox.
- **Categorization:** 
    - **Urgent:** Rose-colored indicators, pinned to top.
    - **Academic:** Indigo-colored indicators.
    - **General:** Slate-colored indicators.
- **Features:** 
    - Read/Unread status tracking.
    - Temporal grouping (Today, Yesterday, Last Week).
    - Detailed view side-panel for zero-navigation reading.
- **Integration:** Unread urgent announcements trigger signals to the Dashboard Urgency Ribbon.

### 2.2 Attendance (Insight-First)
- **UI Pattern:** Monthly Heatmap + Subject Breakdown.
- **Metrics:** 
    - Overall Presence % (with status labels: Excellent, Good, At Risk).
    - Monthly Presence Heatmap (Intensity-based green dots).
- **Subject Analysis:** 
    - Horizontal progress bars per subject.
    - "At Risk" highlighting for subjects below the 75% threshold.
- **Integration:** "At Risk" attendance triggers critical alerts in the Dashboard Urgency Ribbon.

### 2.3 Fees (Financial Ledger)
- **UI Pattern:** Dual-pane Ledger + Financial Progress.
- **Components:**
    - **Balance Card:** High-contrast current outstanding amount with a primary "Pay Now" action.
    - **Progress Circle:** Visual representation of "Paid vs. Total" for the current term.
    - **Itemized Table:** Detailed breakdown of charges (Tuition, Lab, Library) with status badges (Paid, Pending, Overdue).
- **Integration:** Overdue fees trigger alerts in the Dashboard Urgency Ribbon.

### 2.4 Performance Growth (Hardening)
- **Enhancement:** Transition the existing `GrowthDashboard` from static mocks to dynamic insights.
- **Logic:** 
    - "Subject Performance" bars should reflect real data from the Assignments and Attendance modules.
    - "Personal Projection" should calculate end-of-term GPA based on current trajectory.

## 3. Technical Standards

### 3.1 Data Management
- **Mock Implementation:** High-fidelity `mock.ts` for all features to support immediate demo capability.
- **Zustand Stores:** Lightweight stores for cross-module filtering and UI state (e.g., selected announcement).
- **React Query:** Global error handling via `notification-store`.

### 3.2 UI/UX
- **Density:** p-4/p-6 containers, 12px metadata, `tracking-tight` headers.
- **Colors:** 
    - Primary: Indigo-600 (#4f46e5)
    - Success: Emerald-500 (#10b981)
    - Warning: Amber-500 (#f59e0b)
    - Critical: Rose-500 (#f43f5e)
- **Accessibility:** Mandatory `htmlFor` linkage, `aria-sort` for tables, and decorative icon hiding.

## 4. Implementation Priorities
1. **Scaffolding:** Create missing features/announcements directory and files.
2. **API Layer:** Build comprehensive mock data for all four modules.
3. **Core Components:** Implement the primary UI stages (Announcements Inbox, Attendance Heatmap, Fee Ledger).
4. **Integration:** Wire up the "Urgency Engine" to the Dashboard.
