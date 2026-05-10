import { mockDb } from '../../../api/mock/database';
import { useAuthStore } from '../../../shared/store/auth-store';

export async function mockGetChildren(): Promise<Array<{ id: string; name: string; class: string }>> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const user = useAuthStore.getState().user;
  if (!user || user.role !== 'parent') return [];

  const children = user.children || [];
  return mockDb.students.filter(s => children.includes(s.id));
}

export async function mockGetChildrenAttendance(childId?: string) {
  const user = useAuthStore.getState().user;
  if (!user || user.role !== 'parent') return [];

  const children = user.children || [];
  const studentIds = childId ? (children.includes(childId) ? [childId] : []) : children;

  return mockDb.attendance
    .filter(a => studentIds.includes(a.studentId))
    .map(a => {
      const student = mockDb.students.find(s => s.id === a.studentId);
      return { ...a, studentName: student?.name || 'Unknown' };
    });
}

export async function mockGetChildrenFees(childId?: string) {
  const user = useAuthStore.getState().user;
  if (!user || user.role !== 'parent') return [];

  const children = user.children || [];
  const studentIds = childId ? (children.includes(childId) ? [childId] : []) : children;

  return mockDb.fees
    .filter(f => studentIds.includes(f.studentId))
    .map(f => {
      const student = mockDb.students.find(s => s.id === f.studentId);
      return { ...f, studentName: student?.name || 'Unknown' };
    });
}
