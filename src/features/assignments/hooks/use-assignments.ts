import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Assignment } from '../types';
import { useNotificationStore } from '../../../shared/store/notification-store';

const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'Quantum Mechanics Lab Report',
    subject: 'Physics',
    dueDate: '2026-05-09T18:00:00Z',
    status: 'todo',
    studentsSubmitted: 12,
  },
  {
    id: '2',
    title: 'Industrial Revolution Essay',
    subject: 'History',
    dueDate: '2026-05-10T23:59:59Z',
    status: 'in-progress',
    progress: 25,
  },
  {
    id: '3',
    title: 'Advanced Algebra Quiz Prep',
    subject: 'Math',
    dueDate: '2026-05-10T16:00:00Z',
    status: 'in-progress',
    progress: 30,
  },
  {
    id: '4',
    title: 'Chemical Reactions Worksheet',
    subject: 'Chemistry',
    dueDate: '2026-05-12T12:00:00Z',
    status: 'todo',
  },
  {
    id: '5',
    title: 'World War II Presentation',
    subject: 'History',
    dueDate: '2026-05-15T09:00:00Z',
    status: 'todo',
  },
];

export function useAssignments() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const assignmentsQuery = useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ASSIGNMENTS;
    },
  });

  const criticalDeadlines = useMemo(() => {
    if (!assignmentsQuery.data) return [];
    
    const now = new Date();
    const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    return assignmentsQuery.data.filter(assignment => {
      if (assignment.status === 'submitted') return false;
      
      const dueDate = new Date(assignment.dueDate);
      return dueDate <= threeHoursFromNow;
    });
  }, [assignmentsQuery.data]);

  const submitMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return id;
    },
    onSuccess: (id) => {
      // In a real app, we would update the mock database or invalidate queries
      // For this mock, we'll just show the notification
      queryClient.setQueryData(['assignments'], (old: Assignment[] | undefined) => {
        if (!old) return old;
        return old.map(a => a.id === id ? { ...a, status: 'submitted' as const } : a);
      });
      addNotification('success', 'Assignment submitted successfully');
    },
    onError: () => {
      addNotification('error', 'Failed to submit assignment');
    }
  });

  return {
    ...assignmentsQuery,
    criticalDeadlines,
    submitAssignment: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
  };
}
