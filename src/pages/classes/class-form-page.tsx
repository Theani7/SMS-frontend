import { PageContainer } from '../../shared/components/layout/page-container';
import { ClassForm } from '../../features/classes/components/class-form';

interface ClassFormPageProps {
  isEdit?: boolean;
}

export function ClassFormPage({ isEdit }: ClassFormPageProps) {
  return (
    <PageContainer
      title={isEdit ? 'Edit Class' : 'Add New Class'}
      description={isEdit ? 'Update class details' : 'Create a new class'}
    >
      <ClassForm />
    </PageContainer>
  );
}