import { PageContainer } from '../../shared/components/layout/page-container';
import { StudentForm } from '../../features/students/components/student-form';

interface StudentFormPageProps {
  isEdit?: boolean;
}

export function StudentFormPage({ isEdit }: StudentFormPageProps) {
  return (
    <PageContainer
      title={isEdit ? 'Edit Student' : 'Add New Student'}
      description={isEdit ? 'Update student details' : 'Create a new student'}
    >
      <StudentForm />
    </PageContainer>
  );
}