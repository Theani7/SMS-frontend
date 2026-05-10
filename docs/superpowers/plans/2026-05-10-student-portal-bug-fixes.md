# Student Portal Bug Fixes & Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all identified UI bugs, implement the missing Timetable module, and harden cross-module integration.

**Architecture:** Finalizing modular features, implementing missing API hooks, and improving runtime safety with optional chaining.

**Tech Stack:** React 18, Lucide React, React Query, Zustand.

---

### Task 1: Timetable Module Implementation

**Files:**
- Create: `src/features/timetable/types/index.ts`
- Create: `src/features/timetable/api/mock.ts`
- Create: `src/features/timetable/hooks/use-timetable.ts`
- Create: `src/features/timetable/components/timetable-view.tsx`
- Modify: `src/pages/timetable/timetable-page.tsx`

- [ ] **Step 1: Define Timetable Types**
Create `src/features/timetable/types/index.ts`:
```typescript
export interface TimetableSlot {
  id: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  room: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
}
```

- [ ] **Step 2: Create Mock API and Hook**
Create `src/features/timetable/api/mock.ts` and `src/features/timetable/hooks/use-timetable.ts`. Provide a full week of sample slots.

- [ ] **Step 3: Implement High-Density Timetable View**
Create `src/features/timetable/components/timetable-view.tsx` using a vertical timeline for the current day and a toggle for a weekly grid.

- [ ] **Step 4: Update Timetable Page**
Modify `src/pages/timetable/timetable-page.tsx` to use the new `TimetableView` component.

---

### Task 2: UI Interaction Hardening (Dead Buttons)

**Files:**
- Modify: `src/features/announcements/api/mock.ts`
- Modify: `src/features/announcements/hooks/use-announcements.ts`
- Modify: `src/features/announcements/components/announcements-inbox.tsx`
- Modify: `src/features/assignments/components/assignments-inbox.tsx`
- Modify: `src/features/fees/components/fee-progress.tsx`

- [ ] **Step 1: Wire up "Mark Unread" in Announcements**
Implement `markAsUnread` in the API and hook. Update the button in `AnnouncementsInbox` to call the mutation.

- [ ] **Step 2: Implement Subject Filtering in Assignments**
Add a `subject` state to `AssignmentsInbox`. Wire up the "All Subjects" button to a `DropdownMenu` to filter the list.

- [ ] **Step 3: Wire up "Pay Now" in Fees**
Add a `payFee` mutation to the fees API. Update the "Pay Now" button in `FeeProgress` to show a mock success toast via `useNotificationStore`.

---

### Task 3: Architecture & Safety Cleanup

**Files:**
- Modify: `src/features/dashboard/components/widgets/urgency-ribbon.tsx`
- Modify: `src/features/dashboard/hooks/use-urgency-signals.ts`
- Modify: `src/features/assignments/hooks/use-assignments.ts`

- [ ] **Step 1: Move MOCK_URGENCY to Hook**
Update `useAssignments` to return "critical deadlines" (overdue or < 3h). Update `UrgencyRibbon` to use this data instead of hardcoded `MOCK_URGENCY`.

- [ ] **Step 2: Add Runtime Safety to Urgency Engine**
Modify `src/features/dashboard/hooks/use-urgency-signals.ts` to use optional chaining for all deeply nested data access (e.g., `attendance?.subjectBreakdown?.filter`).

- [ ] **Step 3: Verify All Fixes with Build**
Run `npm run build` to ensure no new errors were introduced.
