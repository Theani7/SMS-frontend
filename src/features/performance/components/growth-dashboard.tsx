import { TrajectoryChart } from './trajectory-chart';
import { cn } from '../../../shared/lib/utils';
import { Button } from '../../../shared/components/ui/button';
import { usePerformanceInsights } from '../hooks/use-performance-insights';
import { SectionHeader } from '../../../shared/components/student/section-header';

export function GrowthDashboard() {
  const { data, isLoading } = usePerformanceInsights();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
        <div className="lg:col-span-8 h-96 bg-slate-50 dark:bg-slate-900 rounded-2xl" />
        <div className="lg:col-span-4 h-96 bg-slate-50 dark:bg-slate-900 rounded-2xl" />
      </div>
    );
  }

  const { trajectory = [], subjects = [] } = data || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Current GPA', value: '3.82', change: '↑ 0.15', color: 'text-emerald-600' },
          { label: 'Class Rank', value: '14/120', change: 'Top 12%', color: 'text-slate-500' },
          { label: 'Assessments', value: '24', change: 'Completed', color: 'text-slate-500' },
          { label: 'Attendance', value: '98%', change: 'Excellent', color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-soft">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">{stat.label}</p>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{stat.value}</div>
              <div className={cn("text-[11px] font-bold mb-1", stat.color)}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trajectory Stage */}
        <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-[15px] font-bold text-slate-900 dark:text-slate-100">Academic Trajectory</h2>
              <p className="text-[11px] text-slate-500 font-medium">Term 2 Progress & Projections</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Actual GPA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Projected</span>
              </div>
            </div>
          </div>
          
          <TrajectoryChart data={trajectory} />
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Strongest Subject</p>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Advanced Physics (A+)</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Growth Area</p>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-500">English Literature (B-)</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 font-bold text-xs h-9">
              Detailed Report →
            </Button>
          </div>
        </div>

        {/* Subject Insights Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
            <SectionHeader label="Subject Performance" className="mb-4" />
            <div className="space-y-5">
              {subjects.map((item) => (
                <div key={item.subject}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.subject}</span>
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100">{item.grade}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        item.status === 'excellent' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : 
                        item.status === 'good' ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                      )} 
                      style={{ width: `${item.progress}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              View Assessment History
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-600 dark:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute -right-4 -top-4 h-24 w-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
            <h3 className="text-[15px] font-black mb-1">Personal Projection</h3>
            <p className="text-[12px] text-indigo-100 mb-4 leading-relaxed font-medium">
              If you maintain your current trend, you are on track for a <span className="font-black text-white underline decoration-white/40 underline-offset-4">3.90 GPA</span> by end of term.
            </p>
            <div className="p-3 bg-white/10 dark:bg-black/10 rounded-xl border border-white/20">
              <p className="text-[10px] font-black text-indigo-200 uppercase mb-1">Focus Goal</p>
              <p className="text-xs font-bold leading-snug">Score {'>'} 85% in next English Essay to hit target</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
