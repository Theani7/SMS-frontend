import { PageContainer } from '../../shared/components/layout/page-container';
import { FeeList } from '../../features/fees/components/fee-list';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/lib/constants';

export function FeesPage() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Fees"
      description="Manage fee payments and records"
    >
      <FeeList onAddNew={() => navigate(`${ROUTES.FEES}/new`)} />
    </PageContainer>
  );
}