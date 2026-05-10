import { PageContainer } from '../../shared/components/layout/page-container';
import { AttendanceList } from '../../features/attendance/components/attendance-list';
import { AttendanceHeatmap } from '../../features/attendance/components/attendance-heatmap';
import { AttendanceInsightsComponent } from '../../features/attendance/components/attendance-insights';
import { useAttendanceInsights } from '../../features/attendance/hooks/use-attendance-insights';
import { DashboardGrid } from '../../shared/components/layout/dashboard-grid';

export function AttendancePage() {
  const { data: insights, isLoading: insightsLoading } = useAttendanceInsights();

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
