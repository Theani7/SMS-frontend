import { useQuery } from '@tanstack/react-query';
import { mockGetChildrenFees } from '../api';

export function useChildrenFees(childId?: string) {
  return useQuery({
    queryKey: ['parent-fees', childId],
    queryFn: () => mockGetChildrenFees(childId),
  });
}
