import { useQuery } from '@tanstack/react-query';
import { getAttendanceInsights } from '../api';

export function useAttendanceInsights() {
  return useQuery({
    queryKey: ['attendance-insights'],
    queryFn: getAttendanceInsights,
  });
}
