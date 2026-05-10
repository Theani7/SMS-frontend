import { PageContainer } from '../../shared/components/layout/page-container';
import { StudentList } from '../../features/students/components/student-list';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/lib/constants';

export function StudentsPage() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Students"
      description="Manage student records"
      withMesh={true}
    >
      <StudentList onAddNew={() => navigate(`${ROUTES.STUDENTS}/new`)} />
    </PageContainer>
  );
}