import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ParentShellProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  className?: string;
  urgencyCount?: number;
}

export function ParentShell({ title, breadcrumbs, children, className, urgencyCount = 0 }: ParentShellProps) {

  return (
    <div className={cn('flex flex-col gap-4 lg:gap-6 p-4 lg:p-6', className)}>
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] font-medium">
          <Link to="/" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Home className="h-3.5 w-3.5" />
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-900 dark:text-slate-100">{crumb.label}</span>
              ) : (
                <Link to={crumb.href} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Page header */}
      <div className="flex items-center gap-3">
        <h1 className="text-[22px] font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        {urgencyCount > 0 && (
          <span className="rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 px-2 py-0.5 text-[11px] font-bold">
            {urgencyCount}
          </span>
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}