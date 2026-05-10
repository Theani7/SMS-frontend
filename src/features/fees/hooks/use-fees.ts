import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFees, payFee } from '../api';
import { useNotificationStore } from '../../../shared/store/notification-store';

export function useFees(search?: string) {
  return useQuery({
    queryKey: ['fees', search],
    queryFn: () => getFees(search),
    staleTime: 1000 * 60 * 2,
  });
}

export function usePayFee() {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: payFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      addNotification('success', 'Payment processed successfully! Your receipt has been sent to your email.');
    },
    onError: (error: any) => {
      addNotification('error', error.message || 'Payment failed. Please try again later.');
    },
  });
}