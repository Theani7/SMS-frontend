import type { MockUser } from '../../features/auth/types/auth';

interface MockDatabase {
  users: MockUser[];
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
};
