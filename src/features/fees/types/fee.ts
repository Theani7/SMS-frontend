export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'waived';
  remarks?: string;
  createdAt: string;
}

export interface CreateFeeData {
  studentId: string;
  feeType: string;
  amount: number;
  dueDate: string;
  remarks?: string;
}

export interface UpdateFeeData extends Partial<CreateFeeData> {
  status?: 'pending' | 'paid' | 'overdue' | 'waived';
  paidDate?: string;
}

export const FEE_TYPES = [
  'Tuition Fee',
  'Admission Fee',
  'Examination Fee',
  'Lab Fee',
  'Library Fee',
  'Sports Fee',
  'Transport Fee',
  'Annual Fee',
  'Registration Fee',
] as const;

export type FeeType = typeof FEE_TYPES[number];