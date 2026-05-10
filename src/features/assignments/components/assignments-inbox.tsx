import { useState } from 'react';
import { useAssignments } from '../hooks/use-assignments';
import { Assignment, AssignmentStatus } from '../types';
import { cn } from '../../../shared/lib/utils';
import { CheckCircle2, Circle, MoreHorizontal, Filter } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';

export function AssignmentsInbox() {
  const { data: assignments, isLoading } = useAssignments();
  const [activeTab, setActiveTab] = useState<AssignmentStatus>('todo');

  const filteredAssignments = assignments?.filter(a => {
    if (activeTab === 'todo') return a.status === 'todo' || a.status === 'in-progress';
    return a.status === activeTab;
  }) || [];

  // Grouping logic (simplified for mockup)
  const overdue = filteredAssignments.filter(a => new Date(a.dueDate) < new Date() && a.status !== 'submitted');
  const upcoming = filteredAssignments.filter(a => new Date(a.dueDate) >= new Date() || a.status === 'submitted');

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex border-b border-slate-200 dark:border-slate-800 w-full sm:w-auto">
          {(['todo', 'submitted'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all relative",
                activeTab === tab 
                  ? "text-indigo-600 dark:text-indigo-400" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
              )}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-semibold">
          <Filter className="h-3.5 w-3.5" />
          All Subjects
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 shadow-soft overflow-hidden">
        {overdue.length > 0 && (
          <>
            <div className="bg-rose-50/30 dark:bg-rose-900/10 px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Overdue</span>
            </div>
            {overdue.map(assignment => (
              <AssignmentRow key={assignment.id} assignment={assignment} />
            ))}
          </>
        )}

        <div className="bg-slate-50/50 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {activeTab === 'submitted' ? 'Recently Completed' : 'Upcoming'}
          </span>
        </div>
        {upcoming.map(assignment => (
          <AssignmentRow key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
}

function AssignmentRow({ assignment }: { assignment: Assignment }) {
  const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status !== 'submitted';

  return (
    <div className="group flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
      <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
        {assignment.status === 'submitted' ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        ) : (
          <Circle className="h-5 w-5 text-slate-300 group-hover:text-indigo-400 transition-colors cursor-pointer" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-[14px] font-medium text-slate-900 dark:text-slate-100 truncate">
            {assignment.title}
          </h3>
          <Badge variant="outline" className="text-[10px] font-bold px-1.5 h-4.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500">
            {assignment.subject}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <p className={cn(
            "text-[12px] font-medium",
            isOverdue ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-500"
          )}>
            {isOverdue ? 'Overdue • ' : ''}
            {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
          {assignment.progress && assignment.status === 'in-progress' && (
            <>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${assignment.progress}%` }} />
                </div>
                <span className="text-[11px] text-slate-400 font-bold">{assignment.progress}%</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {assignment.studentsSubmitted && (
          <div className="hidden md:flex -space-x-1.5 mr-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800 border border-white dark:border-slate-900" />
            ))}
            <div className="text-[10px] text-slate-400 ml-3 flex items-center font-medium">
              +{assignment.studentsSubmitted} submitted
            </div>
          </div>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-all">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="hidden sm:flex h-8 px-3 text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-all border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
          {assignment.status === 'in-progress' ? 'Resume' : assignment.status === 'submitted' ? 'View' : 'Open'}
        </Button>
      </div>
    </div>
  );
}
