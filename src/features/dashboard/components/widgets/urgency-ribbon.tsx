import { Clock, ArrowRight, AlertTriangle, Bell, DollarSign } from 'lucide-react';
import { cn } from '../../../../shared/lib/utils';
import { useUrgencySignals } from '../../hooks/use-urgency-signals';
import { useAssignments } from '../../../assignments/hooks/use-assignments';
import { Assignment } from '../../../assignments/types';
import { useNavigate } from 'react-router-dom';

export function UrgencyRibbon() {
  const { signals } = useUrgencySignals();
  const { criticalDeadlines } = useAssignments();
  const navigate = useNavigate();

  const getSignalIcon = (id: string) => {
    if (id.startsWith('ann')) return <Bell className="h-3.5 w-3.5" />;
    if (id.startsWith('att')) return <AlertTriangle className="h-3.5 w-3.5" />;
    if (id.startsWith('fee')) return <DollarSign className="h-3.5 w-3.5" />;
    return <Clock className="h-3.5 w-3.5" />;
  };

  const getDueText = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due.getTime() - now.getTime();
    
    if (diffMs < 0) return 'Overdue';
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `Due in ${diffMins}m`;
    }
    return `Due in ${diffHours}h`;
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Priority Stage
        </h2>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          {criticalDeadlines.length + signals.length} Items
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Deadlines */}
        {criticalDeadlines.map((item: Assignment) => (
          <div 
            key={item.id}
            className={cn(
              "p-4 rounded-xl border bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:shadow-md border-rose-100 dark:border-rose-900/30 ring-1 ring-rose-50 dark:ring-0"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                {getDueText(item.dueDate)}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                {item.subject}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-[14px] leading-tight mb-3">
              {item.title}
            </h3>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-500" 
                style={{ width: `${item.progress || 0}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Assignment</p>
              <button onClick={() => navigate('/assignments')} className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                Open <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}

        {/* Dynamic Signals */}
        {signals.map((signal) => (
          <div 
            key={signal.id}
            className={cn(
              "p-4 rounded-xl border bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:shadow-md",
              signal.type === 'urgent' 
                ? "border-rose-100 dark:border-rose-900/30 ring-1 ring-rose-50 dark:ring-0" 
                : "border-amber-100 dark:border-amber-900/30 ring-1 ring-amber-50 dark:ring-0"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <div className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1.5",
                signal.type === 'urgent' 
                  ? "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" 
                  : "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
              )}>
                {getSignalIcon(signal.id)}
                {signal.title}
              </div>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-[14px] leading-tight mb-3 line-clamp-2">
              {signal.description}
            </h3>
            <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-50 dark:border-slate-800/50">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium capitalize">{signal.type}</p>
              <button onClick={() => navigate(signal.path)} className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                {signal.actionLabel} <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
