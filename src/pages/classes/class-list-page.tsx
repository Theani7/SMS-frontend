import { PageContainer } from '../../shared/components/layout/page-container';
import { EmptyState } from '../../shared/components/data-display/empty-state';

export function ClassesPage() {
  return (
    <PageContainer title="Classes" description="Manage class schedules">
      <EmptyState
        title="No classes yet"
        description="Class management coming soon"
      />
    </PageContainer>
  );
}