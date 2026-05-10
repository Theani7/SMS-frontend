export type AssignmentStatus = 'todo' | 'in-progress' | 'submitted';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: AssignmentStatus;
  progress?: number;
  description?: string;
  studentsSubmitted?: number;
}
