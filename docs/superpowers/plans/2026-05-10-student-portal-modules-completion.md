# Student Portal Modules Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Attendance, Performance, Fees, and Announcements modules for the Student Portal using a high-density "Operational Stage" aesthetic.

**Architecture:** Feature-based modular structure with high-fidelity mock data and proactive UI signals. Uses Split-pane layouts for announcements and data-driven visualizations for attendance and fees.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand.

---

### Task 1: Announcements Module (Linear Inbox)

**Files:**
- Create: `src/features/announcements/types/index.ts`
- Create: `src/features/announcements/api/mock.ts`
- Create: `src/features/announcements/api/index.ts`
- Create: `src/features/announcements/hooks/use-announcements.ts`
- Create: `src/features/announcements/components/announcements-inbox.tsx`
- Modify: `src/pages/announcements/announcements-page.tsx`

- [ ] **Step 1: Define Announcements Types**
Create `src/features/announcements/types/index.ts`:
```typescript
export type AnnouncementCategory = 'urgent' | 'academic' | 'general';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  sender: string;
  createdAt: string;
  isRead: boolean;
}
```

- [ ] **Step 2: Create Mock API and Hook**
Create `src/features/announcements/api/mock.ts` with 5-6 sample announcements and `src/features/announcements/hooks/use-announcements.ts` using `useQuery`.

- [ ] **Step 3: Implement High-Density Inbox Component**
Create `src/features/announcements/components/announcements-inbox.tsx` with a split-pane layout (List on left, Detail on right). Use `p-4`, `text-[11px]` metadata, and category-colored indicators.

- [ ] **Step 4: Update Announcements Page**
Modify `src/pages/announcements/announcements-page.tsx` to use the new `AnnouncementsInbox` component within a `PageContainer`.

- [ ] **Step 5: Commit**
```bash
git add src/features/announcements src/pages/announcements/announcements-page.tsx
git commit -m "feat(announcements): implement high-density linear inbox"
```

---

### Task 2: Attendance Module (Heatmap & Insights)

**Files:**
- Create: `src/features/attendance/components/attendance-heatmap.tsx`
- Create: `src/features/attendance/components/attendance-insights.tsx`
- Modify: `src/features/attendance/api/mock.ts`
- Modify: `src/pages/attendance/attendance-list-page.tsx`

- [ ] **Step 1: Update Mock Data for Monthly View**
Modify `src/features/attendance/api/mock.ts` to provide daily attendance data for the last 30 days and subject-level percentages.

- [ ] **Step 2: Implement Monthly Heatmap**
Create `src/features/attendance/components/attendance-heatmap.tsx` using a 7-column CSS grid for the month. Color dots based on intensity/status (emerald-600 for present, rose-400 for absent).

- [ ] **Step 3: Implement Subject Breakdown Insights**
Create `src/features/attendance/components/attendance-insights.tsx` with horizontal progress bars and "At Risk" labels (Rose-500) for subjects < 75%.

- [ ] **Step 4: Redesign Attendance Page**
Modify `src/pages/attendance/attendance-list-page.tsx` to show the Heatmap and Insights at the top, followed by the detailed list.

- [ ] **Step 5: Commit**
```bash
git add src/features/attendance src/pages/attendance/attendance-list-page.tsx
git commit -m "feat(attendance): add monthly heatmap and subject insights"
```

---

### Task 3: Fees Module (Ledger & Progress)

**Files:**
- Create: `src/features/fees/components/fee-progress.tsx`
- Modify: `src/features/fees/components/fee-list.tsx`
- Modify: `src/pages/fees/fee-list-page.tsx`

- [ ] **Step 1: Implement Fee Progress Widget**
Create `src/features/fees/components/fee-progress.tsx` featuring a "Paid vs Total" circular progress bar and a "Pay Now" primary button.

- [ ] **Step 2: Update Fee List for High Density**
Modify `src/features/fees/components/fee-list.tsx` to use `DataTable` with optimized spacing (`p-4`) and refined status badges (Rose for overdue, Amber for pending).

- [ ] **Step 3: Update Fees Page Layout**
Modify `src/pages/fees/fee-list-page.tsx` to use a `DashboardGrid` (8:4 split) with the Ledger on the left and the Progress/Balance card on the right.

- [ ] **Step 4: Commit**
```bash
git add src/features/fees src/pages/fees/fee-list-page.tsx
git commit -m "feat(fees): implement itemized ledger and payment progress"
```

---

### Task 4: Performance Module (Dynamic Hardening)

**Files:**
- Modify: `src/features/performance/components/growth-dashboard.tsx`

- [ ] **Step 1: Connect Growth Dashboard to Real/Mock Data**
Modify `src/features/performance/components/growth-dashboard.tsx` to calculate "Subject Performance" bars from the actual `MOCK_SUBJECTS` and `MOCK_TRAJECTORY` data. Ensure labels match "Strongest Subject" and "Growth Area" logic.

- [ ] **Step 2: Commit**
```bash
git add src/features/performance/components/growth-dashboard.tsx
git commit -m "feat(performance): harden growth dashboard with dynamic insights"
```

---

### Task 5: Dashboard Integration (Urgency Engine)

**Files:**
- Modify: `src/features/dashboard/components/widgets/urgency-ribbon.tsx`
- Create: `src/features/dashboard/hooks/use-urgency-signals.ts`

- [ ] **Step 1: Create Urgency Signals Hook**
Create `src/features/dashboard/hooks/use-urgency-signals.ts` that queries Announcements (unread urgent), Attendance (at-risk), and Fees (overdue) and returns a prioritized list of alerts.

- [ ] **Step 2: Update Urgency Ribbon UI**
Modify `src/features/dashboard/components/widgets/urgency-ribbon.tsx` to render these dynamic signals with high-contrast rose/amber backgrounds.

- [ ] **Step 3: Commit**
```bash
git add src/features/dashboard
git commit -m "feat(dashboard): integrate urgency engine with cross-module signals"
```
