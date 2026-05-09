import { PageContainer } from '../../shared/components/layout/page-container';
import { AttendanceList } from '../../features/attendance/components/attendance-list';

export function AttendancePage() {
  return (
    <PageContainer
      title="Attendance"
      description="View and track student attendance records"
    >
      <AttendanceList />
    </PageContainer>
  );
}
