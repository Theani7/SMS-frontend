import type { Teacher, CreateTeacherData, UpdateTeacherData } from '../types/teacher';

let teachers: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@school.com',
    employeeId: 'EMP-001',
    subject: 'Mathematics',
    phone: '555-1001',
    address: '100 Faculty Lane',
    dateOfBirth: '1985-06-15',
    gender: 'female',
    hireDate: '2018-08-01',
    status: 'active',
    createdAt: '2018-08-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@school.com',
    employeeId: 'EMP-002',
    subject: 'Physics',
    phone: '555-1002',
    address: '200 Faculty Lane',
    dateOfBirth: '1982-03-22',
    gender: 'male',
    hireDate: '2019-01-15',
    status: 'active',
    createdAt: '2019-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@school.com',
    employeeId: 'EMP-003',
    subject: 'Chemistry',
    phone: '555-1003',
    address: '300 Faculty Lane',
    dateOfBirth: '1988-11-08',
    gender: 'female',
    hireDate: '2020-09-01',
    status: 'active',
    createdAt: '2020-09-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Robert Wilson',
    email: 'robert.wilson@school.com',
    employeeId: 'EMP-004',
    subject: 'English',
    phone: '555-1004',
    address: '400 Faculty Lane',
    dateOfBirth: '1980-09-30',
    gender: 'male',
    hireDate: '2017-08-01',
    status: 'active',
    createdAt: '2017-08-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@school.com',
    employeeId: 'EMP-005',
    subject: 'History',
    phone: '555-1005',
    address: '500 Faculty Lane',
    dateOfBirth: '1990-02-14',
    gender: 'female',
    hireDate: '2021-09-01',
    status: 'active',
    createdAt: '2021-09-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'David Thompson',
    email: 'david.thompson@school.com',
    employeeId: 'EMP-006',
    subject: 'Biology',
    phone: '555-1006',
    address: '600 Faculty Lane',
    dateOfBirth: '1987-07-25',
    gender: 'male',
    hireDate: '2022-01-10',
    status: 'inactive',
    createdAt: '2022-01-10T00:00:00Z',
  },
];

export async function getTeachers(search?: string): Promise<Teacher[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!search) return teachers;

  const searchLower = search.toLowerCase();
  return teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchLower) ||
      t.employeeId.toLowerCase().includes(searchLower) ||
      t.email.toLowerCase().includes(searchLower) ||
      t.subject.toLowerCase().includes(searchLower)
  );
}

export async function getTeacher(id: string): Promise<Teacher | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return teachers.find((t) => t.id === id);
}

export async function createTeacher(data: CreateTeacherData): Promise<Teacher> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newTeacher: Teacher = {
    id: String(teachers.length + 1),
    ...data,
    employeeId: `EMP-${String(teachers.length + 1).padStart(3, '0')}`,
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  teachers.push(newTeacher);
  return newTeacher;
}

export async function updateTeacher(id: string, data: UpdateTeacherData): Promise<Teacher> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = teachers.findIndex((t) => t.id === id);
  if (index === -1) throw new Error('Teacher not found');

  teachers[index] = { ...teachers[index], ...data };
  return teachers[index];
}

export async function deleteTeacher(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const index = teachers.findIndex((t) => t.id === id);
  if (index === -1) throw new Error('Teacher not found');

  teachers.splice(index, 1);
}