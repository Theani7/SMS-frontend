import { Activity } from '../types/dashboard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';
import { UserPlus, DollarSign, Circle, User } from 'lucide-react';
import { formatDate } from '../../../shared/lib/utils';

interface ActivityStreamProps {
  activities?: Activity[];
}

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'student':
      return <UserPlus className="h-3 w-3 text-slate-400" />;
    case 'fee':
      return <DollarSign className="h-3 w-3 text-slate-400" />;
    case 'teacher':
      return <User className="h-3 w-3 text-slate-400" />;
    case 'attendance':
    default:
      return <Circle className="h-3 w-3 text-slate-400" />;
  }
};

export function ActivityStream({ activities = [] }: ActivityStreamProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent Activity</CardTitle>
        <CardDescription className="text-[11px]">Latest events across the school</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="py-2 first:pt-0 last:pb-0">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    <ActivityIcon type={activity.type} />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-[13px] font-medium text-slate-700 dark:text-slate-200 leading-snug">
                      {activity.message}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-[12px] text-slate-500">No recent activities</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
