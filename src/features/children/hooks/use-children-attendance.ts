import { useQuery } from '@tanstack/react-query';
import { mockGetChildrenAttendance } from '../api';

export function useChildrenAttendance(childId?: string) {
  return useQuery({
    queryKey: ['parent-attendance', childId],
    queryFn: () => mockGetChildrenAttendance(childId),
  });
}
