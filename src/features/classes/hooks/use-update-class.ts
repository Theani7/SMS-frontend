import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClass } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';
import type { UpdateClassData } from '../types/class';

export function useUpdateClass() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClassData }) =>
      updateClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      addNotification({ type: 'success', message: 'Class updated successfully' });
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Failed to update class' });
    },
  });
}