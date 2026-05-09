import { useTeacherStats } from '../hooks/use-dashboard-stats';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { BookOpen, Users, ClipboardCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';

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
          description="Classes today"
        />
        <StatCard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={Users}
          description="Across all classes"
        />
        <StatCard
          title="Attendance"
          value={stats?.pendingAttendance || 0}
          icon={ClipboardCheck}
          description="Pending marking"
          trend={{ value: 5, positive: false }}
        />
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
              <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Your schedule for the rest of the day</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {stats?.upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-4 border rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white leading-none">{cls.subject}</p>
                  <p className="text-xs text-slate-500 font-medium italic">{cls.className}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border shadow-sm">
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{cls.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}