# School Management System — Frontend Architecture Design

**Date:** 2026-05-09  
**Status:** Approved

---

## 1. Overview

A scalable, maintainable frontend for a school management system built with React, Vite, TypeScript, and Tailwind CSS. Designed for 4 user roles (admin, teacher, parent, student) with role-based access control (RBAC).

---

## 2. Tech Stack

| Category | Choice | Rationale |
|----------|--------|-----------|
| Framework | React + Vite | Fast development, HMR |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS + Shadcn/ui | Utility-first, accessible components |
| Routing | React Router v6 | Nested routes, shared layouts |
| Data Fetching | React Query + REST | Caching, loading states |
| Forms | React Hook Form + Zod | Type-safe validation |
| State | Zustand | Lightweight, client-side only |
| API Layer | Service abstraction | Mock → Real migration |

---

## 3. Architecture

### 3.1 Folder Structure

```
school-frontend/
├── src/
│   ├── app/                    # App-level setup
│   │   ├── App.tsx
│   │   ├── routes.tsx          # Route definitions
│   │   ├── providers.tsx       # Context providers
│   │   ├── main.tsx
│   │   └── layouts/
│   │       ├── auth-layout.tsx
│   │       ├── app-layout.tsx
│   │       └── role-layout.tsx
│   ├── features/               # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   │   ├── index.ts
│   │   │   │   ├── mock.ts
│   │   │   │   └── real.ts
│   │   │   └── types/
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── teachers/
│   │   ├── classes/
│   │   ├── attendance/
│   │   └── fees/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/             # Base (Button, Input, Card, Table, Dialog, etc.)
│   │   │   ├── forms/          # FormField, SearchInput, DatePicker, FilterBar
│   │   │   ├── data-display/   # DataTable, StatCard, StatusBadge, EmptyState
│   │   │   └── layout/         # Sidebar, Header, PageContainer, RoleBasedNav
│   │   ├── hooks/              # useDebounce, useLocalStorage
│   │   ├── lib/                # Utils, constants
│   │   ├── store/              # Zustand stores
│   │   │   ├── auth-store.ts
│   │   │   ├── theme-store.ts
│   │   │   └── ui-store.ts
│   │   └── types/              # Shared interfaces
│   └── api/
│       ├── client.ts            # Axios instance
│       └── mock/
│           ├── handlers.ts
│           ├── database.ts
│           └── browser.ts
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

### 3.2 Key Principles

- **Feature isolation:** Each feature is self-contained; can be deleted without breaking others
- **Shared vs. domain:** Shared code lives in `shared/`, feature-specific code in `features/`
- **Server state:** React Query handles all API data
- **Client state:** Zustand handles auth, theme, UI state only

---

## 4. API Layer

### 4.1 Mock → Real Migration Strategy

```
src/features/[feature]/api/
├── index.ts     # Exports the active implementation
├── mock.ts      # Mock data (development)
└── real.ts      # Real API (production)
```

**Migration flow:**
1. Build UI using mock implementations
2. When backend is ready, create `real.ts` with actual API calls
3. Swap the export in `index.ts`
4. No UI component changes required

### 4.2 React Query Integration

```typescript
// features/students/hooks/useStudents.ts
export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  });
};
```

---

## 5. Shared Components

### 5.1 Component Categories

| Category | Contents |
|----------|----------|
| `ui/` | Base primitives (Shadcn/ui): Button, Input, Card, Table, Dialog, Select, Badge, Avatar |
| `forms/` | FormField, SearchInput, DatePicker, FilterBar |
| `data-display/` | DataTable, StatCard, StatusBadge, EmptyState |
| `layout/` | Sidebar, Header, PageContainer, RoleBasedNav |

### 5.2 Usage Patterns

```tsx
// Forms
<FormField label="Student Name" error={errors.name}>
  <Input {...register('name')} />
</FormField>

// Data table
<DataTable
  data={students}
  columns={studentColumns}
  searchPlaceholder="Search students..."
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

// Dashboard stats
<StatCard title="Total Students" value={156} icon={Users} trend={{ value: 5, positive: true }} />
```

---

## 6. State Management

### 6.1 Zustand Stores

| Store | Purpose |
|-------|---------|
| `auth-store.ts` | User session, role, permissions, login/logout |
| `theme-store.ts` | Dark/light mode |
| `ui-store.ts` | Sidebar state, notifications, modals |

### 6.2 Responsibilities

- **React Query:** All server data (API responses, caching, mutations)
- **Zustand:** Client-only state (auth, theme, UI)

---

## 7. Routing

### 7.1 Route Structure

```typescript
// routes.tsx
export const routes = {
  public: [
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
  ],
  protected: [
    { path: '/dashboard', roles: ['admin', 'teacher', 'parent', 'student'] },
    { path: '/students', roles: ['admin', 'teacher'] },
    { path: '/students/:id', roles: ['admin', 'teacher', 'parent'] },
    { path: '/teachers', roles: ['admin'] },
    { path: '/classes', roles: ['admin', 'teacher'] },
    { path: '/attendance', roles: ['admin', 'teacher', 'parent', 'student'] },
    { path: '/attendance/mark', roles: ['admin', 'teacher'] },
    { path: '/fees', roles: ['admin', 'parent'] },
  ],
};
```

### 7.2 Route Protection

Protected routes check authentication and role before rendering:

```typescript
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/dashboard" />;

  return children;
};
```

### 7.3 Layouts

| Layout | Purpose |
|--------|---------|
| `auth-layout.tsx` | Login/register pages (no sidebar) |
| `app-layout.tsx` | Sidebar + header wrapper for all authenticated pages |
| `role-layout.tsx` | Role-based content filtering |

---

## 8. Module Build Priority

| Phase | Modules | Notes |
|-------|---------|-------|
| 1 | Authentication | RBAC, login, logout |
| 2 | Dashboard | Role-specific views |
| 3 | Attendance | High frequency, forms |
| 4 | Students, Teachers, Classes | CRUD, relationships |
| 5 | Fees | Payment tracking |

---

## 9. Design Decisions

| Decision | Rationale |
|----------|-----------|
| Feature-based structure | Scalable, self-contained modules |
| React Query + REST | Built-in caching, loading states |
| Shadcn/ui | Accessible, customizable |
| React Hook Form + Zod | Type-safe validation |
| Zustand for auth/theme | Minimal boilerplate |
| Service abstraction for API | Clean mock → real migration |

---

## 10. Out of Scope

- Backend implementation
- Parent/Student self-service portal
- Payment integration
- Real-time notifications
- Offline support
