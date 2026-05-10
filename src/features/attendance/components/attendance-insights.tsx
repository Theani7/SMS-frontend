import { AttendanceInsights } from '../types/attendance';
import { cn } from '../../../shared/lib/utils';
import { Badge } from '../../../shared/components/ui/badge';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AttendanceInsightsProps {
  insights: AttendanceInsights;
}

export function AttendanceInsightsComponent({ insights }: AttendanceInsightsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-emerald-500';
      case 'good': return 'bg-indigo-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50';
      case 'good': return 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50';
      case 'warning': return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50';
      case 'critical': return 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Card */}
      <div className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-soft flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Presence</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{insights.overallPercentage}%</h2>
            <Badge variant="outline" className={cn("text-[10px] h-5 font-bold uppercase tracking-widest px-2", getStatusBadgeColor(insights.status))}>
              {insights.status}
            </Badge>
          </div>
        </div>
        <div className="h-12 w-12 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
          <svg className="h-full w-full absolute -rotate-90" viewBox="0 0 36 36">
            <path
              className={cn("stroke-current", 
                insights.status === 'excellent' ? 'text-emerald-500' : 
                insights.status === 'good' ? 'text-indigo-500' : 
                insights.status === 'warning' ? 'text-amber-500' : 'text-rose-500'
              )}
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${insights.overallPercentage}, 100`}
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="text-[10px] font-black text-slate-400 uppercase">Avg</span>
        </div>
      </div>

      {/* Subject Breakdown Sidebar-style inside grid */}
      <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-soft">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">Subject Compliance</h3>
        <div className="space-y-6">
          {insights.subjectBreakdown.map((subject) => (
            <div key={subject.subject} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{subject.subject}</span>
                  {subject.status === 'critical' || subject.status === 'warning' ? (
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-xs font-black",
                    subject.status === 'critical' ? "text-rose-500" : 
                    subject.status === 'warning' ? "text-amber-500" : "text-slate-900 dark:text-slate-100"
                  )}>
                    {subject.percentage}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000", getStatusColor(subject.status))} 
                  style={{ width: `${subject.percentage}%` }} 
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  {subject.present} / {subject.totalClasses} Classes
                </p>
                {subject.status === 'warning' || subject.status === 'critical' && (
                  <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter">Action Required</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
