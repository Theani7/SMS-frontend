import { PageContainer } from '../../shared/components/layout/page-container';
import { GrowthDashboard } from '../../features/performance/components/growth-dashboard';

export function PerformancePage() {
  return (
    <PageContainer
      title="Performance Growth"
      description="Analyze your academic trajectory and identify growth areas."
      withMesh={true}
    >
      <GrowthDashboard />
    </PageContainer>
  );
}
