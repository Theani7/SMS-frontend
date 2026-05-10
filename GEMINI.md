# GEMINI.md - School Management System (SMS) Frontend

This project is a modern School Management System (SMS) frontend built with React, Vite, and TypeScript. It features a clean, professional SaaS dashboard design and supports multiple user roles.

## Project Overview

- **Purpose**: A comprehensive management system for schools, handling students, teachers, classes, attendance, and fees.
- **Tech Stack**:
  - **Frontend Framework**: React 18
  - **Build Tool**: Vite 6
  - **Language**: TypeScript
  - **Styling**: Tailwind CSS 3 with shadcn/ui
  - **State Management**:
    - **Server State**: TanStack React Query (server data fetching, caching)
    - **Client State**: Zustand (auth, theme, UI state)
  - **Routing**: React Router 7
  - **Forms & Validation**: React Hook Form + Zod
- **Architecture**: Feature-based modular structure with clear separation of concerns.

## Building and Running

### Development
```bash
npm run dev          # Start the Vite development server
```

### Production
```bash
npm run build        # Run TypeScript check and generate production build
npm run preview      # Preview the production build locally
```

## Architecture & Development Conventions

### 1. Feature-Based Structure
Each domain (e.g., `students`, `teachers`, `attendance`) is a self-contained module located in `src/features/[module]/`.
- `api/`: API layer (mock and real implementations)
- `components/`: Feature-specific React components
- `hooks/`: Feature-specific hooks (React Query mutations/queries)
- `types/`: Feature-specific TypeScript interfaces

**Convention**: Keep features isolated. A feature should ideally be removable without breaking other parts of the application.

### 2. API Layer Pattern
Each feature follows a specific pattern for handling data:
- `mock.ts`: Mock data and simulated API calls (default implementation)
- `real.ts`: Actual REST API calls (to be implemented as backend becomes available)
- `index.ts`: Re-exports from either `mock.ts` or `real.ts`.

To switch from mock to real data, update the exports in `index.ts`.

### 3. Shared Infrastructure (`src/shared/`)
Common utilities and components used across multiple features:
- `components/ui/`: Base shadcn/ui components.
- `components/layout/`: App-wide layout components (Sidebar, Header, AppLayout).
- `lib/`: Shared utilities (cn helper, formatting, constants).
- `store/`: Zustand stores for global client state.

### 4. User Roles & Permissions
The system supports four distinct roles: `admin`, `teacher`, `parent`, and `student`.
- Route protection is managed via the `ProtectedRoute` component in `src/app/routes.tsx`.
- Access control is granular based on the logged-in user's role.

### 5. Styling & Themes
- Uses a "Corporate Trust" palette with modern, dense UI density.
- Dark mode is supported and persists via local storage.
- Custom shadow and gradient utilities are defined in `src/index.css`.

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | admin123 |
| Teacher | teacher@school.com | teacher123 |
| Parent | parent@school.com | parent123 |
| Student | student@school.com | student123 |
