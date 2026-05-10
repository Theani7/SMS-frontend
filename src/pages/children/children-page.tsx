import { useChildren } from '../../features/children/hooks/use-children';
import { useChildrenFees } from '../../features/children/hooks/use-children-fees';
import { useChildrenAttendance } from '../../features/children/hooks/use-children-attendance';
import { ParentShell } from '../../shared/components/parent';
import { ChildCard } from '../../shared/components/parent';

export function ChildrenPage() {
  const { data: children, isLoading } = useChildren();
  const { data: fees } = useChildrenFees();
  const { data: attendance } = useChildrenAttendance();

  // Enrich children with urgency indicators
  const enrichedChildren = (children || []).map(child => {
    const childFees = (fees || []).filter(f => f.studentId === child.id);
    const childAttendance = (attendance || []).filter(a => a.studentId === child.id);
    return {
      ...child,
      hasOverdueFees: childFees.some(f => f.status === 'pending'),
      hasRecentAbsence: childAttendance.some(a => a.status === 'absent'),
    };
  });

  if (isLoading) {
    return (
      <ParentShell title="Children">
        <div className="grid gap-3">
          {[1, 2].map(i => (
            <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </ParentShell>
    );
  }

  if (enrichedChildren.length === 0) {
    return (
      <ParentShell title="Children">
        <div className="text-center py-12">
          <p className="text-[13px] text-slate-500 dark:text-slate-400">No children linked to your account</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Contact the school to link your children</p>
        </div>
      </ParentShell>
    );
  }

  return (
    <ParentShell title="Children">
      <div className="grid gap-3 sm:grid-cols-2">
        {enrichedChildren.map(child => (
          <ChildCard key={child.id} child={child} />
        ))}
      </div>
    </ParentShell>
  );
}
