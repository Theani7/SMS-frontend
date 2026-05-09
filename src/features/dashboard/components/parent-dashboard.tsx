import { useParentStats } from '../hooks/use-dashboard-stats';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { Users, DollarSign, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';

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
          title="Your Children"
          value={stats?.childrenCount || 0}
          icon={Users}
          description="Enrolled students"
        />
        <StatCard
          title="Pending Fees"
          value={`$${stats?.totalPendingFees || 0}`}
          icon={DollarSign}
          description="Total pending"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Recent Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentAttendance.map((att) => (
              <div key={att.studentId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{att.studentName}</p>
                  <p className="text-sm text-muted-foreground">{att.date}</p>
                </div>
                <Badge variant={att.status === 'present' ? 'default' : 'destructive'}>
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