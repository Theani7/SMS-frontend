import { PageContainer } from '../../shared/components/layout/page-container';
import { useAuthStore } from '../../shared/store/auth-store';
import { AdminDashboard } from '../../features/dashboard/components/admin-dashboard';
import { TeacherDashboard } from '../../features/dashboard/components/teacher-dashboard';
import { ParentDashboard } from '../../features/dashboard/components/parent-dashboard';
import { StudentDashboard } from '../../features/dashboard/components/student-dashboard';

export function DashboardPage() {
  const { role } = useAuthStore();

  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return null;
    }
  };

  return (
    <PageContainer
      title="Dashboard"
      description={`Welcome back! You're logged in as ${role}`}
    >
      {renderDashboard()}
    </PageContainer>
  );
}