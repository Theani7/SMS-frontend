import { PageContainer } from '../../shared/components/layout/page-container';
import { EmptyState } from '../../shared/components/data-display/empty-state';

export function AttendanceMarkPage() {
  return (
    <PageContainer title="Mark Attendance" description="Record daily attendance">
      <EmptyState
        title="Attendance marking"
        description="Mark attendance form coming soon"
      />
    </PageContainer>
  );
}