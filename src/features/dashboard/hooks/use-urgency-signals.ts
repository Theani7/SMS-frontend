import { useMemo } from 'react';
import { useAnnouncements } from '../../announcements/hooks/use-announcements';
import { useAttendanceInsights } from '../../attendance/hooks/use-attendance-insights';
import { useFees } from '../../fees/hooks/use-fees';

export interface UrgencySignal {
  id: string;
  type: 'urgent' | 'warning';
  title: string;
  description: string;
  actionLabel: string;
  path: string;
}

export function useUrgencySignals() {
  const { announcements, isLoading: announcementsLoading } = useAnnouncements();
  const { data: attendance, isLoading: attendanceLoading } = useAttendanceInsights();
  const { data: fees, isLoading: feesLoading } = useFees();

  const signals = useMemo(() => {
    const list: UrgencySignal[] = [];

    // 1. Unread Urgent Announcements
    announcements
      .filter((a: any) => a.category === 'urgent' && !a.isRead)
      .forEach((a: any) => {
        list.push({
          id: `ann-${a.id}`,
          type: 'urgent',
          title: 'Urgent Notice',
          description: a.title,
          actionLabel: 'Read Now',
          path: '/announcements',
        });
      });

    // 2. At-Risk Attendance
    if (attendance) {
      attendance.subjectBreakdown
        .filter((s: any) => s.status === 'critical' || s.status === 'warning')
        .forEach((s: any) => {
          list.push({
            id: `att-${s.subject}`,
            type: 'warning',
            title: 'Attendance Alert',
            description: `${s.subject} is at ${s.percentage}%`,
            actionLabel: 'View Details',
            path: '/attendance',
          });
        });
    }

    // 3. Overdue Fees
    if (fees) {
      fees
        .filter((f: any) => f.status === 'overdue')
        .forEach((f: any) => {
          list.push({
            id: `fee-${f.id}`,
            type: 'urgent',
            title: 'Overdue Fee',
            description: `${f.feeType}: $${f.amount}`,
            actionLabel: 'Pay Now',
            path: '/fees',
          });
        });
    }

    return list;
  }, [announcements, attendance, fees]);

  return {
    signals,
    isLoading: announcementsLoading || attendanceLoading || feesLoading,
  };
}
