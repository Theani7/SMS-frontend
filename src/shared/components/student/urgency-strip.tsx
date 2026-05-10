import { Link } from 'react-router-dom';
import { AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface UrgencyItem {
  id: string;
  label: string;
  urgency: 'high' | 'info';
  href?: string;
}

interface UrgencyStripProps {
  items: UrgencyItem[];
  className?: string;
}

const STORAGE_KEY = 'student-urgency-dismissed';
const MAX_VISIBLE = 3;

export function UrgencyStrip({ items, className }: UrgencyStripProps) {
  const dismissedIds = new Set<string>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  );

  const visible = items
    .filter((item) => !dismissedIds.has(item.id))
    .slice(0, MAX_VISIBLE);
  const overflowCount = Math.max(
    0,
    items.filter((item) => !dismissedIds.has(item.id)).length - MAX_VISIBLE
  );

  if (visible.length === 0) return null;

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map((i) => i.id)));
    // Force re-render
    window.location.reload();
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100',
        className
      )}
    >
      {visible.map((item) => {
        const iconClass =
          item.urgency === 'high'
            ? 'text-red-600 dark:text-red-400'
            : 'text-blue-600 dark:text-blue-400';
        const Icon = item.urgency === 'high' ? AlertCircle : Info;

        const pill = (
          <span
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-bold bg-white dark:bg-slate-800',
              item.urgency === 'high'
                ? 'border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                : 'border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
            )}
          >
            <Icon className={cn('h-3 w-3', iconClass)} />
            {item.label}
          </span>
        );

        if (item.href) {
          return (
            <Link key={item.id} to={item.href}>
              {pill}
            </Link>
          );
        }

        return <span key={item.id}>{pill}</span>;
      })}

      {overflowCount > 0 && (
        <span className="text-[11px] font-bold text-slate-400">+{overflowCount} more</span>
      )}

      <button
        onClick={handleDismiss}
        aria-label="Dismiss urgency strip"
        className="ml-auto flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}