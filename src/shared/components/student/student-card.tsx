import { type ReactNode, type MouseEvent } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent } from '../ui/card';

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
  overdue: 'border border-rose-200/60 dark:border-rose-800/60 shadow-soft',
  warning: 'border border-amber-200/60 dark:border-amber-800/60 shadow-soft',
  calm: 'border border-slate-200/60 dark:border-slate-800/60 shadow-soft',
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
    <Card
      className={cn(
        'transition-all cursor-pointer hover:shadow-md dark:hover:shadow-slate-700/50 active:scale-[0.99]',
        urgencyClasses[urgency],
        densityClasses[density],
        onClick && 'hover:shadow-md dark:hover:shadow-slate-700/50',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-start justify-between gap-3 p-0 [&:not(:last-child)]:pb-0">
        <div className="flex-1">{children}</div>
        {action && <div className="shrink-0">{action}</div>
}
      </CardContent>
    </Card>
  );
}