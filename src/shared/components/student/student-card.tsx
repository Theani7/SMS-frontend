import { type ReactNode, type MouseEvent } from 'react';
import { cn } from '../../lib/utils';

type Urgency = 'overdue' | 'warning' | 'calm';
type Density = 'compact' | 'standard';

interface StudentCardProps {
  urgency?: Urgency;
  density?: Density;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const urgencyClasses: Record<Urgency, string> = {
  overdue:
    'border-l-4 border-l-red-500 dark:border-l-red-500 hover:border-l-red-600 dark:hover:border-l-red-400',
  warning:
    'border-l-4 border-l-amber-500 dark:border-l-amber-500 hover:border-l-amber-600 dark:hover:border-l-amber-400',
  calm:
    'border-l-4 border-l-emerald-500 dark:border-l-emerald-500 hover:border-l-emerald-600 dark:hover:border-l-emerald-400',
};

const densityClasses: Record<Density, string> = {
  compact: 'p-3',
  standard: 'p-4',
};

export function StudentCard({
  urgency = 'calm',
  density = 'standard',
  onClick,
  action,
  children,
  className,
}: StudentCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-800 transition-all cursor-pointer',
        urgencyClasses[urgency],
        densityClasses[density],
        onClick && 'hover:shadow-md dark:hover:shadow-slate-700/50 active:scale-[0.99]',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">{children}</div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
