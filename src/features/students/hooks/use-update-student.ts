import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudent } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';
import type { UpdateStudentData } from '../types/student';

export function useUpdateStudent() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentData }) =>
      updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      addNotification({
        type: 'success',
        message: 'Student updated successfully',
      });
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to update student',
      });
    },
  });
}