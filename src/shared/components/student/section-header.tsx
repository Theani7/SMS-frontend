import { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  label: string;
  count?: number;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ label, count, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {count !== undefined && count > 0 && (
          <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
            {count}
          </span>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
