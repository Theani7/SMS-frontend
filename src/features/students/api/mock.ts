import type { Student, CreateStudentData, UpdateStudentData } from '../types/student';
import { mockDb } from '../../../api/mock/database';

let students: Student[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma.wilson@school.com',
    rollNo: 'STU-001',
    class: 'Grade 10-A',
    classId: 'class-a',
    dateOfBirth: '2010-03-15',
    gender: 'female',
    phone: '555-0101',
    address: '123 Oak Street',
    parentName: 'Robert Wilson',
    parentPhone: '555-0102',
    admissionDate: '2020-09-01',
    status: 'active',
    createdAt: '2020-09-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'James Brown',
    email: 'james.brown@school.com',
    rollNo: 'STU-002',
    class: 'Grade 10-A',
    classId: 'class-a',
    dateOfBirth: '2010-07-22',
    gender: 'male',
    phone: '555-0201',
    address: '456 Maple Avenue',
    parentName: 'Linda Brown',
    parentPhone: '555-0202',
    admissionDate: '2020-09-01',
    status: 'active',
    createdAt: '2020-09-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Olivia Davis',
    email: 'olivia.davis@school.com',
    rollNo: 'STU-003',
    class: 'Grade 10-B',
    classId: 'class-b',
    dateOfBirth: '2010-11-08',
    gender: 'female',
    phone: '555-0301',
    address: '789 Pine Road',
    parentName: 'Sarah Davis',
    parentPhone: '555-0302',
    admissionDate: '2020-09-01',
    status: 'active',
    createdAt: '2020-09-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Noah Martinez',
    email: 'noah.martinez@school.com',
    rollNo: 'STU-004',
    class: 'Grade 10-B',
    classId: 'class-b',
    dateOfBirth: '2010-05-30',
    gender: 'male',
    phone: '555-0401',
    address: '321 Cedar Lane',
    parentName: 'Carlos Martinez',
    parentPhone: '555-0402',
    admissionDate: '2021-09-01',
    status: 'active',
    createdAt: '2021-09-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Ava Anderson',
    email: 'ava.anderson@school.com',
    rollNo: 'STU-005',
    class: 'Grade 9-A',
    classId: 'class-c',
    dateOfBirth: '2011-02-14',
    gender: 'female',
    phone: '555-0501',
    address: '654 Birch Boulevard',
    parentName: 'Jennifer Anderson',
    parentPhone: '555-0502',
    admissionDate: '2022-09-01',
    status: 'active',
    createdAt: '2022-09-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Liam Thomas',
    email: 'liam.thomas@school.com',
    rollNo: 'STU-006',
    class: 'Grade 9-A',
    classId: 'class-c',
    dateOfBirth: '2011-08-25',
    gender: 'male',
    phone: '555-0601',
    address: '987 Elm Street',
    parentName: 'Patricia Thomas',
    parentPhone: '555-0602',
    admissionDate: '2022-09-01',
    status: 'active',
    createdAt: '2022-09-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Sophia White',
    email: 'sophia.white@school.com',
    rollNo: 'STU-007',
    class: 'Grade 9-B',
    classId: 'class-d',
    dateOfBirth: '2011-01-03',
    gender: 'female',
    phone: '555-0701',
    address: '147 Willow Way',
    parentName: 'Karen White',
    parentPhone: '555-0702',
    admissionDate: '2022-09-01',
    status: 'active',
    createdAt: '2022-09-01T00:00:00Z',
  },
  {
    id: '8',
    name: 'Mason Lee',
    email: 'mason.lee@school.com',
    rollNo: 'STU-008',
    class: 'Grade 9-B',
    classId: 'class-d',
    dateOfBirth: '2011-06-17',
    gender: 'male',
    phone: '555-0801',
    address: '258 Spruce Court',
    parentName: 'David Lee',
    parentPhone: '555-0802',
    admissionDate: '2022-09-01',
    status: 'inactive',
    createdAt: '2022-09-01T00:00:00Z',
  },
];

export async function getStudents(search?: string): Promise<Student[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!search) return students;

  const searchLower = search.toLowerCase();
  return students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchLower) ||
      s.rollNo.toLowerCase().includes(searchLower) ||
      s.email.toLowerCase().includes(searchLower)
  );
}

export async function getStudent(id: string): Promise<Student | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return students.find((s) => s.id === id);
}

export async function createStudent(data: CreateStudentData): Promise<Student> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newStudent: Student = {
    id: String(students.length + 1),
    ...data,
    name: data.name,
    rollNo: `STU-${String(students.length + 1).padStart(3, '0')}`,
    class: mockDb.classes.find((c) => c.id === data.classId)?.name || '',
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  students.push(newStudent);
  return newStudent;
}

export async function updateStudent(id: string, data: UpdateStudentData): Promise<Student> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) throw new Error('Student not found');

  students[index] = { ...students[index], ...data };
  return students[index];
}

export async function deleteStudent(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) throw new Error('Student not found');

  students.splice(index, 1);
}