import { PageContainer } from '../../shared/components/layout/page-container';
import { EmptyState } from '../../shared/components/data-display/empty-state';

export function AttendancePage() {
  return (
    <PageContainer title="Attendance" description="View attendance records">
      <EmptyState
        title="No attendance records"
        description="Attendance tracking coming soon"
      />
    </PageContainer>
  );
}