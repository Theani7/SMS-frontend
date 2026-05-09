import type { DashboardStats, TeacherStats, ParentStats, DashboardStudentStats } from '../types/dashboard';

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    totalStudents: 156,
    totalTeachers: 24,
    totalClasses: 18,
    todayAttendance: 94,
    pendingFees: 12,
    recentActivities: [
      { id: '1', type: 'student', message: 'New student enrolled: Emma Wilson', timestamp: '2026-05-10T10:00:00Z' },
      { id: '2', type: 'fee', message: 'Fee payment received from James Brown', timestamp: '2026-05-10T09:00:00Z' },
      { id: '3', type: 'attendance', message: 'Morning attendance marked', timestamp: '2026-05-10T08:00:00Z' },
    ],
  };
}

export async function getTeacherDashboardStats(): Promise<TeacherStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    myClasses: 5,
    totalStudents: 120,
    pendingAttendance: 3,
    upcomingClasses: [
      { id: '1', className: 'Grade 10-A', time: '09:00 AM', subject: 'Mathematics' },
      { id: '2', className: 'Grade 10-B', time: '10:00 AM', subject: 'Mathematics' },
    ],
  };
}

export async function getParentDashboardStats(): Promise<ParentStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    childrenCount: 2,
    totalPendingFees: 1000,
    recentAttendance: [
      { studentId: '1', studentName: 'Emma Wilson', date: '2026-05-10', status: 'present' },
      { studentId: '2', studentName: 'James Brown', date: '2026-05-10', status: 'present' },
    ],
  };
}

export async function getStudentDashboardStats(): Promise<DashboardStudentStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    myClasses: 6,
    nextClass: { id: '1', className: 'Grade 10-A', time: '10:00 AM', subject: 'Physics' },
    upcomingEvents: [
      { id: '1', title: 'Math Final Exam', date: '2026-05-15', type: 'exam' },
      { id: '2', title: 'Physics Assignment Due', date: '2026-05-12', type: 'assignment' },
    ],
  };
}