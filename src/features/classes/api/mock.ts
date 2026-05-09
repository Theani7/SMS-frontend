import type { Class, CreateClassData, UpdateClassData } from '../types/class';

let classes: Class[] = [
  {
    id: 'class-a',
    name: 'Grade 10-A',
    grade: '10',
    section: 'A',
    teacherId: '1',
    teacherName: 'Sarah Johnson',
    capacity: 35,
    currentStrength: 32,
    roomNumber: '101',
    schedule: 'Mon-Fri 9:00 AM',
    status: 'active',
    createdAt: '2020-09-01T00:00:00Z',
  },
  {
    id: 'class-b',
    name: 'Grade 10-B',
    grade: '10',
    section: 'B',
    teacherId: '2',
    teacherName: 'Michael Chen',
    capacity: 35,
    currentStrength: 30,
    roomNumber: '102',
    schedule: 'Mon-Fri 10:00 AM',
    status: 'active',
    createdAt: '2020-09-01T00:00:00Z',
  },
  {
    id: 'class-c',
    name: 'Grade 9-A',
    grade: '9',
    section: 'A',
    teacherId: '3',
    teacherName: 'Emily Davis',
    capacity: 30,
    currentStrength: 28,
    roomNumber: '201',
    schedule: 'Mon-Fri 9:00 AM',
    status: 'active',
    createdAt: '2021-09-01T00:00:00Z',
  },
  {
    id: 'class-d',
    name: 'Grade 9-B',
    grade: '9',
    section: 'B',
    teacherId: '4',
    teacherName: 'Robert Wilson',
    capacity: 30,
    currentStrength: 26,
    roomNumber: '202',
    schedule: 'Mon-Fri 10:00 AM',
    status: 'active',
    createdAt: '2021-09-01T00:00:00Z',
  },
  {
    id: 'class-e',
    name: 'Grade 8-A',
    grade: '8',
    section: 'A',
    teacherId: '5',
    teacherName: 'Jessica Martinez',
    capacity: 30,
    currentStrength: 24,
    roomNumber: '301',
    schedule: 'Mon-Fri 11:00 AM',
    status: 'active',
    createdAt: '2022-09-01T00:00:00Z',
  },
  {
    id: 'class-f',
    name: 'Grade 8-B',
    grade: '8',
    section: 'B',
    teacherId: '6',
    teacherName: 'David Thompson',
    capacity: 30,
    currentStrength: 20,
    roomNumber: '302',
    schedule: 'Mon-Fri 11:00 AM',
    status: 'inactive',
    createdAt: '2022-09-01T00:00:00Z',
  },
];

export async function getClasses(search?: string): Promise<Class[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!search) return classes;

  const searchLower = search.toLowerCase();
  return classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchLower) ||
      c.teacherName.toLowerCase().includes(searchLower) ||
      c.roomNumber?.toLowerCase().includes(searchLower)
  );
}

export async function getClass(id: string): Promise<Class | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return classes.find((c) => c.id === id);
}

export async function createClass(data: CreateClassData): Promise<Class> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const teacherNames: Record<string, string> = {
    '1': 'Sarah Johnson',
    '2': 'Michael Chen',
    '3': 'Emily Davis',
    '4': 'Robert Wilson',
    '5': 'Jessica Martinez',
    '6': 'David Thompson',
  };

  const newClass: Class = {
    id: `class-${String(classes.length + 1)}`,
    ...data,
    name: `Grade ${data.grade}-${data.section}`,
    teacherName: teacherNames[data.teacherId] || '',
    currentStrength: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  classes.push(newClass);
  return newClass;
}

export async function updateClass(id: string, data: UpdateClassData): Promise<Class> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = classes.findIndex((c) => c.id === id);
  if (index === -1) throw new Error('Class not found');

  classes[index] = { ...classes[index], ...data };
  if (data.grade || data.section) {
    classes[index].name = `Grade ${data.grade || classes[index].grade}-${data.section || classes[index].section}`;
  }
  return classes[index];
}

export async function deleteClass(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const index = classes.findIndex((c) => c.id === id);
  if (index === -1) throw new Error('Class not found');

  classes.splice(index, 1);
}