# UI Consistency & Feature Page Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align feature list pages and forms with the "Modern SaaS" aesthetic, improving spacing, consistency, and layout.

**Architecture:** Use a "Stage" layout with `bg-mesh` for feature pages. Refactor components to use consistent borders, shadows, and rounded corners.

**Tech Stack:** React, Tailwind CSS, Lucide Icons, Radix UI (via shadcn/ui).

---

### Task 1: Refactor PageContainer for "Stage" Layout

**Files:**
- Modify: `src/shared/components/layout/page-container.tsx`

- [ ] **Step 1: Update PageContainer to support `withMesh` and improved spacing**

```tsx
import { cn } from '../../lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  withMesh?: boolean;
}

export function PageContainer({
  children,
  className,
  title,
  description,
  withMesh = false
}: PageContainerProps) {
  return (
    <div className={cn(
      'flex flex-col gap-4 lg:gap-6 p-4 lg:p-6',
      withMesh && 'bg-mesh min-h-full -m-4 p-4 lg:-m-8 lg:p-8',
      className
    )}>
      {title && (
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
          {description && (
            <p className="text-[13px] text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/components/layout/page-container.tsx
git commit -m "style: add withMesh support to PageContainer"
```

### Task 2: Polish DataTable Component

**Files:**
- Modify: `src/shared/components/data-display/data-table.tsx`

- [ ] **Step 1: Update borders and monochromatic headers**

```tsx
// Around line 50
    <div className="relative rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 shadow-soft overflow-hidden">
      {/* Gradient fade indicators on mobile to hint at horizontal scroll */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-slate-950 to-transparent lg:hidden" />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              {headerGroup.headers.map((header) => {
// ...
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/components/data-display/data-table.tsx
git commit -m "style: polish DataTable borders and header"
```

### Task 3: Refactor Student List and Form

**Files:**
- Modify: `src/features/students/components/student-list.tsx`
- Modify: `src/features/students/components/student-form.tsx`
- Modify: `src/pages/students/student-list-page.tsx`
- Modify: `src/pages/students/student-form-page.tsx` (if it exists)

- [ ] **Step 1: Update StudentList aesthetic**
- Refine search bar: `h-10`, refined borders, indigo focus ring.
- Soften borders: `border-slate-200/60`.

- [ ] **Step 2: Update StudentForm aesthetic**
- Remove `max-w-2xl mx-auto`.
- Use `rounded-xl` and `border-slate-200/60`.

- [ ] **Step 3: Enable withMesh in Student pages**

- [ ] **Step 4: Commit**

```bash
git add src/features/students/components/student-list.tsx src/features/students/components/student-form.tsx src/pages/students/student-list-page.tsx
git commit -m "style: align student feature pages with Modern SaaS aesthetic"
```

### Task 4: Refactor Teacher List and Form

**Files:**
- Modify: `src/features/teachers/components/teacher-list.tsx`
- Modify: `src/features/teachers/components/teacher-form.tsx`
- Modify: `src/pages/teachers/teacher-list-page.tsx`

- [ ] **Step 1: Update TeacherList aesthetic**
- [ ] **Step 2: Update TeacherForm aesthetic**
- [ ] **Step 3: Enable withMesh in Teacher pages**
- [ ] **Step 4: Commit**

### Task 5: Refactor Class List and Form

**Files:**
- Modify: `src/features/classes/components/class-list.tsx`
- Modify: `src/features/classes/components/class-form.tsx`
- Modify: `src/pages/classes/class-list-page.tsx`

- [ ] **Step 1: Update ClassList aesthetic**
- [ ] **Step 2: Update ClassForm aesthetic**
- [ ] **Step 3: Enable withMesh in Class pages**
- [ ] **Step 4: Commit**

### Task 6: Refactor Fee List and Form

**Files:**
- Modify: `src/features/fees/components/fee-list.tsx`
- Modify: `src/features/fees/components/fee-form.tsx`
- Modify: `src/pages/fees/fee-list-page.tsx`

- [ ] **Step 1: Update FeeList aesthetic**
- [ ] **Step 2: Update FeeForm aesthetic**
- [ ] **Step 3: Enable withMesh in Fee pages**
- [ ] **Step 4: Commit**

### Task 7: Verification

- [ ] **Step 1: Run build to ensure no TypeScript errors**
- [ ] **Step 2: Final check of all pages for visual consistency**
