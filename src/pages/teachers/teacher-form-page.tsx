import { PageContainer } from '../../shared/components/layout/page-container';
import { TeacherForm } from '../../features/teachers/components/teacher-form';

interface TeacherFormPageProps {
  isEdit?: boolean;
}

export function TeacherFormPage({ isEdit }: TeacherFormPageProps) {
  return (
    <PageContainer
      title={isEdit ? 'Edit Teacher' : 'Add New Teacher'}
      description={isEdit ? 'Update teacher details' : 'Create a new teacher'}
    >
      <TeacherForm />
    </PageContainer>
  );
}