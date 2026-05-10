# Design Spec: Activity Stream Component

**Status:** Draft
**Topic:** Implementation of a high-density activity feed for the Admin Dashboard Utility Sidebar.
**Date:** 2026-05-10

## 1. Overview
The `ActivityStream` component is a high-density, monochromatic feed of recent system events. It replaces the existing "Recent Activity" card in the `AdminDashboard` with a more refined, professional SaaS-style component.

## 2. Requirements

### 2.1 Functional Requirements
- Display a list of system activities.
- Support different activity types: `attendance`, `fee`, `student`, and `teacher`.
- Show a message and a relative/formatted timestamp for each activity.

### 2.2 Visual Requirements
- **Container**: `Card` with `p-4`, `shadow-sm`, and subtle borders (`border-slate-200/60`).
- **List Style**: Vertical list with subtle dividers (`border-slate-100/50`).
- **Icons**: 12px monochromatic icons based on activity type.
  - `student` -> `UserPlus`
  - `fee` -> `DollarSign`
  - `attendance` -> `Circle` (as fallback/general)
  - `teacher` -> `User`
- **Typography**:
  - Message: `text-[13px] font-medium text-slate-700 dark:text-slate-200 leading-snug`.
  - Timestamp: `text-[11px] text-slate-400 dark:text-slate-500 font-medium`.
- **Density**: Tight vertical rhythm (`py-2` for list items).

## 3. Architecture

### 3.1 Component Structure
- `ActivityStream`: Main container component.
  - `ActivityItem`: Sub-component for individual feed entries.

### 3.2 Props
```typescript
interface ActivityStreamProps {
  activities: Activity[];
}

interface Activity {
  id: string;
  type: 'attendance' | 'fee' | 'student' | 'teacher';
  message: string;
  timestamp: string;
}
```

## 4. Implementation Plan

### 4.1 Component Implementation
- Create `src/features/dashboard/components/activity-stream.tsx`.
- Use `lucide-react` for icons.
- Use `formatDate` from `src/shared/lib/utils.ts` (or `date-fns` if available).
- Implement the mapping from `type` to icons.

### 4.2 Integration
- Update `src/features/dashboard/components/admin-dashboard.tsx`.
- Remove the inline "Recent Activity" card.
- Place `ActivityStream` below `ActionVault`.
- Pass `stats?.recentActivities` to the component.

## 5. Verification
- Verify the build with `npm run build`.
- Ensure responsiveness on mobile (stacking).
