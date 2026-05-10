import { StudentShell } from '../../shared/components/student/student-shell';
import { useUrgencySignals } from '../../shared/hooks/use-urgency-signals';
import { useModulePreview, type ModulePreview } from '../../shared/hooks/use-module-preview';
import { AssignmentsInbox } from '../../features/assignments/components/assignments-inbox';

export function AssignmentsPage() {
  const urgencyItems = useUrgencySignals();
  const preview: ModulePreview | null = useModulePreview('timetable');

  return (
    <StudentShell
      title="Assignments"
      breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Assignments' }]}
      urgencyItems={urgencyItems}
    >
      {preview && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-sm">
          <span className="text-blue-600 dark:text-blue-400">📅</span>
          <span className="font-medium text-blue-700 dark:text-blue-300">{preview.label}</span>
        </div>
      )}
      <AssignmentsInbox />
    </StudentShell>
  );
}