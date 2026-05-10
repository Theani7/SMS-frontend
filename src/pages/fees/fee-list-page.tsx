import { PageContainer } from '../../shared/components/layout/page-container';
import { FeeList } from '../../features/fees/components/fee-list';
import { FeeProgress } from '../../features/fees/components/fee-progress';
import { DashboardGrid } from '../../shared/components/layout/dashboard-grid';
import { useFees } from '../../features/fees/hooks/use-fees';
import { useMemo } from 'react';

export function FeesPage() {
  const { data: fees, isLoading } = useFees();

  const stats = useMemo(() => {
    if (!fees) return { total: 0, paid: 0 };
    const total = fees.reduce((acc, f) => acc + f.amount, 0);
    const paid = fees.filter(f => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0);
    return { total, paid };
  }, [fees]);

  return (
    <PageContainer
      title="Finances"
      description="Track your tuition payments, lab fees, and itemized transaction history."
      withMesh={true}
    >
      {!isLoading && (
        <DashboardGrid sidebar={<FeeProgress totalFees={stats.total + 1200} paidFees={stats.paid} nextDueDate="2026-05-15" />}>
          <FeeList />
        </DashboardGrid>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
          <div className="lg:col-span-8 h-[600px] bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          <div className="lg:col-span-4 space-y-4">
            <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      )}
    </PageContainer>
  );
}