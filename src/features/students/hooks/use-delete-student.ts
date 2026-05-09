import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteStudent } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      addNotification({
        type: 'success',
        message: 'Student deleted successfully',
      });
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to delete student',
      });
    },
  });
}