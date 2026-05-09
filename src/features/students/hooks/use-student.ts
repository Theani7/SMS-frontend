import { useQuery } from '@tanstack/react-query';
import { getStudent } from '../api';

export function useStudent(id: string) {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => getStudent(id),
    enabled: !!id,
  });
}