import { useAdminStats } from '../hooks/use-dashboard-stats';
import { MetricCard } from '../../../shared/components/data-display/metric-card';
import { DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';
import { formatDate } from '../../../shared/lib/utils';
import { DashboardGrid } from '../../../shared/components/layout/dashboard-grid';
import { AttendancePulse } from './attendance-pulse';

export function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-muted rounded-xl" />
        ))}
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Students"
          value={stats?.totalStudents || 0}
          description="Total enrolled"
          trend={{ value: 12, positive: true }}
        />
        <MetricCard
          title="Teachers"
          value={stats?.totalTeachers || 0}
          description="Active staff"
          trend={{ value: 2, positive: true }}
        />
        <MetricCard
          title="Classes"
          value={stats?.totalClasses || 0}
          description="Active groups"
        />
        <MetricCard
          title="Attendance"
          value={`${stats?.todayAttendance || 0}%`}
          description="Avg. today"
          trend={{ value: 3, positive: false }}
        />
      </div>

      <DashboardGrid
        sidebar={
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest events from across the school</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivities.slice(0, 4).map((activity, idx) => (
                  <div key={activity.id} className="relative flex items-start gap-4 pb-1 group last:pb-0">
                    {idx !== (stats?.recentActivities.slice(0, 4).length - 1) && (
                      <div className="absolute left-[7px] top-4 w-[1px] h-full bg-slate-200 dark:bg-slate-800 group-last:hidden" />
                    )}
                    <div className="relative mt-1.5 h-[15px] w-[15px] rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-950 z-10" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-200 leading-none">{activity.message}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-500 font-medium italic">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        }
      >
        <AttendancePulse />
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Pending fee payments status</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{stats?.pendingFees || 0}</span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Students pending</span>
            </div>
            <div className="mt-6 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full" 
                style={{ width: '65%' }} 
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 font-medium">65% of fees collected this month</p>
          </CardContent>
        </Card>
      </DashboardGrid>
    </div>
  );
}