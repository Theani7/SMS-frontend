import { useQuery } from '@tanstack/react-query';
import { getTeacher } from '../api';

export function useTeacher(id: string) {
  return useQuery({
    queryKey: ['teachers', id],
    queryFn: () => getTeacher(id),
    enabled: !!id,
  });
}