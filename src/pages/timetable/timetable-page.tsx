import { PageContainer } from '../../shared/components/layout/page-container';
import { TimetableView } from '../../features/timetable/components/timetable-view';

export function TimetablePage() {
  return (
    <PageContainer 
      title="Class Timetable" 
      description="View and manage your academic schedule and classroom locations."
      withMesh
    >
      <TimetableView />
    </PageContainer>
  );
}
