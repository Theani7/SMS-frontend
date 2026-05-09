import { PageContainer } from '../../shared/components/layout/page-container';
import { EmptyState } from '../../shared/components/data-display/empty-state';

export function FeesPage() {
  return (
    <PageContainer title="Fees" description="Manage fee payments">
      <EmptyState
        title="No fee records"
        description="Fee management coming soon"
      />
    </PageContainer>
  );
}