# School Management System (SMS) Frontend

A modern, production-hardened School Management System frontend built with React, Vite, and TypeScript. This project features a high-density "Modern SaaS" aesthetic (Linear/Notion hybrid) and a proactive, student-centric productivity hub.

## 🚀 Key Features

### 👨‍🎓 Student Portal (Productivity Hub)
- **Dashboard (Operational Stage):** A dynamic greeting and "Urgency Ribbon" that prioritizes critical deadlines, urgent announcements, and at-risk attendance.
- **Assignments (Linear-Style Inbox):** Task management treating homework as a productivity queue with status tabs and temporal grouping.
- **Performance Growth:** SVG-based academic trajectory charts with "Actual vs. Projected" GPA and subject-level compliance insights.
- **Interactive Timetable:** High-density vertical daily timeline and a full weekly grid view.
- **Financial Ledger:** Detailed itemized breakdown of fees with payment progress tracking and mock payment processing.
- **Announcements Inbox:** Split-pane communication center with priority-based categorization (Urgent, Academic, General).

### 🏛️ Administration & Management
- **Student & Teacher Management:** Full CRUD operations with specialized form hardening and accessibility.
- **Attendance Marking:** Streamlined interface for teachers to mark daily attendance.
- **Class & Fee Management:** Administrative tools to organize school structure and financial records.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **State Management:**
  - **Server State:** [TanStack React Query](https://tanstack.com/query)
  - **Client State:** [Zustand](https://github.com/pmndrs/zustand)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏗️ Architecture

The project follows a **feature-based modular structure** for maximum scalability and isolation:

```text
src/
├── app/              # Routing and global layouts
├── features/         # Self-contained modules (auth, dashboard, students, etc.)
│   ├── [feature]/
│   │   ├── api/      # Mock and real API implementations
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
├── shared/           # Common UI components, hooks, and utilities
│   ├── components/   # shadcn base components + project-specific shared UI
│   ├── store/        # Global Zustand stores
│   └── lib/          # Utilities (cn, formatting, constants)
└── api/              # Global API client and shared mock database
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Theani7/SMS-frontend.git
   cd SMS-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```

## 🔐 User Roles & Demo Credentials

The system implements granular role-based access control (RBAC):

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | `admin@school.com` | `admin123` | Full System Control |
| **Teacher** | `teacher@school.com` | `teacher123` | Classes & Attendance |
| **Student** | `student@school.com` | `student123` | Personal Productivity |
| **Parent** | `parent@school.com` | `parent123` | Child Progress & Fees |

## 🎨 Design Philosophy

- **High Density:** Minimized whitespace and 12px metadata for an information-rich workspace.
- **Operational Stage:** Proactive UI that answers "What do I do now?" rather than just listing data.
- **Accessibility:** Mandatory `htmlFor` linkage, ARIA attributes, and keyboard navigation support.
- **Production-Hardened:** Global error handling via React Query and Zustand notifications, route-level code splitting, and strict TypeScript types.

## 📡 API Integration

The project uses a **Mock-First** approach. Each feature contains a `mock.ts` file. To migrate to a real backend:
1. Create `real.ts` in the feature's `api/` directory.
2. Update `index.ts` to export from `real.ts`.
3. Configure your API base URL in the `.env` file.

See `docs/MOCK-TO-REAL-MIGRATION.md` for more details.

## 📄 License

This project is licensed under the MIT License.
