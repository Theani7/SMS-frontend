import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFee } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';
import type { UpdateFeeData } from '../types/fee';

export function useUpdateFee() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFeeData }) =>
      updateFee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      addNotification({ type: 'success', message: 'Fee updated successfully' });
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Failed to update fee' });
    },
  });
}