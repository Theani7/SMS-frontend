import { useAnnouncements } from '../../../announcements/hooks/use-announcements';

export function AnnouncementsList() {
  const { announcements, isLoading } = useAnnouncements();
  const recentAnnouncements = (announcements || []).slice(0, 2);

  if (isLoading) {
    return (
      <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Latest Updates
        </h2>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
              <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (recentAnnouncements.length === 0) {
    return (
      <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Latest Updates
        </h2>
        <p className="text-[12px] text-slate-500 dark:text-slate-400 text-center py-4">
          No recent announcements
        </p>
      </section>
    );
  }

  return (
    <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
      <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        Latest Updates
      </h2>
      <div className="space-y-4">
        {recentAnnouncements.map((item, index) => (
          <div
            key={item.id}
            className={index === 0
              ? "p-3 rounded-lg bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30"
              : "p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800"
            }
          >
            <p className={index === 0
              ? "text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1"
              : "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1"
            }>
              {item.category}
            </p>
            <p className="text-[12px] font-medium text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
              {item.content || item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
