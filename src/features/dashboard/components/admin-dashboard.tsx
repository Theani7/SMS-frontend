import { useAdminStats } from '../hooks/use-dashboard-stats';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { Users, GraduationCap, BookOpen, ClipboardCheck, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { formatDate } from '../../../shared/lib/utils';

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Good morning, Admin</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening at your school today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={Users}
          description="Active enrollment"
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Total Teachers"
          value={stats?.totalTeachers || 0}
          icon={GraduationCap}
          description="Active staff"
        />
        <StatCard
          title="Total Classes"
          value={stats?.totalClasses || 0}
          icon={BookOpen}
          description="Across all grades"
        />
        <StatCard
          title="Today&apos;s Attendance"
          value={`${stats?.todayAttendance || 0}%`}
          icon={ClipboardCheck}
          description="Present rate"
          trend={{ value: 2, positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <DollarSign className="h-5 w-5" />
              Pending Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.pendingFees || 0}</p>
            <p className="text-sm text-muted-foreground">students with pending fees</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recentActivities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 text-sm">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}