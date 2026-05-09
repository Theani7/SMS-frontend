import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAttendance } from '../api';
import type { AttendanceMark } from '../types/attendance';
import { useUIStore } from '../../../shared/store/ui-store';

export function useMarkAttendance() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (records: AttendanceMark[]) => markAttendance(records),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      addNotification({
        type: 'success',
        message: 'Attendance marked successfully',
      });
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to mark attendance',
      });
    },
  });
}
