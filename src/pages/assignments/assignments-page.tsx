import { PageContainer } from '../../shared/components/layout/page-container';
import { AssignmentsInbox } from '../../features/assignments/components/assignments-inbox';

export function AssignmentsPage() {
  return (
    <PageContainer
      title="Assignments"
      description="Track your academic momentum and clear your work queue."
      withMesh={true}
    >
      <AssignmentsInbox />
    </PageContainer>
  );
}
