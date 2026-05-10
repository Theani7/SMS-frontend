export function AnnouncementsList() {
  const announcements = [
    {
      id: '1',
      category: 'Campus',
      content: 'Annual Sports Meet shifted to next Friday due to weather forecasts.',
      type: 'primary',
    },
    {
      id: '2',
      category: 'Library',
      content: 'New digital resources for Calculus are now available on the portal.',
      type: 'secondary',
    },
  ];

  return (
    <section className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm">
      <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
        Latest Updates
      </h2>
      <div className="space-y-4">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            className={item.type === 'primary' 
              ? "p-3 rounded-lg bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30" 
              : "p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800"
            }
          >
            <p className={item.type === 'primary' 
              ? "text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1" 
              : "text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1"
            }>
              {item.category}
            </p>
            <p className="text-[12px] font-medium text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
