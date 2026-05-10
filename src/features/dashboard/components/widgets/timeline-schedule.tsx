import { useTimetable } from '../../../timetable/hooks/use-timetable';
import { cn } from '../../../../shared/lib/utils';

interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  room: string;
  teacher: string;
  status: 'now' | 'upcoming';
}

export function TimelineSchedule() {
  const { data: slots, isLoading } = useTimetable();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];

  const todaySlots = (slots || [])
    .filter(slot => slot.day === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 3);

  if (isLoading) {
    return (
      <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Today&apos;s Schedule
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4">
              <div className="h-2 w-2 rounded-full mt-1.5 bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (todaySlots.length === 0) {
    return (
      <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Today&apos;s Schedule
        </h2>
        <p className="text-[12px] text-slate-500 dark:text-slate-400 text-center py-4">
          Enjoy your free time!
        </p>
      </section>
    );
  }

  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const scheduleItems: ScheduleItem[] = todaySlots.map((slot, index) => ({
    id: slot.id,
    subject: slot.subject,
    time: slot.startTime,
    room: slot.room,
    teacher: slot.teacher,
    status: index === 0 && slot.startTime <= now ? 'now' : 'upcoming',
  }));

  return (
    <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
      <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        Today&apos;s Schedule
      </h2>
      <div className="space-y-4">
        {scheduleItems.map((item, index) => (
          <div key={item.id} className="flex gap-4 relative">
            {index !== scheduleItems.length - 1 && (
              <div className="absolute left-1 top-6 bottom-0 w-px bg-slate-100 dark:bg-slate-800" />
            )}
            <div className={cn(
              "h-2 w-2 rounded-full mt-1.5 relative z-10",
              item.status === 'now' ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "bg-slate-200 dark:bg-slate-700"
            )} />
            <div>
              <p className={cn(
                "text-[10px] font-bold uppercase",
                item.status === 'now' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"
              )}>
                {item.status === 'now' ? 'Now • ' : ''}{item.time}
              </p>
              <h4 className="text-[14px] font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                {item.subject}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5 font-medium">
                {item.room} • {item.teacher}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
        View Full Timetable
      </button>
    </section>
  );
}
