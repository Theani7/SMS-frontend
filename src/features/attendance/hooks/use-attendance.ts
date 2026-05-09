import { useQuery } from '@tanstack/react-query';
import { getAttendanceList } from '../api';
import type { AttendanceFilters } from '../types/attendance';

export function useAttendance(filters?: AttendanceFilters) {
  return useQuery({
    queryKey: ['attendance', filters],
    queryFn: () => getAttendanceList(filters),
    staleTime: 1000 * 60, // 1 minute
  });
}
