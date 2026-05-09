# Corporate Trust Design System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual redesign of school management frontend using Corporate Trust design system — vibrant gradients, colored shadows, Plus Jakarta Sans typography, and elevated card interactions.

**Architecture:** Replace CSS variables in index.css with Corporate Trust palette, update font loading, refine component styles across all pages. Changes cascade from design tokens to all components automatically.

**Tech Stack:** Tailwind CSS, Plus Jakarta Sans font, Lucide icons, CSS custom properties for theming.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `src/index.css` | Corporate Trust CSS variables, shadows, animations |
| `index.html` | Plus Jakarta Sans font loading |
| `src/shared/components/ui/button.tsx` | Gradient primary button, hover lift |
| `src/shared/components/ui/input.tsx` | Refined focus ring, border colors |
| `src/shared/components/ui/card.tsx` | Card base with soft shadow |
| `src/shared/components/layout/sidebar.tsx` | Elevated nav with hover effects |
| `src/shared/components/layout/header.tsx` | Polished header with indicators |
| `src/shared/components/data-display/stat-card.tsx` | Icon badge, hover lift card |
| `src/shared/components/data-display/data-table.tsx` | Refined table styling |
| `src/pages/auth/login-page.tsx` | Split-screen with gradient accents |
| `src/features/auth/components/login-form.tsx` | Gradient form styling |
| `src/features/dashboard/components/admin-dashboard.tsx` | Modern stat grid layout |
| `src/features/*/components/*-list.tsx` | Refresh list components |
| `src/features/*/components/*-columns.tsx` | Badge styling updates |

---

## Phase 1: Design Tokens & Typography

### Task 1: Update index.css with Corporate Trust palette

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace CSS variables**

Replace the entire `:root` and `.dark` blocks:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 40% 98%;         /* Slate 50 #F8FAFC */
    --foreground: 222.2 47.4% 9.1%;   /* Slate 900 #0F172A */
    --card: 0 0% 100%;                 /* White */
    --card-foreground: 222.2 47.4% 9.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 9.1%;
    --primary: 239 84% 67%;             /* Indigo 600 #6366f1 */
    --primary-foreground: 210 40% 98%;
    --secondary: 257 80% 51%;           /* Violet 600 #7C3AED */
    --secondary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;             /* Slate 100 */
    --muted-foreground: 215.4 16.3% 46.9%; /* Slate 500 */
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 9.1%;
    --destructive: 0 84.2% 60.2%;       /* Red 500 */
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;        /* Slate 200 */
    --input: 214.3 31.8% 91.4%;
    --ring: 239 84% 67%;
    --radius: 0.75rem;                  /* 12px rounded-xl */
  }

  .dark {
    --background: 222.2 84% 4.9%;      /* Slate 950 */
    --foreground: 210 40% 98%;
    --card: 217.2 32.6% 17%;            /* Slate 800 */
    --card-foreground: 210 40% 98%;
    --popover: 217.2 32.6% 17%;
    --popover-foreground: 210 40% 98%;
    --primary: 229 80% 76%;             /* Indigo 400 */
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 258 80% 70%;           /* Violet 400 */
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17%;         /* Slate 700 */
    --input: 217.2 32.6% 17%;
    --ring: 229 80% 76%;
    --radius: 0.75rem;
  }
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    transition: background-color 200ms ease-out, color 200ms ease-out, border-color 200ms ease-out;
  }
  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -0.02em;
    font-weight: 700;
  }
}

/* Corporate Trust Shadows - Colored */
.shadow-soft {
  box-shadow: 0 4px 20px -2px rgba(79, 70, 229, 0.1);
}

.shadow-elevated {
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1);
}

.shadow-button {
  box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.3);
}

.shadow-glow {
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.5);
}

/* Gradient utilities */
.bg-gradient-primary {
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
}

.text-gradient-primary {
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Card hover effect */
.card-hover {
  transition: all 200ms ease-out;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1);
}

/* Button hover effect */
.btn-lift {
  transition: all 200ms ease-out;
}
.btn-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(79, 70, 229, 0.35);
}

/* Dark mode shadows */
.dark .shadow-soft {
  box-shadow: 0 4px 20px -2px rgba(79, 70, 229, 0.25);
}

.dark .shadow-elevated {
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.35), 0 8px 10px -6px rgba(79, 70, 229, 0.2);
}

/* Background gradient blob */
.gradient-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(100px);
  opacity: 0.2;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -15
```

Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(ui): apply Corporate Trust design tokens"
```

---

### Task 2: Update index.html with Plus Jakarta Sans font

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace font link**

Replace `Inter` with `Plus Jakarta Sans`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Verify font loads**

Start dev server, inspect network tab for font request

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(ui): load Plus Jakarta Sans font"
```

---

## Phase 2: Core Components

### Task 3: Update Button component with gradient and lift

**Files:**
- Modify: `src/shared/components/ui/button.tsx`

- [ ] **Step 1: Add gradient variants**

Replace buttonVariants with:

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-button btn-lift",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/ui/button.tsx
git commit -m "feat(ui): add gradient button with hover lift"
```

---

### Task 4: Update Input component styling

**Files:**
- Modify: `src/shared/components/ui/input.tsx`

- [ ] **Step 1: Refine input styles**

```typescript
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/ui/input.tsx
git commit -m "feat(ui): refine input focus ring styling"
```

---

### Task 5: Update Card component

**Files:**
- Modify: `src/shared/components/ui/card.tsx`

- [ ] **Step 1: Add elevated card styling**

```typescript
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-slate-100 bg-white shadow-soft card-hover",
      className
    )}
    {...props}
  />
));
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/ui/card.tsx
git commit -m "feat(ui): update Card with soft shadow and hover"
```

---

## Phase 3: Layout Components

### Task 6: Update Sidebar navigation

**Files:**
- Modify: `src/shared/components/layout/sidebar.tsx`

- [ ] **Step 1: Refine sidebar styles**

Update navigation items with elevated hover:

```typescript
// In NavItem, update className:
<div
  className={cn(
    'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
    isActive 
      ? 'bg-indigo-50 text-indigo-700 font-semibold' 
      : 'hover:bg-indigo-50/70 text-slate-600 hover:text-slate-900',
  )}
>
```

Update active indicator:
```typescript
{isActive && (
  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-to-b from-indigo-500 to-violet-500" />
)}
```

Update user section:
```typescript
// User avatar with gradient accent:
<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-glow">
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/layout/sidebar.tsx
git commit -m "feat(ui): update sidebar with elevated hover states"
```

---

### Task 7: Update Header component

**Files:**
- Modify: `src/shared/components/layout/header.tsx`

- [ ] **Step 1: Polish header styling**

```typescript
// Update theme toggle button with gradient accent on hover:
<Button
  variant="ghost"
  size="icon"
  onClick={toggleTheme}
  className="hover:bg-indigo-50 transition-colors duration-200"
  aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
>
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/layout/header.tsx
git commit -m "feat(ui): polish header styling"
```

---

### Task 8: Update StatCard component

**Files:**
- Modify: `src/shared/components/data-display/stat-card.tsx`

- [ ] **Step 1: Modernize stat card**

```typescript
export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-semibold text-slate-500">{title}</span>
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
        {trend && (
          <p className={cn(
            'text-sm font-semibold mt-2 flex items-center gap-1',
            trend.positive ? 'text-emerald-600' : 'text-red-500'
          )}>
            {trend.positive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {trend.positive ? '+' : '-'}{trend.value}%
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Add TrendingUp/TrendingDown imports**

```typescript
import { TrendingUp, TrendingDown } from 'lucide-react';
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/shared/components/data-display/stat-card.tsx
git commit -m "feat(ui): modernize StatCard with icon badge"
```

---

## Phase 4: Login Page

### Task 9: Redesign login page

**Files:**
- Modify: `src/pages/auth/login-page.tsx`

- [ ] **Step 1: Create modern split-screen layout**

```typescript
import { BookOpen, Users, ClipboardCheck, DollarSign, Calendar } from 'lucide-react';
import { LoginForm } from '../../features/auth/components/login-form';

const features = [
  { icon: Users, text: 'Streamlined student management' },
  { icon: ClipboardCheck, text: 'Real-time attendance tracking' },
  { icon: DollarSign, text: 'Automated fee collection' },
  { icon: Calendar, text: 'Smart class scheduling' },
];

export function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800">
        {/* Decorative blobs */}
        <div className="gradient-blob w-[500px] h-[500px] bg-indigo-400 -top-48 -left-48" />
        <div className="gradient-blob w-[400px] h-[400px] bg-violet-400 -bottom-32 -right-32" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 w-full text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">School App</h1>
              <p className="text-sm text-indigo-200">Management Platform</p>
            </div>
          </div>

          {/* Headline with gradient text */}
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Education Platform
          </h2>
          <p className="text-lg text-indigo-100 mb-12 max-w-sm leading-relaxed">
            Streamline your school management with our comprehensive platform designed for modern educators.
          </p>

          {/* Abstract graphic */}
          <div className="mb-12 flex justify-center">
            <svg width="240" height="180" viewBox="0 0 240 180" fill="none" className="drop-shadow-2xl">
              {/* Central node */}
              <circle cx="120" cy="90" r="32" fill="white" fillOpacity="0.2" />
              <circle cx="120" cy="90" r="18" fill="white" />
              
              {/* Connected nodes */}
              <circle cx="50" cy="45" r="16" fill="white" fillOpacity="0.15" />
              <circle cx="190" cy="45" r="16" fill="white" fillOpacity="0.15" />
              <circle cx="50" cy="135" r="16" fill="white" fillOpacity="0.15" />
              <circle cx="190" cy="135" r="16" fill="white" fillOpacity="0.15" />
              
              {/* Lines */}
              <line x1="95" y1="72" x2="62" y2="52" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
              <line x1="145" y1="72" x2="178" y2="52" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
              <line x1="95" y1="108" x2="62" y2="128" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
              <line x1="145" y1="108" x2="178" y2="128" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
            </svg>
          </div>

          {/* Feature list */}
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-indigo-200" />
                </div>
                <span className="text-white font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900">School App</span>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/auth/login-page.tsx
git commit -m "feat(ui): redesign login page with Corporate Trust branding"
```

---

### Task 10: Update LoginForm component

**Files:**
- Modify: `src/features/auth/components/login-form.tsx`

- [ ] **Step 1: Modernize form styling**

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/use-login';
import { ROUTES } from '../../../shared/lib/constants';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { Label } from '../../../shared/components/ui/label';
import { Card, CardContent } from '../../../shared/components/ui/card';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-slate-500 mt-2">
          Sign in to your dashboard
        </p>
      </div>

      <Card className="shadow-soft border-slate-100">
        <CardContent className="pt-6">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            {loginMutation.isError && (
              <p className="text-sm text-red-500 text-center font-medium">
                {loginMutation.error.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Demo credentials */}
      <Card className="bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100">
        <CardContent className="pt-4 text-sm">
          <p className="font-semibold text-slate-700 mb-2">Demo accounts:</p>
          <div className="grid grid-cols-2 gap-1 text-slate-600">
            <p><span className="font-medium">Admin:</span> admin@school.com</p>
            <p><span className="font-medium">Teacher:</span> teacher@school.com</p>
            <p><span className="font-medium">Parent:</span> parent@school.com</p>
            <p><span className="font-medium">Student:</span> student@school.com</p>
          </div>
          <p className="text-slate-500 mt-2">Password: admin123</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/features/auth/components/login-form.tsx
git commit -m "feat(ui): update LoginForm with Corporate Trust styling"
```

---

## Phase 5: Dashboard

### Task 11: Modernize admin dashboard

**Files:**
- Modify: `src/features/dashboard/components/admin-dashboard.tsx`

- [ ] **Step 1: Update dashboard layout**

```typescript
import { useAdminStats } from '../hooks/use-dashboard-stats';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { Users, GraduationCap, BookOpen, ClipboardCheck, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { formatDate } from '../../../shared/lib/utils';
import { TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 rounded-xl animate-pulse bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Good morning, Admin
        </h1>
        <p className="text-slate-500 mt-1">
          Here's what's happening at your school today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={Users}
          description="Active enrollment"
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Total Teachers"
          value={stats?.totalTeachers || 0}
          icon={GraduationCap}
          description="Active staff"
        />
        <StatCard
          title="Total Classes"
          value={stats?.totalClasses || 0}
          icon={BookOpen}
          description="Across all grades"
        />
        <StatCard
          title="Today's Attendance"
          value={`${stats?.todayAttendance || 0}%`}
          icon={ClipboardCheck}
          description="Present rate"
          trend={{ value: 2, positive: true }}
        />
      </div>

      {/* Content Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-indigo-600" />
              </div>
              Pending Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-extrabold text-slate-900">{stats?.pendingFees || 0}</p>
            <p className="text-sm text-slate-500 mt-1">students with pending fees</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-900">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                <Activity className="h-5 w-5 text-indigo-600" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentActivities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">{activity.message}</p>
                    <p className="text-xs text-slate-400">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add TrendingUp import if not present**

```typescript
import { TrendingUp } from 'lucide-react';
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/features/dashboard/components/admin-dashboard.tsx
git commit -m "feat(ui): modernize admin dashboard layout"
```

---

## Phase 6: Data Display Components

### Task 12: Update DataTable styling

**Files:**
- Modify: `src/shared/components/data-display/data-table.tsx`

- [ ] **Step 1: Refine table appearance**

```typescript
// Container:
<div className="rounded-xl border border-slate-100 bg-white shadow-soft overflow-hidden">

// Header row:
<TableRow className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-100">

// TableHead:
<TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider">

// Data rows:
<TableRow className="border-b border-slate-50 hover:bg-indigo-50/30 transition-colors">
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/data-display/data-table.tsx
git commit -m "feat(ui): update DataTable with Corporate Trust styling"
```

---

### Task 13: Update EmptyState component

**Files:**
- Modify: `src/shared/components/data-display/empty-state.tsx`

- [ ] **Step 1: Modernize empty state**

```typescript
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center mb-6">
        <FileQuestion className="h-10 w-10 text-indigo-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="shadow-button btn-lift">
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/components/data-display/empty-state.tsx
git commit -m "feat(ui): update EmptyState with gradient icon"
```

---

## Phase 7: List Components

### Task 14: Update list components styling

**Files:**
- Modify: All `*-list.tsx` files in features

- [ ] **Step 1: Update search input styling**

In each list component, update the search input container:

```typescript
<div className="relative flex-1 max-w-sm">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
  <Input
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="h-11 pl-11 pr-11 rounded-xl border-slate-200 bg-white"
  />
  {search && (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg"
      onClick={() => setSearch('')}
      aria-label="Clear search"
    >
      <X className="h-4 w-4" />
    </Button>
  )}
</div>
```

- [ ] **Step 2: Update Add button styling**

```typescript
<Button className="h-11 px-5 rounded-xl shadow-button btn-lift gap-2">
  <Plus className="h-5 w-5" />
  Add {entityName}
</Button>
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/features/students/components/student-list.tsx
git add src/features/teachers/components/teacher-list.tsx
git add src/features/classes/components/class-list.tsx
git add src/features/fees/components/fee-list.tsx
git add src/features/attendance/components/attendance-list.tsx
git commit -m "feat(ui): update list components with Corporate Trust styling"
```

---

### Task 15: Update column badge styling

**Files:**
- Modify: All `*-columns.tsx` files

- [ ] **Step 1: Update status badges**

```typescript
// Status badge variants:
const statusStyles = {
  paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  overdue: 'bg-red-100 text-red-700 border-red-200',
  active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  inactive: 'bg-slate-100 text-slate-600 border-slate-200',
  present: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  absent: 'bg-red-100 text-red-700 border-red-200',
  late: 'bg-amber-100 text-amber-700 border-amber-200',
};

// Apply to badge:
<span className={cn(
  'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border',
  statusStyles[status as keyof typeof statusStyles]
)}>
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/features/students/components/student-columns.tsx
git add src/features/teachers/components/teacher-columns.tsx
git add src/features/classes/components/class-columns.tsx
git add src/features/fees/components/fee-columns.tsx
git commit -m "feat(ui): update column badges with refined styling"
```

---

## Phase 8: Forms

### Task 16: Update form styling

**Files:**
- Modify: All `*-form.tsx` files

- [ ] **Step 1: Update form layout and styling**

For each form:

```typescript
// Card container:
<Card className="shadow-soft border-slate-100 max-w-2xl mx-auto">

// Labels:
<Label className="text-sm font-semibold text-slate-700">

// Input styling (already updated in Task 4):
// className="h-12 rounded-xl"

// Submit button:
<Button type="submit" className="w-full h-12 text-base shadow-button btn-lift">
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/features/students/components/student-form.tsx
git add src/features/teachers/components/teacher-form.tsx
git add src/features/classes/components/class-form.tsx
git add src/features/fees/components/fee-form.tsx
git add src/features/attendance/components/attendance-form.tsx
git commit -m "feat(ui): update form components with Corporate Trust styling"
```

---

## Phase 9: Verification

### Task 17: Final verification

**Files:**
- Review all modified files

- [ ] **Step 1: Full build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds

- [ ] **Step 2: Check all pages**

Verify these pages render correctly:
- `/login` - Split screen with gradient branding
- `/dashboard` - Modern stat cards with icon badges
- `/students` - Table with hover states and clear button
- `/classes` - Same as students
- `/attendance` - Filters and list
- `/fees` - Table with status badges

- [ ] **Step 3: Test interactions**

- Hover on cards - should lift
- Hover on buttons - should lift and shadow
- Theme toggle - should switch dark/light
- Login - gradient form button

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat(ui): complete Corporate Trust design system implementation"
```

---

## Self-Review Checklist

1. **Spec coverage:** All design tokens, typography, components, and pages covered
2. **Placeholder scan:** No TBD/TODO - all values are concrete
3. **Type consistency:** CSS variables and class names consistent throughout

---

## Execution Options

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session, batch execution with checkpoints

Which approach?
