import { PageContainer } from '../../shared/components/layout/page-container';
import { EmptyState } from '../../shared/components/data-display/empty-state';

export function StudentsPage() {
  return (
    <PageContainer title="Students" description="Manage student records">
      <EmptyState
        title="No students yet"
        description="Student management coming soon"
      />
    </PageContainer>
  );
}