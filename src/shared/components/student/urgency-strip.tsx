import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Info, ChevronDown, ChevronUp, X } from 'lucide-react';
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
  const [expanded, setExpanded] = useState(false);
  const dismissedIds = new Set<string>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  );

  const visible = items
    .filter((item) => !dismissedIds.has(item.id))
    .slice(0, MAX_VISIBLE);
  const overflow = items.filter((item) => !dismissedIds.has(item.id)).length - MAX_VISIBLE;

  if (visible.length === 0) return null;

  const dismiss = (id: string) => {
    dismissedIds.add(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...dismissedIds]));
    // Force re-render by updating state
    setExpanded((v) => !v);
    setExpanded((v) => !v);
  };

  return (
    <div className={cn('space-y-1', className)}>
      {visible.map((item) => {
        const iconClass =
          item.urgency === 'high'
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
        const Icon = item.urgency === 'high' ? AlertCircle : Info;

        const content = (
          <div className="flex items-center gap-2.5 rounded-lg border bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <div className={cn('flex h-7 w-7 items-center justify-center rounded-full', iconClass)}>
              <Icon className="h-4 w-4" />
            </div>
            <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
              {item.label}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dismiss(item.id);
              }}
              className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );

        if (item.href) {
          return (
            <Link key={item.id} to={item.href}>
              {content}
            </Link>
          );
        }

        return <div key={item.id}>{content}</div>;
      })}

      {overflow > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
          {overflow} more
        </button>
      )}
    </div>
  );
}
