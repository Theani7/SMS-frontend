import { useQuery } from '@tanstack/react-query';
import { getPerformanceInsights } from '../api';

export function usePerformanceInsights() {
  return useQuery({
    queryKey: ['performance-insights'],
    queryFn: getPerformanceInsights,
  });
}
