import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTeacher } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';
import type { UpdateTeacherData } from '../types/teacher';

export function useUpdateTeacher() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTeacherData }) =>
      updateTeacher(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      addNotification({ type: 'success', message: 'Teacher updated successfully' });
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Failed to update teacher' });
    },
  });
}