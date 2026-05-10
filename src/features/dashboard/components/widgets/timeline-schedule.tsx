import { cn } from '../../../../shared/lib/utils';

interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  room: string;
  teacher: string;
  status: 'now' | 'upcoming';
}

const MOCK_SCHEDULE: ScheduleItem[] = [
  {
    id: '1',
    subject: 'Mathematics',
    time: '09:00',
    room: 'Room 402',
    teacher: 'Dr. Sarah Jenkins',
    status: 'now',
  },
  {
    id: '2',
    subject: 'Break',
    time: '10:30',
    room: 'Student Lounge',
    teacher: '-',
    status: 'upcoming',
  },
  {
    id: '3',
    subject: 'Advanced Physics',
    time: '11:00',
    room: 'Lab 2',
    teacher: 'Prof. Miller',
    status: 'upcoming',
  },
];

export function TimelineSchedule() {
  return (
    <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
      <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        Today’s Schedule
      </h2>
      <div className="space-y-4">
        {MOCK_SCHEDULE.map((item, index) => (
          <div key={item.id} className="flex gap-4 relative">
            {index !== MOCK_SCHEDULE.length - 1 && (
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
                {item.room} {item.teacher !== '-' && `• ${item.teacher}`}
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
