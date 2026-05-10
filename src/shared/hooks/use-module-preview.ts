import { useTimetable } from '../../features/timetable/hooks/use-timetable';
import { useAssignments } from '../../features/assignments/hooks/use-assignments';
import { useAnnouncements } from '../../features/announcements/hooks/use-announcements';

export interface ModulePreview {
  label: string;
  href: string;
}

export function useModulePreview(module: 'timetable' | 'assignments' | 'announcements'): ModulePreview | null {
  switch (module) {
    case 'timetable': {
      const { data: slots } = useTimetable();
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      const todaySlots = (slots || []).filter(s => s.day === today).sort((a, b) => a.startTime.localeCompare(b.startTime));
      const nextSlot = todaySlots.find(s => s.startTime > now);
      if (!nextSlot) return null;
      return {
        label: `Next class: ${nextSlot.subject} at ${nextSlot.startTime}, ${nextSlot.room}`,
        href: '/timetable',
      };
    }
    case 'assignments': {
      const { data: assignments } = useAssignments();
      const recent = (assignments || []).filter(a => a.status === 'submitted').slice(0, 3);
      if (recent.length === 0) return null;
      return {
        label: `${recent.length} graded since you last checked`,
        href: '/performance',
      };
    }
    case 'announcements': {
      const { announcements } = useAnnouncements();
      if (!announcements || announcements.length === 0) return null;
      const latest = announcements[0];
      return {
        label: `Latest: ${latest.title}`,
        href: '/announcements',
      };
    }
    default:
      return null;
  }
}