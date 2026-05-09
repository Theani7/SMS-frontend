import { PageContainer } from '../../shared/components/layout/page-container';
import { FeeForm } from '../../features/fees/components/fee-form';

export function FeeFormPage() {
  return (
    <PageContainer title="Add Fee" description="Create a new fee record">
      <FeeForm />
    </PageContainer>
  );
}