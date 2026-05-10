import { useQuery } from '@tanstack/react-query';
import { Assignment } from '../types';

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
  return useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ASSIGNMENTS;
    },
  });
}
