import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../ui/card';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
        <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 tracking-tight uppercase">{title}</span>
        <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
          <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</div>
        <div className="flex items-center gap-1.5 mt-1.5">
          {trend && (
            <span className={cn(
              'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold',
              trend.positive 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            )}>
              {trend.positive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
              {trend.value}%
            </span>
          )}
          {description && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
