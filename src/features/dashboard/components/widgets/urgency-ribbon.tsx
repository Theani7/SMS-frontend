import { Clock } from 'lucide-react';
import { cn } from '../../../../shared/lib/utils';

interface UrgencyItem {
  id: string;
  title: string;
  subject: string;
  dueText: string;
  status: 'critical' | 'warning';
  progress: number;
}

const MOCK_URGENCY: UrgencyItem[] = [
  {
    id: '1',
    title: 'Quantum Mechanics Lab Report',
    subject: 'Physics 101',
    dueText: 'Due in 3h',
    status: 'critical',
    progress: 75,
  },
  {
    id: '2',
    title: 'Industrial Revolution Essay',
    subject: 'History',
    dueText: 'Due Today',
    status: 'warning',
    progress: 25,
  },
];

export function UrgencyRibbon() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Critical Deadlines
        </h2>
        <button className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors">
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_URGENCY.map((item) => (
          <div 
            key={item.id}
            className={cn(
              "p-4 rounded-xl border bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:shadow-md",
              item.status === 'critical' 
                ? "border-rose-100 dark:border-rose-900/30 ring-1 ring-rose-50 dark:ring-0" 
                : "border-amber-100 dark:border-amber-900/30 ring-1 ring-amber-50 dark:ring-0"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                item.status === 'critical' 
                  ? "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" 
                  : "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
              )}>
                {item.dueText}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                {item.subject}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-[14px] leading-tight mb-3">
              {item.title}
            </h3>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  item.status === 'critical' ? "bg-rose-500" : "bg-amber-500"
                )}
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2.5">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {item.status === 'critical' ? '75% of class submitted' : 'Draft Stage'}
              </p>
              <Clock className="h-3 w-3 text-slate-300 dark:text-slate-600" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
