import { StudentShell } from '../../shared/components/student/student-shell';
import { useUrgencySignals } from '../../shared/hooks/use-urgency-signals';
import { AnnouncementsInbox } from '../../features/announcements/components/announcements-inbox';

export function AnnouncementsPage() {
  const urgencyItems = useUrgencySignals();

  return (
    <StudentShell
      title="Announcements"
      breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Announcements' }]}
      urgencyItems={urgencyItems}
    >
      <AnnouncementsInbox />
    </StudentShell>
  );
}