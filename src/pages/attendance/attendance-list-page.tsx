import { PageContainer } from '../../shared/components/layout/page-container';
import { AttendanceList } from '../../features/attendance/components/attendance-list';
import { AttendanceHeatmap } from '../../features/attendance/components/attendance-heatmap';
import { AttendanceInsightsComponent } from '../../features/attendance/components/attendance-insights';
import { useAttendanceInsights } from '../../features/attendance/hooks/use-attendance-insights';
import { DashboardGrid } from '../../shared/components/layout/dashboard-grid';
import { ParentShell } from '../../shared/components/parent/parent-shell';
import { useChildrenAttendance } from '../../features/children/hooks/use-children-attendance';
import { useAuthStore } from '../../shared/store/auth-store';

export function AttendancePage() {
  const user = useAuthStore(state => state.user);
  const isParent = user?.role === 'parent';
  const { data: insights, isLoading: insightsLoading } = useAttendanceInsights();
  const { data: parentAttendance, isLoading: parentAttendanceLoading } = useChildrenAttendance();

  if (isParent) {
    return (
      <ParentShell
        title="Attendance"
        breadcrumbs={[{ label: 'Attendance', href: '/attendance' }]}
      >
        <div className="space-y-6">
          {parentAttendanceLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-50 dark:bg-slate-900 rounded-xl" />
              ))}
            </div>
          ) : parentAttendance?.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              No attendance records found for your children.
            </div>
          ) : (
            <AttendanceList showChildColumn={true} attendance={parentAttendance} />
          )}
        </div>
      </ParentShell>
    );
  }

  return (
    <PageContainer
      title="Attendance"
      description="Analyze your presence trends and subject-level compliance."
      withMesh={true}
    >
      <div className="space-y-8">
        {!insightsLoading && insights && (
          <DashboardGrid sidebar={<AttendanceInsightsComponent insights={insights} />}>
            <AttendanceHeatmap data={insights.monthlyHeatmap} />
            <div className="mt-8">
              <AttendanceList />
            </div>
          </DashboardGrid>
        )}

        {insightsLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
            <div className="lg:col-span-8 h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
            <div className="lg:col-span-4 space-y-4">
              <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
              <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}