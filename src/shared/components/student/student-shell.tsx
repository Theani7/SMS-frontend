import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { UrgencyStrip, type UrgencyItem } from './urgency-strip';
import { cn } from '../../lib/utils';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ActionZone {
  label: string;
  onClick: () => void;
  mobile?: boolean;
  actionHeavy?: boolean;
}

interface StudentShellProps {
  title: string;
  urgencyItems?: UrgencyItem[];
  breadcrumbs?: Breadcrumb[];
  actionZone?: ActionZone;
  mobile?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function StudentShell({
  title,
  urgencyItems = [],
  breadcrumbs = [],
  actionZone,
  mobile = false,
  children,
  className,
}: StudentShellProps) {
  const urgencyCount = urgencyItems.length;

  return (
    <div className={cn('flex flex-col gap-4 lg:gap-6 p-4 lg:p-6', className)}>
      {/* Breadcrumb trail */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Home className="h-3 w-3" />
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600" />
              {crumb.href && !mobile ? (
                <Link to={crumb.href} className="hover:text-slate-700 dark:hover:text-slate-200">
                  {crumb.label}
                </Link>
              ) : (
                <span className={cn(i === breadcrumbs.length - 1 && 'text-slate-700 dark:text-slate-200')}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Urgency Strip */}
      {urgencyItems.length > 0 && (
        <UrgencyStrip items={urgencyItems} />
      )}

      {/* Page header */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h1>
        {urgencyCount > 0 && (
          <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-100 px-2 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {urgencyCount}
          </span>
        )}
      </div>

      {/* Page content */}
      <div className="flex-1">{children}</div>

      {/* Sticky bottom action zone */}
      {actionZone && (mobile || actionZone.mobile !== false) && (
        <div
          className={cn(
            'sticky bottom-0 mt-6 border-t border-slate-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900',
            actionZone.actionHeavy ? 'pb-6 pt-5' : ''
          )}
        >
          <Button
            className={cn('w-full', actionZone.actionHeavy && 'h-12 text-base font-semibold')}
            onClick={actionZone.onClick}
          >
            {actionZone.label}
          </Button>
        </div>
      )}
    </div>
  );
}