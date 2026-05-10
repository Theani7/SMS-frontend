import { useParams } from 'react-router-dom';
import { ParentShell } from '../../shared/components/parent';
import { SectionHeader } from '../../shared/components/student';
import { Badge } from '../../shared/components/ui/badge';
import { Card, CardContent } from '../../shared/components/ui/card';
import { useChildren } from '../../features/children/hooks/use-children';
import { useChildrenAttendance } from '../../features/children/hooks/use-children-attendance';
import { useChildrenFees } from '../../features/children/hooks/use-children-fees';

export function ChildDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: children } = useChildren();
  const { data: attendance } = useChildrenAttendance(id);
  const { data: fees } = useChildrenFees(id);

  const child = (children || []).find(c => c.id === id);

  const last7Days = (attendance || []).slice(-7).reverse();
  const unpaidFees = (fees || []).filter(f => f.status !== 'paid');
  const pendingFees = (fees || []).filter(f => f.status === 'pending');
  const urgencyCount = pendingFees.length;
  const outstanding = pendingFees.reduce((sum, f) => sum + f.amount, 0);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <ParentShell
      title={child?.name || 'Child Detail'}
      breadcrumbs={[
        { label: 'Children', href: '/children' },
      ]}
      urgencyCount={urgencyCount}
    >
      {/* Child profile header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-base font-bold text-indigo-700 dark:text-indigo-300">
          {child ? getInitials(child.name) : '?'}
        </div>
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">{child?.name}</p>
          <p className="text-[12px] text-slate-500 dark:text-slate-400">{child?.class}</p>
        </div>
      </div>

      {/* Attendance section */}
      <div className="mb-6">
        <SectionHeader label="Attendance Overview" />
        <Card className="mt-3">
          <CardContent className="p-4">
            {last7Days.length === 0 ? (
              <p className="text-[12px] text-slate-500 text-center py-3">No attendance records</p>
            ) : (
              <div className="space-y-2">
                {last7Days.map((att, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-[12px] text-slate-600 dark:text-slate-400">{att.date}</span>
                    <Badge
                      variant={att.status === 'present' ? 'default' : 'destructive'}
                      className="text-[10px] px-2 py-0 uppercase tracking-wider font-bold h-5"
                    >
                      {att.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Fee status section */}
      <div>
        <SectionHeader label="Fee Status" count={unpaidFees.length} />
        <Card className="mt-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-slate-500 font-medium">Outstanding Balance</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">${outstanding}</span>
            </div>
            {(fees || []).length === 0 ? (
              <p className="text-[12px] text-slate-500 text-center py-3">No fee records</p>
            ) : (
              <div className="space-y-2">
                {(fees || []).map((fee, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-[12px] text-slate-600 dark:text-slate-400">{fee.studentName}</span>
                    <Badge
                      variant={fee.status === 'paid' ? 'default' : 'destructive'}
                      className="text-[10px] px-2 py-0 uppercase tracking-wider font-bold h-5"
                    >
                      {fee.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ParentShell>
  );
}
