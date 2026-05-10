import { useAssignments } from '../../features/assignments/hooks/use-assignments';
import { useFees } from '../../features/fees/hooks/use-fees';
import type { UrgencyItem } from '../components/student/urgency-strip';

export function useUrgencySignals(): UrgencyItem[] {
  const { data: assignments } = useAssignments();
  const { data: fees } = useFees();

  const signals: UrgencyItem[] = [];

  // Overdue assignments
  const overdue = (assignments || []).filter(
    a => new Date(a.dueDate) < new Date() && a.status !== 'submitted'
  );
  if (overdue.length > 0) {
    signals.push({
      id: 'assignments-overdue',
      label: `${overdue.length} assignment${overdue.length > 1 ? 's' : ''} overdue`,
      urgency: 'high',
      href: '/assignments',
    });
  }

  // Due today
  const today = new Date().toDateString();
  const dueToday = (assignments || []).filter(
    a => new Date(a.dueDate).toDateString() === today && a.status !== 'submitted'
  );
  if (dueToday.length > 0) {
    signals.push({
      id: 'assignments-due-today',
      label: `${dueToday.length} due today`,
      urgency: 'high',
      href: '/assignments',
    });
  }

  // Outstanding fees
  const outstanding = (fees || []).filter(f => f.status !== 'paid');
  if (outstanding.length > 0) {
    signals.push({
      id: 'fees-outstanding',
      label: `${outstanding.length} payment${outstanding.length > 1 ? 's' : ''} outstanding`,
      urgency: 'info',
      href: '/fees',
    });
  }

  return signals;
}