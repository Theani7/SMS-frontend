import type { Fee, CreateFeeData, UpdateFeeData } from '../types/fee';

let fees: Fee[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Emma Wilson',
    className: 'Grade 10-A',
    feeType: 'Tuition Fee',
    amount: 500,
    dueDate: '2026-05-15',
    status: 'pending',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'James Brown',
    className: 'Grade 10-A',
    feeType: 'Tuition Fee',
    amount: 500,
    dueDate: '2026-05-15',
    paidDate: '2026-05-10',
    status: 'paid',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Olivia Davis',
    className: 'Grade 10-B',
    feeType: 'Lab Fee',
    amount: 100,
    dueDate: '2026-04-30',
    status: 'overdue',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: '4',
    studentId: '4',
    studentName: 'Noah Martinez',
    className: 'Grade 10-B',
    feeType: 'Examination Fee',
    amount: 200,
    dueDate: '2026-06-01',
    status: 'pending',
    createdAt: '2026-04-15T00:00:00Z',
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'Ava Anderson',
    className: 'Grade 9-A',
    feeType: 'Transport Fee',
    amount: 150,
    dueDate: '2026-05-20',
    status: 'pending',
    createdAt: '2026-04-10T00:00:00Z',
  },
  {
    id: '6',
    studentId: '6',
    studentName: 'Liam Thomas',
    className: 'Grade 9-A',
    feeType: 'Library Fee',
    amount: 50,
    dueDate: '2026-05-01',
    paidDate: '2026-05-05',
    status: 'paid',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: '7',
    studentId: '7',
    studentName: 'Sophia White',
    className: 'Grade 9-B',
    feeType: 'Sports Fee',
    amount: 75,
    dueDate: '2026-05-10',
    status: 'waived',
    createdAt: '2026-04-20T00:00:00Z',
  },
  {
    id: '8',
    studentId: '8',
    studentName: 'Mason Lee',
    className: 'Grade 9-B',
    feeType: 'Annual Fee',
    amount: 300,
    dueDate: '2026-04-15',
    status: 'overdue',
    createdAt: '2026-03-15T00:00:00Z',
  },
];

export async function getFees(search?: string): Promise<Fee[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!search) return fees;

  const searchLower = search.toLowerCase();
  return fees.filter(
    (f) =>
      f.studentName.toLowerCase().includes(searchLower) ||
      f.feeType.toLowerCase().includes(searchLower) ||
      f.status.toLowerCase().includes(searchLower)
  );
}

export async function getFee(id: string): Promise<Fee | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return fees.find((f) => f.id === id);
}

export async function createFee(data: CreateFeeData): Promise<Fee> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const studentNames: Record<string, { name: string; class: string }> = {
    '1': { name: 'Emma Wilson', class: 'Grade 10-A' },
    '2': { name: 'James Brown', class: 'Grade 10-A' },
    '3': { name: 'Olivia Davis', class: 'Grade 10-B' },
    '4': { name: 'Noah Martinez', class: 'Grade 10-B' },
    '5': { name: 'Ava Anderson', class: 'Grade 9-A' },
    '6': { name: 'Liam Thomas', class: 'Grade 9-A' },
    '7': { name: 'Sophia White', class: 'Grade 9-B' },
    '8': { name: 'Mason Lee', class: 'Grade 9-B' },
  };

  const student = studentNames[data.studentId];

  const newFee: Fee = {
    id: String(fees.length + 1),
    ...data,
    studentName: student?.name || '',
    className: student?.class || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  fees.push(newFee);
  return newFee;
}

export async function updateFee(id: string, data: UpdateFeeData): Promise<Fee> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = fees.findIndex((f) => f.id === id);
  if (index === -1) throw new Error('Fee not found');

  fees[index] = { ...fees[index], ...data };
  return fees[index];
}

export async function deleteFee(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const index = fees.findIndex((f) => f.id === id);
  if (index === -1) throw new Error('Fee not found');

  fees.splice(index, 1);
}

export async function payFee(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mark all pending or overdue fees as paid for demo purposes
  fees = fees.map(f => {
    if (f.status === 'pending' || f.status === 'overdue') {
      return {
        ...f,
        status: 'paid',
        paidDate: new Date().toISOString().split('T')[0]
      };
    }
    return f;
  });
}