import { PageContainer } from '../../shared/components/layout/page-container';
import { EmptyState } from '../../shared/components/data-display/empty-state';

export function TeachersPage() {
  return (
    <PageContainer title="Teachers" description="Manage teacher records">
      <EmptyState
        title="No teachers yet"
        description="Teacher management coming soon"
      />
    </PageContainer>
  );
}