# Design Spec - React Performance Optimizations

This document outlines the performance optimizations for the School Management System (SMS) frontend, focusing on reducing unnecessary re-renders through memoization and atomic state selection.

## 1. Column Memoization

### Problem
Components using `DataTable` currently call column factory functions directly in the render body. This creates a new columns array on every render, which can cause the `DataTable` (and the underlying TanStack Table) to re-calculate state unnecessarily.

### Solution
Wrap column factory calls in `useMemo` with appropriate dependencies (typically the `setDeleteId` setter).

### Affected Components
- `src/features/students/components/student-list.tsx`
- `src/features/teachers/components/teacher-list.tsx`
- `src/features/classes/components/class-list.tsx`
- `src/features/fees/components/fee-list.tsx`

## 2. Atomic Zustand Selectors

### Problem
Several components destructure state from Zustand stores. This causes the component to re-render whenever *any* part of that store changes, even if the consumed values haven't changed.

### Solution
Switch to atomic selectors for all store usage.

### Affected Components
- `src/features/dashboard/components/admin-dashboard.tsx`
- `src/shared/components/layout/header.tsx`
- `src/shared/components/layout/sidebar.tsx`

## 3. Memoized Computations

### Problem
Expensive or repetitive calculations are performed directly in the render body.

### Solution
Wrap these calculations in `useMemo`.

### Specific Optimizations
- **AdminDashboard**: Memoize `formattedDate`.
- **Sidebar**: Memoize the filtering and grouping of navigation items based on the user's role.

## 4. Verification Plan

- **Build Check**: Run `npm run build` to ensure TypeScript and Vite build pass.
- **Manual Verification**: Briefly verify that the affected components still function correctly (e.g., sidebar filters correctly, tables show data and delete works).
