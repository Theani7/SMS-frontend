import { useQuery } from '@tanstack/react-query';
import { mockGetChildren } from '../api';

export function useChildren() {
  return useQuery({
    queryKey: ['children'],
    queryFn: () => mockGetChildren(),
  });
}
