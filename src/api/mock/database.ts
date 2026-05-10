import type { MockUser } from '../../features/auth/types/auth';

interface MockStudent {
  id: string;
  name: string;
  class: string;
  rollNo: string;
}

interface MockTeacher {
  id: string;
  name: string;
  subject: string;
}

interface MockClass {
  id: string;
  name: string;
  teacher: string;
  students: number;
}

interface MockAttendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

interface MockFee {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'waived';
  remarks?: string;
  createdAt: string;
}

interface MockDatabase {
  users: MockUser[];
  students: MockStudent[];
  teachers: MockTeacher[];
  classes: MockClass[];
  attendance: MockAttendance[];
  fees: MockFee[];
}

export const mockDb: MockDatabase = {
  users: [
    {
      id: '1',
      email: 'admin@school.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      email: 'teacher@school.com',
      password: 'teacher123',
      name: 'Sarah Johnson',
      role: 'teacher',
      createdAt: '2024-01-15T00:00:00Z',
    },
    {
      id: '3',
      email: 'parent@school.com',
      password: 'parent123',
      name: 'John Smith',
      role: 'parent',
      children: ['1', '3'],
      createdAt: '2024-02-01T00:00:00Z',
    },
    {
      id: '4',
      email: 'student@school.com',
      password: 'student123',
      name: 'Emily Brown',
      role: 'student',
      createdAt: '2024-03-01T00:00:00Z',
    },
  ],
  students: [
    { id: '1', name: 'Emma Wilson', class: 'Grade 10-A', rollNo: '101' },
    { id: '2', name: 'James Brown', class: 'Grade 10-A', rollNo: '102' },
    { id: '3', name: 'Olivia Davis', class: 'Grade 9-B', rollNo: '103' },
  ],
  teachers: [
    { id: '1', name: 'Sarah Johnson', subject: 'Mathematics' },
    { id: '2', name: 'Michael Chen', subject: 'Physics' },
  ],
  classes: [
    { id: '1', name: 'Grade 10-A', teacher: 'Sarah Johnson', students: 30 },
    { id: '2', name: 'Grade 9-B', teacher: 'Michael Chen', students: 28 },
  ],
  attendance: [
    { id: '1', studentId: '1', date: '2026-05-10', status: 'present' },
    { id: '2', studentId: '2', date: '2026-05-10', status: 'present' },
    { id: '3', studentId: '3', date: '2026-05-10', status: 'absent' },
  ],
  fees: [
    { id: '1', studentId: '1', studentName: 'Emma Wilson', className: 'Grade 10-A', feeType: 'Tuition Fee', amount: 500, dueDate: '2026-05-15', status: 'pending', createdAt: '2026-05-01' },
    { id: '2', studentId: '2', studentName: 'James Brown', className: 'Grade 10-A', feeType: 'Tuition Fee', amount: 500, dueDate: '2026-05-15', status: 'paid', createdAt: '2026-05-01' },
    { id: '3', studentId: '3', studentName: 'Olivia Davis', className: 'Grade 9-B', feeType: 'Examination Fee', amount: 200, dueDate: '2026-05-20', status: 'pending', createdAt: '2026-05-05' },
  ],
};