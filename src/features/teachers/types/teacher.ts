export interface Teacher {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  subject: string;
  phone?: string;
  address?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  hireDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  createdAt: string;
}

export interface CreateTeacherData {
  name: string;
  email: string;
  subject: string;
  phone?: string;
  address?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  hireDate: string;
}

export interface UpdateTeacherData extends Partial<CreateTeacherData> {
  status?: 'active' | 'inactive' | 'on-leave';
}