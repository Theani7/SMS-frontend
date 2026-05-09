import { useQuery } from '@tanstack/react-query';
import { getFees } from '../api';

export function useFees(search?: string) {
  return useQuery({
    queryKey: ['fees', search],
    queryFn: () => getFees(search),
    staleTime: 1000 * 60 * 2,
  });
}