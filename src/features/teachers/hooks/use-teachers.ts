import { useQuery } from '@tanstack/react-query';
import { getTeachers } from '../api';

export function useTeachers(search?: string) {
  return useQuery({
    queryKey: ['teachers', search],
    queryFn: () => getTeachers(search),
    staleTime: 1000 * 60 * 2,
  });
}