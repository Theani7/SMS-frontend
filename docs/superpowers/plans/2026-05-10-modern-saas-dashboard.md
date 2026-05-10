# Modern SaaS Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Dashboard into a high-density, actionable command center following the "Modern SaaS" hybrid spec.

**Architecture:** 12-column Unified Grid, Functional Operational Zones, Metric Ribbon, Utility Sidebar.

**Tech Stack:** React, Tailwind CSS, Lucide, Inter Font.

---

### Task 1: App Shell & Topbar Refinement

**Files:**
- Modify: src/shared/components/layout/header.tsx
- Modify: src/shared/components/layout/page-container.tsx

- [ ] **Step 1: Refine Header Typography**
Update the Header to use a breadcrumb-style greeting and a refined date display. Remove heavy borders.

- [ ] **Step 2: Update PageContainer**
Remove the forced bottom border and adjust padding for dashboard-specific density.

- [ ] **Step 3: Commit**
```bash
git add src/shared/components/layout/header.tsx src/shared/components/layout/page-container.tsx
git commit -m "style: refine app shell and topbar for dashboard context"
```

### Task 2: Metric Ribbon (Top Level KPIs)

**Files:**
- Create: src/shared/components/data-display/metric-card.tsx
- Modify: src/features/dashboard/components/admin-dashboard.tsx

- [ ] **Step 1: Implement MetricCard**
High-density card with Title, Value, Trend, and Sparkline placeholder. No large icons.

- [ ] **Step 2: Add Metric Ribbon to AdminDashboard**
Replace old StatCards with a single row Metric Ribbon.

- [ ] **Step 3: Commit**
```bash
git add src/shared/components/data-display/metric-card.tsx src/features/dashboard/components/admin-dashboard.tsx
git commit -m "feat: implement high-density Metric Ribbon"
```

### Task 3: Main Stage Layout (Unified Grid)

**Files:**
- Create: src/shared/components/layout/dashboard-grid.tsx
- Modify: src/features/dashboard/components/admin-dashboard.tsx

- [ ] **Step 1: Implement DashboardGrid**
Create the 12-column (8:4) layout component with responsive stacking.

- [ ] **Step 2: Apply Grid to AdminDashboard**
Structure the Main Stage and Sidebar areas.

- [ ] **Step 3: Commit**
```bash
git add src/shared/components/layout/dashboard-grid.tsx src/features/dashboard/components/admin-dashboard.tsx
git commit -m "feat: establish 12-column Unified Grid layout"
```

### Task 4: Attendance Heatmap (Main Stage Item 1)

**Files:**
- Create: src/features/dashboard/components/attendance-pulse.tsx
- Modify: src/features/dashboard/components/admin-dashboard.tsx

- [ ] **Step 1: Implement AttendancePulse**
A compact heatmap showing weekly attendance patterns across classes.

- [ ] **Step 2: Integrate into Main Stage**

- [ ] **Step 3: Commit**
```bash
git add src/features/dashboard/components/attendance-pulse.tsx
git commit -m "feat: add Attendance Pulse heatmap to Main Stage"
```

### Task 5: Revenue Matrix (Main Stage Item 2)

**Files:**
- Create: src/features/dashboard/components/revenue-matrix.tsx
- Modify: src/features/dashboard/components/admin-dashboard.tsx

- [ ] **Step 1: Implement RevenueMatrix**
A dense tabular view of fee collection status.

- [ ] **Step 2: Integrate into Main Stage**

- [ ] **Step 3: Commit**
```bash
git add src/features/dashboard/components/revenue-matrix.tsx
git commit -m "feat: add Revenue Matrix table to Main Stage"
```

### Task 6: Utility Sidebar (Container & Quick Actions)

**Files:**
- Create: src/features/dashboard/components/action-vault.tsx
- Modify: src/features/dashboard/components/admin-dashboard.tsx

- [ ] **Step 1: Implement ActionVault**
A compact 2x2 grid of primary operational tasks.

- [ ] **Step 2: Commit**
```bash
git add src/features/dashboard/components/action-vault.tsx
git commit -m "feat: add Action Vault to Utility Sidebar"
```

### Task 7: Activity Stream (Sidebar Feed)

**Files:**
- Create: src/features/dashboard/components/activity-stream.tsx
- Modify: src/features/dashboard/components/admin-dashboard.tsx

- [ ] **Step 1: Implement ActivityStream**
A high-density, monochromatic event feed with timestamps.

- [ ] **Step 2: Commit**
```bash
git add src/features/dashboard/components/activity-stream.tsx
git commit -m "feat: add Activity Stream to Utility Sidebar"
```

### Task 8: Responsive Refinement

**Files:**
- Modify: src/shared/components/layout/dashboard-grid.tsx
- Modify: src/features/dashboard/components/admin-dashboard.tsx

- [ ] **Step 1: Tune Stacking Behavior**
Ensure Sidebar collapses correctly and spacing remains tight on mobile.

- [ ] **Step 2: Commit**
```bash
git commit -m "style: refine dashboard responsiveness"
```

### Task 9: Motion & Interaction Polish

**Files:**
- Modify: src/index.css
- Modify: src/shared/components/ui/card.tsx

- [ ] **Step 1: Add Subtle Transitions**
Fast, 150ms transitions for hovers. No bouncy motion.

- [ ] **Step 2: Commit**
```bash
git commit -m "style: add subtle motion and interaction polish"
```

### Task 10: Final Density & Spacing Tuning

**Files:**
- Modify: src/index.css
- Modify: src/features/dashboard/components/admin-dashboard.tsx

- [ ] **Step 1: Final Spacing Audit**
Apply the 2% Indigo mesh gradient and verify the Vercel-style restraint.

- [ ] **Step 2: Commit**
```bash
git commit -m "style: final density and spacing tuning"
```