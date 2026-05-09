export interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  class: string;
  classId: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone?: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  admissionDate: string;
  status: 'active' | 'inactive' | 'graduated';
  createdAt: string;
}

export interface CreateStudentData {
  name: string;
  email: string;
  rollNo?: string;
  classId: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone?: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  admissionDate: string;
}

export interface UpdateStudentData extends Partial<CreateStudentData> {
  status?: 'active' | 'inactive' | 'graduated';
}