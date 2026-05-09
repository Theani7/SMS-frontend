import { PageContainer } from '../../shared/components/layout/page-container';
import { AttendanceForm } from '../../features/attendance/components/attendance-form';

export function AttendanceMarkPage() {
  return (
    <PageContainer
      title="Mark Attendance"
      description="Record daily attendance for students"
    >
      <div className="max-w-xl">
        <AttendanceForm />
      </div>
    </PageContainer>
  );
}
