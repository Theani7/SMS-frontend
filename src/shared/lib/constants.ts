export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  CLASSES: '/classes',
  ATTENDANCE: '/attendance',
  ATTENDANCE_MARK: '/attendance/mark',
  FEES: '/fees',
  ASSIGNMENTS: '/assignments',
  PERFORMANCE: '/performance',
  TIMETABLE: '/timetable',
  ANNOUNCEMENTS: '/announcements',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student',
} as const;
