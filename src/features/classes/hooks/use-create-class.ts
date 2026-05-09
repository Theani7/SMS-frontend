import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClass } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';
import type { CreateClassData } from '../types/class';

export function useCreateClass() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (data: CreateClassData) => createClass(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      addNotification({ type: 'success', message: 'Class created successfully' });
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Failed to create class' });
    },
  });
}