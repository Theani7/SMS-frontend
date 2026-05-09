import { useQuery } from '@tanstack/react-query';
import { getClasses } from '../api';

export function useClasses(search?: string) {
  return useQuery({
    queryKey: ['classes', search],
    queryFn: () => getClasses(search),
    staleTime: 1000 * 60 * 2,
  });
}