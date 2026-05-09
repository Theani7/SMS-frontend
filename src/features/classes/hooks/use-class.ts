import { useQuery } from '@tanstack/react-query';
import { getClass } from '../api';

export function useClass(id: string) {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: () => getClass(id),
    enabled: !!id,
  });
}