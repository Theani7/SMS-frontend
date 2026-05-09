# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # TypeScript check + production build
npm run preview      # Preview production build locally
```

## Architecture

### Feature-Based Structure

Each domain (students, teachers, attendance, etc.) is a self-contained feature module in `src/features/`. Every feature follows the same pattern:

```
features/[module]/
├── api/          # API layer (mock.ts, real.ts, index.ts)
├── components/    # Feature-specific React components
├── hooks/        # Feature-specific hooks (React Query mutations, etc.)
└── types/         # Feature-specific TypeScript interfaces
```

**Key principle:** Each feature is isolated — can be deleted without breaking the rest of the app.

### API Layer Pattern

Each feature has three API files:
- `mock.ts` — Mock data with simulated delays (default export)
- `real.ts` — Real REST API calls (create when backend is ready)
- `index.ts` — Re-exports from either mock or real

To switch from mock to real API, update `index.ts` to export from `real.ts` instead of `mock.ts`.

See `docs/MOCK-TO-REAL-MIGRATION.md` for detailed migration steps.

### Shared Infrastructure (`src/shared/`)

| Directory | Purpose |
|-----------|---------|
| `components/ui/` | Shadcn/ui base components (Button, Input, Card, Table, etc.) |
| `components/forms/` | Form abstractions (FormField) |
| `components/data-display/` | Data presentation (DataTable, StatCard, EmptyState) |
| `components/layout/` | Layout components (Sidebar, Header, PageContainer) |
| `store/` | Zustand stores for client state (auth, theme, UI) |
| `hooks/` | Shared hooks (useDebounce, useLocalStorage) |
| `types/` | Shared TypeScript interfaces (User, UserRole, common types) |
| `lib/` | Utilities (cn, formatDate, formatCurrency, ROUTES constants) |

**Data fetching:** Server state uses React Query hooks (in feature `hooks/`). Zustand is only for client-side state.

### Routing

Routes are defined in `src/app/routes.tsx`. Route protection uses the `ProtectedRoute` component which checks `allowedRoles` against `useAuthStore().role`.

| Component | Purpose |
|-----------|---------|
| `AuthLayout` | Wrapper for public pages (login, register) |
| `AppLayout` | Sidebar + Header wrapper for authenticated pages |
| `ProtectedRoute` | Guards routes by authentication and role |

### User Roles & Permissions

Four roles: `admin`, `teacher`, `parent`, `student`.

Route-level access control:
- Students: `/students`, `/teachers`
- Teachers: `/students`, `/classes`, `/attendance/mark`
- Parents: `/attendance`, `/fees`
- Admin: Full access

### State Management

- **React Query:** All server state (API calls, caching)
- **Zustand:** Client state only (auth, theme, UI notifications)
- **Zustand persist middleware:** Auth state persists to localStorage

### Form Handling

Forms use `react-hook-form` + `zod` for validation. Shared `FormField` component wraps inputs with labels and error messages.

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | admin123 |
| Teacher | teacher@school.com | teacher123 |
| Parent | parent@school.com | parent123 |
| Student | student@school.com | student123 |
