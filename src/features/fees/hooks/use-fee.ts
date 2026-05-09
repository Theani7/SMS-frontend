import { useQuery } from '@tanstack/react-query';
import { getFee } from '../api';

export function useFee(id: string) {
  return useQuery({
    queryKey: ['fees', id],
    queryFn: () => getFee(id),
    enabled: !!id,
  });
}