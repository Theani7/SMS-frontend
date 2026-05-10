import { useAdminStats } from '../hooks/use-dashboard-stats';
import { MetricCard } from '../../../shared/components/data-display/metric-card';
import { DashboardGrid } from '../../../shared/components/layout/dashboard-grid';
import { AttendancePulse } from './attendance-pulse';
import { RevenueMatrix } from './revenue-matrix';
import { ActionVault } from './action-vault';
import { ActivityStream } from './activity-stream';

export function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="space-y-6">
            <ActionVault />
            <ActivityStream activities={stats?.recentActivities} />
          </div>
        }
      >
        <AttendancePulse />
        <RevenueMatrix />
      </DashboardGrid>
    </div>
  );
}
