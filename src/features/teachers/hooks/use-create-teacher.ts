import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTeacher } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';
import type { CreateTeacherData } from '../types/teacher';

export function useCreateTeacher() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (data: CreateTeacherData) => createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      addNotification({ type: 'success', message: 'Teacher created successfully' });
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Failed to create teacher' });
    },
  });
}