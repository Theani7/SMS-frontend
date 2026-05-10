import { QueryClient, MutationCache } from '@tanstack/react-query';
import { useNotificationStore } from '../store/notification-store';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
      useNotificationStore.getState().addNotification('error', message);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});