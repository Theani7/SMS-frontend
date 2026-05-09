# School Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scalable, maintainable school management frontend with 7 modules (auth, dashboard, students, teachers, classes, attendance, fees) for 4 roles (admin, teacher, parent, student).

**Architecture:** Feature-based folder structure with shared infrastructure. Mock API layer migrates to real REST API. React Query handles server state, Zustand handles client state.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, Shadcn/ui, React Router v6, React Query, React Hook Form, Zod, Zustand, MSW

---

## Phase 1: Project Setup

### Files to create:
```
school-frontend/
├── .gitignore
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    └── index.css
```

### Tasks:

- [ ] **Task 1.1: Initialize Vite + React + TypeScript project**
  - Create: `package.json`
  - Create: `vite.config.ts`
  - Create: `tsconfig.json`
  - Run: `npm install`

- [ ] **Task 1.2: Configure Tailwind CSS**
  - Create: `tailwind.config.js`
  - Create: `postcss.config.js`
  - Create: `src/index.css` with Tailwind directives

- [ ] **Task 1.3: Set up folder structure**
  - Create: `src/app/` directory and files
  - Create: `src/features/` directory
  - Create: `src/shared/` directory
  - Create: `src/api/` directory

- [ ] **Task 1.4: Create index.html and entry point**
  - Create: `index.html`
  - Create: `src/main.tsx`
  - Create: `src/App.tsx`
  - Create: `.gitignore`

---

## Phase 2: Shared Infrastructure

### Files to create:
```
src/shared/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── forms/
│   │   └── form-field.tsx
│   ├── data-display/
│   │   ├── data-table.tsx
│   │   ├── stat-card.tsx
│   │   └── empty-state.tsx
│   └── layout/
│       ├── sidebar.tsx
│       ├── header.tsx
│       └── page-container.tsx
├── store/
│   ├── auth-store.ts
│   ├── theme-store.ts
│   └── ui-store.ts
├── types/
│   ├── user.ts
│   └── common.ts
├── hooks/
│   ├── use-debounce.ts
│   └── use-local-storage.ts
└── lib/
    ├── utils.ts
    └── constants.ts
```

### Tasks:

- [ ] **Task 2.1: Install shared dependencies**
  - Run: `npm install react-router-dom @tanstack/react-query zustand react-hook-form @hookform/resolvers zod axios date-fns`
  - Run: `npm install -D tailwindcss postcss autoprefixer @types/node`

- [ ] **Task 2.2: Set up Shadcn/ui**
  - Create: `components.json` config
  - Run: `npx shadcn@latest init`
  - Add: Button, Input, Card components via shadcn

- [ ] **Task 2.3: Create base UI components**
  - Create: `src/shared/components/ui/button.tsx`
  - Create: `src/shared/components/ui/input.tsx`
  - Create: `src/shared/components/ui/card.tsx`

- [ ] **Task 2.4: Create Form components**
  - Create: `src/shared/components/forms/form-field.tsx`

- [ ] **Task 2.5: Create Data Display components**
  - Create: `src/shared/components/data-display/data-table.tsx`
  - Create: `src/shared/components/data-display/stat-card.tsx`
  - Create: `src/shared/components/data-display/empty-state.tsx`

- [ ] **Task 2.6: Create Layout components**
  - Create: `src/shared/components/layout/sidebar.tsx`
  - Create: `src/shared/components/layout/header.tsx`
  - Create: `src/shared/components/layout/page-container.tsx`

- [ ] **Task 2.7: Create shared types**
  - Create: `src/shared/types/user.ts`
  - Create: `src/shared/types/common.ts`

- [ ] **Task 2.8: Create shared hooks**
  - Create: `src/shared/hooks/use-debounce.ts`
  - Create: `src/shared/hooks/use-local-storage.ts`

- [ ] **Task 2.9: Create Zustand stores**
  - Create: `src/shared/store/auth-store.ts`
  - Create: `src/shared/store/theme-store.ts`
  - Create: `src/shared/store/ui-store.ts`

---

## Phase 3: Routing & Layouts

### Files to create:
```
src/app/
├── routes.tsx
├── providers.tsx
└── layouts/
    ├── auth-layout.tsx
    ├── app-layout.tsx
    └── role-layout.tsx
```

### Tasks:

- [ ] **Task 3.1: Set up React Router**
  - Modify: `src/App.tsx` to include Router provider
  - Create: `src/app/providers.tsx` with QueryClient provider

- [ ] **Task 3.2: Create Auth Layout**
  - Create: `src/app/layouts/auth-layout.tsx`
  - Create: `src/pages/auth/login-page.tsx`
  - Create: `src/pages/auth/register-page.tsx`

- [ ] **Task 3.3: Create App Layout**
  - Create: `src/app/layouts/app-layout.tsx` with Sidebar + Header
  - Create: `src/app/routes.tsx` with protected routes

- [ ] **Task 3.4: Implement Route Protection**
  - Create: `src/shared/components/route-protection.tsx`
  - Implement: `ProtectedRoute` component with role checks

---

## Phase 4: Authentication Module

### Files to create:
```
src/features/auth/
├── api/
│   ├── index.ts
│   ├── mock.ts
│   └── real.ts
├── components/
│   ├── login-form.tsx
│   └── auth-provider.tsx
├── hooks/
│   ├── use-login.ts
│   └── use-logout.ts
└── types/
    └── auth.ts
```

### Tasks:

- [ ] **Task 4.1: Create auth types**
  - Create: `src/features/auth/types/auth.ts`

- [ ] **Task 4.2: Create auth API layer**
  - Create: `src/features/auth/api/mock.ts`
  - Create: `src/features/auth/api/real.ts`
  - Create: `src/features/auth/api/index.ts`

- [ ] **Task 4.3: Create auth hooks**
  - Create: `src/features/auth/hooks/use-login.ts`
  - Create: `src/features/auth/hooks/use-logout.ts`

- [ ] **Task 4.4: Create Login Form component**
  - Create: `src/features/auth/components/login-form.tsx`
  - Create: `src/pages/auth/login-page.tsx`

- [ ] **Task 4.5: Wire up auth flow**
  - Modify: `src/shared/store/auth-store.ts` to use auth API
  - Verify: Login redirects to dashboard, logout clears state

---

## Phase 5: Dashboard Module

### Files to create:
```
src/features/dashboard/
├── api/
├── components/
│   ├── admin-dashboard.tsx
│   ├── teacher-dashboard.tsx
│   ├── parent-dashboard.tsx
│   └── student-dashboard.tsx
├── hooks/
│   └── use-dashboard-stats.ts
└── types/
    └── dashboard.ts
```

### Tasks:

- [ ] **Task 5.1: Create dashboard types**
  - Create: `src/features/dashboard/types/dashboard.ts`

- [ ] **Task 5.2: Create dashboard API layer**
  - Create: `src/features/dashboard/api/mock.ts`
  - Create: `src/features/dashboard/api/index.ts`

- [ ] **Task 5.3: Create dashboard hooks**
  - Create: `src/features/dashboard/hooks/use-dashboard-stats.ts`

- [ ] **Task 5.4: Create Admin Dashboard**
  - Create: `src/features/dashboard/components/admin-dashboard.tsx`
  - Create: `src/pages/dashboard/admin-dashboard-page.tsx`

- [ ] **Task 5.5: Create Teacher Dashboard**
  - Create: `src/features/dashboard/components/teacher-dashboard.tsx`
  - Create: `src/pages/dashboard/teacher-dashboard-page.tsx`

- [ ] **Task 5.6: Create Parent/Student Dashboards**
  - Create: `src/features/dashboard/components/parent-dashboard.tsx`
  - Create: `src/features/dashboard/components/student-dashboard.tsx`
  - Create: `src/pages/dashboard/index-page.tsx` (role-based redirect)

---

## Phase 6: Attendance Module

### Files to create:
```
src/features/attendance/
├── api/
├── components/
│   ├── attendance-list.tsx
│   ├── attendance-form.tsx
│   └── attendance-filters.tsx
├── hooks/
│   ├── use-attendance.ts
│   └── use-mark-attendance.ts
└── types/
    └── attendance.ts
```

### Tasks:

- [ ] **Task 6.1: Create attendance types**
  - Create: `src/features/attendance/types/attendance.ts`

- [ ] **Task 6.2: Create attendance API layer**
  - Create: `src/features/attendance/api/mock.ts`
  - Create: `src/features/attendance/api/index.ts`

- [ ] **Task 6.3: Create attendance hooks**
  - Create: `src/features/attendance/hooks/use-attendance.ts`
  - Create: `src/features/attendance/hooks/use-mark-attendance.ts`

- [ ] **Task 6.4: Create Attendance List component**
  - Create: `src/features/attendance/components/attendance-list.tsx`
  - Create: `src/features/attendance/components/attendance-filters.tsx`
  - Create: `src/pages/attendance/attendance-list-page.tsx`

- [ ] **Task 6.5: Create Mark Attendance component**
  - Create: `src/features/attendance/components/attendance-form.tsx`
  - Create: `src/pages/attendance/mark-attendance-page.tsx`

---

## Phase 7: Students Module

### Files to create:
```
src/features/students/
├── api/
├── components/
│   ├── student-list.tsx
│   ├── student-form.tsx
│   └── student-columns.tsx
├── hooks/
│   ├── use-students.ts
│   ├── use-student.ts
│   └── use-create-student.ts
└── types/
    └── student.ts
```

### Tasks:

- [ ] **Task 7.1: Create student types**
  - Create: `src/features/students/types/student.ts`

- [ ] **Task 7.2: Create student API layer**
  - Create: `src/features/students/api/mock.ts`
  - Create: `src/features/students/api/index.ts`

- [ ] **Task 7.3: Create student hooks**
  - Create: `src/features/students/hooks/use-students.ts`
  - Create: `src/features/students/hooks/use-student.ts`
  - Create: `src/features/students/hooks/use-create-student.ts`

- [ ] **Task 7.4: Create Student List component**
  - Create: `src/features/students/components/student-columns.tsx`
  - Create: `src/features/students/components/student-list.tsx`
  - Create: `src/pages/students/student-list-page.tsx`

- [ ] **Task 7.5: Create Student Form component**
  - Create: `src/features/students/components/student-form.tsx`
  - Create: `src/pages/students/student-form-page.tsx`

---

## Phase 8: Teachers Module

### Files to create:
```
src/features/teachers/
├── api/
├── components/
│   ├── teacher-list.tsx
│   ├── teacher-form.tsx
│   └── teacher-columns.tsx
├── hooks/
│   ├── use-teachers.ts
│   ├── use-teacher.ts
│   └── use-create-teacher.ts
└── types/
    └── teacher.ts
```

### Tasks:

- [ ] **Task 8.1: Create teacher types**
  - Create: `src/features/teachers/types/teacher.ts`

- [ ] **Task 8.2: Create teacher API layer**
  - Create: `src/features/teachers/api/mock.ts`
  - Create: `src/features/teachers/api/index.ts`

- [ ] **Task 8.3: Create teacher hooks**
  - Create: `src/features/teachers/hooks/use-teachers.ts`
  - Create: `src/features/teachers/hooks/use-teacher.ts`
  - Create: `src/features/teachers/hooks/use-create-teacher.ts`

- [ ] **Task 8.4: Create Teacher List component**
  - Create: `src/features/teachers/components/teacher-columns.tsx`
  - Create: `src/features/teachers/components/teacher-list.tsx`
  - Create: `src/pages/teachers/teacher-list-page.tsx`

- [ ] **Task 8.5: Create Teacher Form component**
  - Create: `src/features/teachers/components/teacher-form.tsx`
  - Create: `src/pages/teachers/teacher-form-page.tsx`

---

## Phase 9: Classes Module

### Files to create:
```
src/features/classes/
├── api/
├── components/
│   ├── class-list.tsx
│   ├── class-form.tsx
│   └── class-columns.tsx
├── hooks/
│   ├── use-classes.ts
│   ├── use-class.ts
│   └── use-create-class.ts
└── types/
    └── class.ts
```

### Tasks:

- [ ] **Task 9.1: Create class types**
  - Create: `src/features/classes/types/class.ts`

- [ ] **Task 9.2: Create class API layer**
  - Create: `src/features/classes/api/mock.ts`
  - Create: `src/features/classes/api/index.ts`

- [ ] **Task 9.3: Create class hooks**
  - Create: `src/features/classes/hooks/use-classes.ts`
  - Create: `src/features/classes/hooks/use-class.ts`
  - Create: `src/features/classes/hooks/use-create-class.ts`

- [ ] **Task 9.4: Create Class List component**
  - Create: `src/features/classes/components/class-columns.tsx`
  - Create: `src/features/classes/components/class-list.tsx`
  - Create: `src/pages/classes/class-list-page.tsx`

- [ ] **Task 9.5: Create Class Form component**
  - Create: `src/features/classes/components/class-form.tsx`
  - Create: `src/pages/classes/class-form-page.tsx`

---

## Phase 10: Fees Module

### Files to create:
```
src/features/fees/
├── api/
├── components/
│   ├── fee-list.tsx
│   ├── fee-form.tsx
│   └── fee-columns.tsx
├── hooks/
│   ├── use-fees.ts
│   ├── use-fee.ts
│   └── use-create-fee.ts
└── types/
    └── fee.ts
```

### Tasks:

- [ ] **Task 10.1: Create fee types**
  - Create: `src/features/fees/types/fee.ts`

- [ ] **Task 10.2: Create fee API layer**
  - Create: `src/features/fees/api/mock.ts`
  - Create: `src/features/fees/api/index.ts`

- [ ] **Task 10.3: Create fee hooks**
  - Create: `src/features/fees/hooks/use-fees.ts`
  - Create: `src/features/fees/hooks/use-fee.ts`
  - Create: `src/features/fees/hooks/use-create-fee.ts`

- [ ] **Task 10.4: Create Fee List component**
  - Create: `src/features/fees/components/fee-columns.tsx`
  - Create: `src/features/fees/components/fee-list.tsx`
  - Create: `src/pages/fees/fee-list-page.tsx`

- [ ] **Task 10.5: Create Fee Form component**
  - Create: `src/features/fees/components/fee-form.tsx`
  - Create: `src/pages/fees/fee-form-page.tsx`

---

## Phase 11: Mock API Migration

### Tasks:

- [ ] **Task 11.1: Create global API client**
  - Create: `src/api/client.ts` with axios instance

- [ ] **Task 11.2: Set up MSW for development**
  - Create: `src/api/mock/handlers.ts`
  - Create: `src/api/mock/database.ts`
  - Create: `src/api/mock/browser.ts`

- [ ] **Task 11.3: Migrate mock → real API**
  - Update: All `real.ts` files with actual endpoints
  - Swap: Export in each `index.ts` from mock to real
  - Verify: All features work with real API

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1.1-1.4 | Project initialization |
| 2 | 2.1-2.9 | Shared infrastructure |
| 3 | 3.1-3.4 | Routing and layouts |
| 4 | 4.1-4.5 | Authentication |
| 5 | 5.1-5.6 | Dashboard (role-based) |
| 6 | 6.1-6.5 | Attendance |
| 7 | 7.1-7.5 | Students |
| 8 | 8.1-8.5 | Teachers |
| 9 | 9.1-9.5 | Classes |
| 10 | 10.1-10.5 | Fees |
| 11 | 11.1-11.3 | API migration |
