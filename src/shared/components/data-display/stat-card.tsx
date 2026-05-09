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
    <Card className={cn("transition-all duration-150 ease-out hover:-translate-y-px hover:shadow-md", "card-hover")}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <p className={cn(
            'text-xs mt-1 flex items-center gap-1',
            trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          )}>
            {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.positive ? '+' : '-'}{trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
