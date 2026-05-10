import { useAuthStore } from '../../../shared/store/auth-store';
import { UrgencyRibbon } from './widgets/urgency-ribbon';
import { NextBestAction } from './widgets/next-best-action';
import { TimelineSchedule } from './widgets/timeline-schedule';
import { AnnouncementsList } from './widgets/announcements-list';
import { QuickFees } from './widgets/quick-fees';
import { PerformancePulse } from './widgets/performance-pulse';
import { DashboardGrid } from '../../../shared/components/layout/dashboard-grid';

export function StudentDashboard() {
  const user = useAuthStore((state) => state.user);
  const firstName = user?.name.split(' ')[0] || 'Alex';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Good morning, {firstName}.
        </h1>
        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">
          You have 2 assignments due today and your first class starts in 45m.
        </p>
      </header>

      {/* Main Grid Layout */}
      <DashboardGrid
        sidebar={
          <div className="space-y-6">
            <TimelineSchedule />
            <AnnouncementsList />
            <QuickFees />
          </div>
        }
      >
        <div className="space-y-8">
          <UrgencyRibbon />
          <NextBestAction />
          <PerformancePulse />
        </div>
      </DashboardGrid>
    </div>
  );
}
