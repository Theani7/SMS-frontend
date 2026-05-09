import { useTeacherStats } from '../hooks/use-dashboard-stats';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { BookOpen, Users, ClipboardCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';

export function TeacherDashboard() {
  const { data: stats, isLoading } = useTeacherStats();

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg" />
        ))}
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="My Classes"
          value={stats?.myClasses || 0}
          icon={BookOpen}
        />
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={Users}
        />
        <StatCard
          title="Pending Attendance"
          value={stats?.pendingAttendance || 0}
          icon={ClipboardCheck}
          description="Needs marking"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{cls.className}</p>
                  <p className="text-sm text-muted-foreground">{cls.subject}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{cls.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}