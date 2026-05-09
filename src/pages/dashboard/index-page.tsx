import { PageContainer } from '../../shared/components/layout/page-container';
import { useAuthStore } from '../../shared/store/auth-store';
import { StatCard } from '../../shared/components/data-display/stat-card';
import { Users, GraduationCap, BookOpen, ClipboardCheck } from 'lucide-react';

export function DashboardPage() {
  const { role } = useAuthStore();

  const renderDashboardByRole = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Students"
                value="156"
                icon={Users}
                description="Active enrollment"
                trend={{ value: 5, positive: true }}
              />
              <StatCard
                title="Total Teachers"
                value="24"
                icon={GraduationCap}
                description="Active staff"
              />
              <StatCard
                title="Total Classes"
                value="18"
                icon={BookOpen}
                description="Across all grades"
              />
              <StatCard
                title="Today's Attendance"
                value="94%"
                icon={ClipboardCheck}
                description="Present rate"
                trend={{ value: 2, positive: true }}
              />
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-muted-foreground">Activity feed coming soon...</p>
            </div>
          </>
        );
      case 'teacher':
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="My Classes"
                value="5"
                icon={BookOpen}
              />
              <StatCard
                title="Total Students"
                value="120"
                icon={Users}
              />
              <StatCard
                title="Pending Attendance"
                value="3"
                icon={ClipboardCheck}
                description="Needs marking"
              />
            </div>
          </>
        );
      case 'parent':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Your Children's Overview</h2>
            <p className="text-muted-foreground">Parent dashboard coming soon...</p>
          </>
        );
      case 'student':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Welcome, Student!</h2>
            <p className="text-muted-foreground">Student dashboard coming soon...</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer
      title="Dashboard"
      description={`Welcome back! You're logged in as ${role}`}
    >
      {renderDashboardByRole()}
    </PageContainer>
  );
}