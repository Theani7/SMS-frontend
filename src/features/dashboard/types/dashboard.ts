export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  todayAttendance: number;
  pendingFees: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'attendance' | 'fee' | 'student' | 'teacher';
  message: string;
  timestamp: string;
}

export interface StudentStats {
  myClasses: number;
  totalStudents: number;
  pendingAttendance: number;
}

export interface TeacherStats {
  myClasses: number;
  totalStudents: number;
  pendingAttendance: number;
  upcomingClasses: ClassSchedule[];
}

export interface ClassSchedule {
  id: string;
  className: string;
  time: string;
  subject: string;
}

export interface ParentStats {
  childrenCount: number;
  totalPendingFees: number;
  recentAttendance: StudentAttendance[];
}

export interface StudentAttendance {
  studentId: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface DashboardStudentStats {
  myClasses: number;
  nextClass: ClassSchedule | null;
  upcomingEvents: Event[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'holiday';
}