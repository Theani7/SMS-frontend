# School Frontend UI Redesign — Indigo Clarity

> **For agentic workers:** This is a design specification. Implementation requires writing-plans skill.

**Goal:** Modernize the school management frontend with a refined SaaS aesthetic that balances data density with visual clarity.

**Architecture:** Indigo Clarity design system built on Shadcn/ui + Tailwind CSS with CSS variable-driven theming for dark mode.

**Tech Stack:** Tailwind CSS (existing), Inter font, Lucide icons, CSS variables for theming.

---

## 1. Color Palette

### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| background | #f8fafc | Page base (slate-50) |
| surface | #ffffff | Card backgrounds |
| primary | #6366f1 | Buttons, active states (indigo-500) |
| primary-hover | #4f46e5 | Button hover (indigo-600) |
| secondary | #f1f5f9 | Subtle backgrounds (slate-100) |
| muted | #e2e8f0 | Borders, dividers (slate-200) |
| text-primary | #0f172a | Headings (slate-900) |
| text-secondary | #64748b | Descriptions, labels (slate-500) |
| text-muted | #94a3b8 | Placeholders (slate-400) |
| success | #10b981 | Positive trends (emerald-500) |
| warning | #f59e0b | Pending states (amber-500) |
| destructive | #ef4444 | Errors, absences (red-500) |

### Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| background | #020617 | Page base (slate-950) |
| surface | #0f172a | Card backgrounds (slate-900) |
| primary | #818cf8 | Primary actions (indigo-400) |
| primary-hover | #a5b4fc | Hover state (indigo-300) |
| secondary | #1e293b | Subtle backgrounds (slate-800) |
| muted | #334155 | Borders, dividers (slate-700) |
| text-primary | #f1f5f9 | Headings (slate-100) |
| text-secondary | #94a3b8 | Descriptions (slate-400) |
| text-muted | #64748b | Placeholders (slate-500) |

### Accent Gradients

Used sparingly (8% max opacity for backgrounds):

```css
/* Hero background */
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%) at 8% opacity;

/* Card hover (transitions to 4% on hover) */
background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
```

---

## 2. Typography

### Font Configuration

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
letter-spacing: -0.01em for headings, 0 for body;
```

### Type Scale

| Token | Size | Weight | Color | Usage |
|-------|------|--------|-------|-------|
| xs | 12px | 500 | slate-500 | Badges, timestamps |
| sm | 13px | 400 | slate-600 | Table headers, secondary text |
| base | 14px | 400 | slate-700 | Body text (base) |
| lg | 16px | 500 | slate-800 | Subheadings, labels |
| xl | 18px | 600 | slate-900 | Section titles |
| 2xl | 20px | 700 | slate-900 | Page titles |
| 3xl | 24px | 700 | slate-900 | Dashboard values |
| 4xl | 30px | 700 | slate-900 | Hero text |

---

## 3. Sidebar & Navigation

### Dimensions

| State | Width | Icon Size | Label |
|-------|-------|----------|-------|
| Collapsed (desktop) | 56px | 20px | Hidden, tooltip on hover |
| Expanded (desktop) | 240px | 20px | Visible beside icon |
| Mobile drawer | 100% | 24px | Full labels |

### Visual Treatment

**Collapsed State:**
- Transparent background with right border
- Indigo dot indicator for active item
- Tooltip appears on hover (200ms delay)

**Expanded State:**
- Background: slate-50 (light) / slate-900 (dark)
- Section labels: 11px / 600 / slate-400, uppercase, 0.1em tracking

**Item States:**
```
Default: bg-transparent, text-slate-600
Hover: bg-indigo-50 (light) / bg-indigo-950 (dark)
Active: text-indigo-600, left border 3px indigo-500
```

### Transition Timing

- Width change: 200ms ease-out
- Mobile drawer: 300ms ease-out slide-in

### Navigation Structure

| Section | Items |
|---------|-------|
| MAIN | Dashboard |
| MANAGEMENT | Students, Teachers, Classes |
| OPERATIONS | Attendance, Fees |

### Mobile Behavior

- Sidebar hidden by default on mobile
- Hamburger button opens full-screen drawer
- Backdrop blur overlay
- Close on backdrop tap or swipe gesture

---

## 4. Dashboard Cards

### Stat Card Structure

```
┌─────────────────────────────────────┐
│  [Icon]                    [Trend]  │  ← 20px padding, flex row
│                                     │
│  1,234                              │  ← 3xl font, 700 weight
│  Total Students                     │  ← sm font, slate-500
│  +5% from last month                │  ← xs font, green/red
└─────────────────────────────────────┘
```

### Stat Card Styling

```css
/* Base */
background: white;
border: 1px solid slate-200;
border-radius: 12px;
padding: 20px;
box-shadow: 0 1px 3px rgba(0,0,0,0.04);

/* Hover */
box-shadow: 0 4px 12px rgba(99,102,241,0.08);
transform: translateY(-1px);
transition: 150ms ease-out;
```

### Icon Badge (32x32px)

```css
background: indigo-50;
border-radius: 8px;
icon-color: indigo-600;
```

### Grid Layout

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| lg+ | 4 | 16px |
| md | 2 | 16px |
| sm | 1 | 12px |

### Dashboard Layout (Admin)

```
┌──────────────────────────────────────────────────────┐
│  Good morning, Admin                        May 10    │
│  Here's what's happening today                      │
├──────────────────────────────────────────────────────┤
│  [Card]  [Card]  [Card]  [Card]                     │  ← Stats
├──────────────────────────────────────────────────────┤
│  ┌────────────────────┐  ┌────────────────────┐      │
│  │ Pending Fees       │  │ Recent Activity     │      │  ← Content
│  │                    │  │                     │      │
│  └────────────────────┘  └────────────────────┘      │
└──────────────────────────────────────────────────────┘
```

---

## 5. Tables & Data Display

### Table Styling

```css
background: white;
border: 1px solid slate-200;
border-radius: 12px;
overflow: hidden;
```

### Header Row

```css
background: slate-50;
font: 13px / 500 / slate-500;
text-transform: uppercase;
letter-spacing: 0.05em;
padding: 12px 16px;
border-bottom: 1px solid slate-200;
```

### Row Behavior

```css
padding: 14px 16px;
border-bottom: 1px solid slate-100;
transition: background 100ms;
hover: bg-slate-50;
```

### Status Badges

```css
border-radius: 9999px; /* Full rounded */
padding: 2px 10px;
font-size: 12px;
font-weight: 500;
```

| Status | Background | Text | Border |
|--------|------------|------|--------|
| Paid/Present | emerald-50 | emerald-700 | emerald-200 |
| Pending/Late | amber-50 | amber-700 | amber-200 |
| Overdue/Absent | red-50 | red-700 | red-200 |

### Empty State

```
Icon: 48x48, slate-300
Title: 18px / 600 / slate-900
Description: 14px / 400 / slate-500, max-width 280px
Button: Primary indigo
```

### Loading Skeleton

```css
background: linear-gradient(90deg, slate-200, white, slate-200);
background-size: 200% 100%;
animation: shimmer 1.5s infinite;
```

---

## 6. Login Page

### Split-Screen Layout

**Left Panel (40%):**
- Background: subtle gradient mesh (slate-50 → indigo-50 at 15% opacity)
- Optional: dot grid pattern at 3% opacity
- Content: logo, tagline, abstract geometric illustration, feature list

**Right Panel (60%):**
- Form: email + password inputs, sign-in button
- Demo credentials box below form

### Form Styling

```css
input-height: 44px;
border-radius: 10px;
border: 1px solid slate-200;
focus-ring: indigo-500 ring-2 ring-offset-2;
padding: 12px 14px;
font-size: 14px;
```

### Demo Credentials Box

```css
background: slate-50;
border: 1px dashed slate-300;
border-radius: 8px;
padding: 16px;
font-size: 13px;
color: slate-600;
```

### Mobile Behavior

- Stack vertically
- Hide left panel
- Gradient header bar replaces branding
- Full-width form

---

## 7. Animations

### Timing

| Animation | Duration | Easing |
|-----------|----------|--------|
| Sidebar collapse | 200ms | ease-out |
| Card hover lift | 150ms | ease-out |
| Button press | 100ms | ease-out |
| Modal open | 200ms | ease-out |
| Toast slide-in | 200ms | ease-out |
| Skeleton shimmer | 1.5s | infinite |

### Principles

- Fast and functional, not decorative
- No heavy page transitions
- No bouncy/spring animations
- No continuous motion
- All animations wrapped in `@media (prefers-reduced-motion: reduce)`

---

## 8. Spacing System

### 4px Grid

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0px | |
| 1 | 4px | |
| 2 | 8px | Related items |
| 3 | 12px | Compact inputs |
| 4 | 16px | Standard padding |
| 5 | 20px | |
| 6 | 24px | Section gaps |
| 8 | 32px | |
| 10 | 40px | |
| 12 | 48px | |
| 16 | 64px | |

---

## 9. Accessibility

### Contrast Ratios

- Primary button: 4.5:1 minimum
- Body text: 4.5:1 minimum
- Secondary text: 3:1 (large text only)

### Focus States

```css
focus-visible: outline indigo-500 ring-2 ring-offset-2;
```

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Role-Based Dashboards

### Admin Dashboard

- 4 stat cards: Students, Teachers, Classes, Attendance rate
- 2 content panels: Pending Fees, Recent Activity

### Teacher Dashboard

- 3 stat cards: Assigned Classes, Attendance Today, Pending Reviews
- 2 content panels: Today's Schedule, Recent Messages

### Parent Dashboard

- 3 stat cards: Children, Attendance Rate, Pending Fees
- 2 content panels: Children's Progress, Recent Notifications

### Student Dashboard

- 2 stat cards: Attendance, Outstanding Fees
- 2 content panels: Assignments, Class Schedule
