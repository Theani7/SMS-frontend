import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFee } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';
import type { CreateFeeData } from '../types/fee';

export function useCreateFee() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (data: CreateFeeData) => createFee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      addNotification({ type: 'success', message: 'Fee created successfully' });
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Failed to create fee' });
    },
  });
}