import { cn } from '../../lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    positive: boolean;
  };
  description?: string;
  className?: string;
}

export function MetricCard({ title, value, trend, description, className }: MetricCardProps) {
  return (
    <div className={cn(
      "p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl shadow-sm flex flex-col justify-between min-h-[110px]",
      "transition-all duration-150 ease-out hover:border-indigo-500/30 hover:shadow-md hover:-translate-y-0.5",
      className
    )}>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums tracking-tight">
            {value}
          </span>
          {trend && (
            <span className={cn(
              "flex items-center gap-0.5 text-[10px] font-bold",
              trend.positive ? "text-emerald-600" : "text-red-600"
            )}>
              {trend.positive ? <TrendingUp aria-hidden="true" className="h-2.5 w-2.5" /> : <TrendingDown aria-hidden="true" className="h-2.5 w-2.5" />}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex items-end justify-between">
        {description && (
          <span className="text-[10px] text-slate-400 font-medium">
            {description}
          </span>
        )}
        {/* Sparkline Placeholder */}
        <div className="h-6 w-16 opacity-20">
          <svg viewBox="0 0 64 24" fill="none" className="w-full h-full text-slate-400">
            <path 
              d="M0 12C8 12 12 4 20 4C28 4 36 20 44 20C52 20 56 12 64 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              className={trend?.positive ? "text-emerald-500" : "text-slate-400"}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
