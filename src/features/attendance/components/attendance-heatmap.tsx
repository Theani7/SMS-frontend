import { AttendanceInsights } from '../types/attendance';
import { cn } from '../../../shared/lib/utils';

interface AttendanceHeatmapProps {
  data: AttendanceInsights['monthlyHeatmap'];
}

export function AttendanceHeatmap({ data }: AttendanceHeatmapProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
      case 'absent': return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]';
      case 'late': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-soft">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-[13px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">Monthly Presence</h3>
          <p className="text-[10px] text-slate-500 font-medium">Last 30 Days Heatmap</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Present</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Absent</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2">
        {data.map((day, i) => (
          <div 
            key={i}
            title={`${day.date}: ${day.status}`}
            className={cn(
              "h-6 w-full rounded-md transition-all duration-300 hover:scale-110 cursor-pointer",
              getStatusColor(day.status)
            )} 
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
        <div className="flex gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Current Streak</p>
            <p className="text-sm font-black text-slate-900 dark:text-slate-100">12 Days 🔥</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Best Streak</p>
            <p className="text-sm font-black text-slate-500 dark:text-slate-400">24 Days</p>
          </div>
        </div>
        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">View History →</span>
      </div>
    </div>
  );
}
