import { PageContainer } from '../../shared/components/layout/page-container';
import { TeacherList } from '../../features/teachers/components/teacher-list';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/lib/constants';

export function TeachersPage() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Teachers"
      description="Manage teacher records"
      withMesh={true}
    >
      <TeacherList onAddNew={() => navigate(`${ROUTES.TEACHERS}/new`)} />
    </PageContainer>
  );
}