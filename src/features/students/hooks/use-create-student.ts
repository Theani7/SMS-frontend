import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStudent } from '../api';
import { useUIStore } from '../../../shared/store/ui-store';
import type { CreateStudentData } from '../types/student';

export function useCreateStudent() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (data: CreateStudentData) => createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      addNotification({
        type: 'success',
        message: 'Student created successfully',
      });
    },
    onError: () => {
      addNotification({
        type: 'error',
        message: 'Failed to create student',
      });
    },
  });
}