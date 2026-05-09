import { useStudentStats } from '../hooks/use-dashboard-stats';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { BookOpen, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';

export function StudentDashboard() {
  const { data: stats, isLoading } = useStudentStats();

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
          title="Classes"
          value={stats?.myClasses || 0}
          icon={BookOpen}
          description="Scheduled for today"
        />
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-indigo-500/10 rounded-full blur-2xl" />
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Next Class</span>
            </div>
          </CardHeader>
          <CardContent>
            {stats?.nextClass ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{stats.nextClass.subject}</p>
                  <p className="text-xs text-slate-500 font-medium italic mt-0.5">
                    {stats.nextClass.className} • <span className="text-indigo-600 dark:text-indigo-400 font-bold">{stats.nextClass.time}</span>
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 border flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 font-medium">No more classes today. Time for homework! 📚</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Don&apos;t miss these important dates</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {stats?.upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{event.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium italic">{event.date}</p>
                </div>
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight px-2 bg-white dark:bg-slate-950">
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}