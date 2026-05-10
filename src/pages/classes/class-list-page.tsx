import { PageContainer } from '../../shared/components/layout/page-container';
import { ClassList } from '../../features/classes/components/class-list';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/lib/constants';

export function ClassesPage() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Classes"
      description="Manage class schedules and assignments"
      withMesh={true}
    >
      <ClassList onAddNew={() => navigate(`${ROUTES.CLASSES}/new`)} />
    </PageContainer>
  );
}