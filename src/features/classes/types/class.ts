export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  teacherName: string;
  capacity: number;
  currentStrength: number;
  roomNumber?: string;
  schedule?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CreateClassData {
  grade: string;
  section: string;
  teacherId: string;
  capacity: number;
  roomNumber?: string;
  schedule?: string;
}

export interface UpdateClassData extends Partial<CreateClassData> {
  status?: 'active' | 'inactive';
}