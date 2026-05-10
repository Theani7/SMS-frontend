import { StudentShell } from '../../shared/components/student/student-shell';
import { ParentShell } from '../../shared/components/parent/parent-shell';
import { useUrgencySignals } from '../../shared/hooks/use-urgency-signals';
import { useModulePreview, type ModulePreview } from '../../shared/hooks/use-module-preview';
import { FeeList } from '../../features/fees/components/fee-list';
import { FeeProgress } from '../../features/fees/components/fee-progress';
import { DashboardGrid } from '../../shared/components/layout/dashboard-grid';
import { useFees } from '../../features/fees/hooks/use-fees';
import { useChildrenFees } from '../../features/children/hooks/use-children-fees';
import { useAuthStore } from '../../shared/store/auth-store';
import { CheckCircle } from 'lucide-react';
import { useMemo } from 'react';

export function FeesPage() {
  const urgencyItems = useUrgencySignals();
  const preview: ModulePreview | null = useModulePreview('announcements');
  const { user } = useAuthStore();
  const isParent = user?.role === 'parent';

  const { data: parentFees, isLoading: parentLoading } = useChildrenFees();
  const { data: fees, isLoading } = useFees();

  const displayedFees = isParent ? parentFees : fees;
  const loading = isParent ? parentLoading : isLoading;

  const allPaid = displayedFees && displayedFees.length > 0 && displayedFees.every(f => f.status === 'paid');

  const stats = useMemo(() => {
    if (!displayedFees) return { total: 0, paid: 0 };
    const total = displayedFees.reduce((acc, f) => acc + f.amount, 0);
    const paid = displayedFees.filter(f => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0);
    return { total, paid };
  }, [displayedFees]);

  if (isParent) {
    return (
      <ParentShell title="Finances" breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Finances', href: '/fees' }] as Array<{ label: string; href: string }>}>
        {preview && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-sm">
            <span className="text-blue-600 dark:text-blue-400">📢</span>
            <span className="font-medium text-blue-700 dark:text-blue-300">{preview.label}</span>
          </div>
        )}
        {allPaid && displayedFees && displayedFees.length > 0 && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">All fee payments are up to date</span>
          </div>
        )}
        {!loading && !allPaid && (
          <DashboardGrid sidebar={<FeeProgress totalFees={stats.total + 1200} paidFees={stats.paid} nextDueDate="2026-05-15" />}>
            <FeeList fees={displayedFees} />
          </DashboardGrid>
        )}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
            <div className="lg:col-span-8 h-[600px] bg-slate-100 dark:bg-slate-800 rounded-2xl" />
            <div className="lg:col-span-4 space-y-4">
              <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
              <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
            </div>
          </div>
        )}
      </ParentShell>
    );
  }

  return (
    <StudentShell title="Finances" breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Finances' }]} urgencyItems={urgencyItems}>
      {preview && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-sm">
          <span className="text-blue-600 dark:text-blue-400">📢</span>
          <span className="font-medium text-blue-700 dark:text-blue-300">{preview.label}</span>
        </div>
      )}
      {allPaid && displayedFees && displayedFees.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3">
          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">All fee payments are up to date</span>
        </div>
      )}
      {!loading && !allPaid && (
        <DashboardGrid sidebar={<FeeProgress totalFees={stats.total + 1200} paidFees={stats.paid} nextDueDate="2026-05-15" />}>
          <FeeList fees={displayedFees} />
        </DashboardGrid>
      )}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
          <div className="lg:col-span-8 h-[600px] bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          <div className="lg:col-span-4 space-y-4">
            <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      )}
    </StudentShell>
  );
}
