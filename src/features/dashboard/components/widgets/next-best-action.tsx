import { Zap, ChevronRight } from 'lucide-react';

export function NextBestAction() {
  return (
    <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
          <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Next Best Action</h3>
          <p className="text-[12px] text-slate-500 dark:text-slate-400">Based on your upcoming deadlines and free periods</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all group cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
            MAT
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">Complete Calculus Problem Set #4</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Approx. 45m remaining</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
      </div>
    </section>
  );
}
