export function PerformancePulse() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Attendance Pulse
        </h2>
        <div className="flex items-end gap-3">
          <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">96.4%</div>
          <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1.5">+1.2% this month</div>
        </div>
        <div className="flex gap-1.5 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-full rounded bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
            </div>
          ))}
          <div className="h-6 w-full rounded bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]" />
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Grade Average
        </h2>
        <div className="flex items-end gap-3">
          <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">A-</div>
          <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-1.5">Top 15% of Class</div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-2">
            {['A', 'B+', 'A-'].map((grade, i) => (
              <div key={i} className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400">
                {grade}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">Last 3 assessments</span>
        </div>
      </div>
    </section>
  );
}
