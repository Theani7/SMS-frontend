import { useParentStats } from '../hooks/use-dashboard-stats';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { Users, DollarSign, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';
import { cn } from '../../../shared/lib/utils';

export function ParentDashboard() {
  const { data: stats, isLoading } = useParentStats();

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg" />
        ))}
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Children"
          value={stats?.childrenCount || 0}
          icon={Users}
          description="Enrolled students"
        />
        <StatCard
          title="Outstanding Balance"
          value={`$${stats?.totalPendingFees || 0}`}
          icon={DollarSign}
          description="Pending payments"
          trend={{ value: 0, positive: true }}
        />
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Daily status tracking for your children</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats?.recentAttendance.map((att) => (
              <div key={att.studentId} className="flex items-center justify-between p-4 border rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                    {att.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{att.studentName}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{att.date}</p>
                  </div>
                </div>
                <Badge 
                  variant={att.status === 'present' ? 'default' : 'destructive'}
                  className={cn(
                    "text-[10px] px-2 py-0 uppercase tracking-wider font-bold h-5",
                    att.status === 'present' ? 'bg-emerald-500 hover:bg-emerald-600' : ''
                  )}
                >
                  {att.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}