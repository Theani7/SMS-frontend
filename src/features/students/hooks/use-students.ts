import { useQuery } from '@tanstack/react-query';
import { getStudents } from '../api';

export function useStudents(search?: string) {
  return useQuery({
    queryKey: ['students', search],
    queryFn: () => getStudents(search),
    staleTime: 1000 * 60 * 2,
  });
}