import { useChildren } from '../../../features/children/hooks/use-children';
import { useChildrenFees } from '../../../features/children/hooks/use-children-fees';
import { useChildrenAttendance } from '../../../features/children/hooks/use-children-attendance';
import { ParentShell } from '../../../shared/components/parent';
import { ChildCard } from '../../../shared/components/parent';
import { StatCard } from '../../../shared/components/data-display/stat-card';
import { UrgencyStrip } from '../../../shared/components/student';
import { DollarSign, ClipboardCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ParentDashboard() {
  const navigate = useNavigate();
  const { data: children, isLoading } = useChildren();
  const { data: fees } = useChildrenFees();
  const { data: attendance } = useChildrenAttendance();

  const enrichedChildren = (children || []).map(child => {
    const childFees = (fees || []).filter(f => f.studentId === child.id);
    const childAttendance = (attendance || []).filter(a => a.studentId === child.id);
    return {
      ...child,
      hasOverdueFees: childFees.some(f => f.status === 'pending'),
      hasRecentAbsence: childAttendance.some(a => a.status === 'absent'),
    };
  });

  const totalPending = (fees || []).filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const absentToday = (attendance || []).filter(a => a.status === 'absent').length;

  const urgencyItems = [
    ...(fees || []).filter(f => f.status === 'pending').map(f => ({
      id: f.id,
      label: `Fee due for ${f.studentName}`,
      urgency: 'high' as const,
      href: '/fees',
    })),
    ...(attendance || []).filter(a => a.status === 'absent').map(a => ({
      id: a.id,
      label: `${a.studentName} absent today`,
      urgency: 'info' as const,
    })),
  ].slice(0, 3);

  if (isLoading) {
    return (
      <ParentShell title="Dashboard">
        <div className="animate-pulse space-y-4">
          <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </ParentShell>
    );
  }

  return (
    <ParentShell title="Dashboard" urgencyCount={urgencyItems.length}>
      {urgencyItems.length > 0 && <UrgencyStrip items={urgencyItems} />}
      <div className="space-y-6">
        {/* Stats row */}
        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            title="Total Pending"
            value={`$${totalPending}`}
            icon={DollarSign}
            description="Outstanding fees"
          />
          <StatCard
            title="Absent Today"
            value={String(absentToday)}
            icon={ClipboardCheck}
            description="Children not in school"
          />
        </div>

        {/* Children grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Your Children
            </h2>
            <button
              onClick={() => navigate('/children')}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View all
            </button>
          </div>
          {enrichedChildren.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-[12px] text-slate-500 dark:text-slate-400">No children enrolled yet</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {enrichedChildren.slice(0, 4).map(child => (
                <ChildCard key={child.id} child={child} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ParentShell>
  );
}
