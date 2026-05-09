import { useQuery } from '@tanstack/react-query';
import { getClassOptions } from '../api';

export function useClassOptions() {
  return useQuery({
    queryKey: ['classOptions'],
    queryFn: getClassOptions,
  });
}
