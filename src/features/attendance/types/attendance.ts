export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface AttendanceMark {
  studentId: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface AttendanceFilters {
  classId?: string;
  date?: string;
  status?: 'present' | 'absent' | 'late';
  search?: string;
}

export interface ClassOption {
  id: string;
  name: string;
  teacherName: string;
}

export interface SubjectAttendance {
  subject: string;
  percentage: number;
  totalClasses: number;
  present: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface AttendanceInsights {
  overallPercentage: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  streak: number;
  subjectBreakdown: SubjectAttendance[];
  monthlyHeatmap: { date: string; status: 'present' | 'absent' | 'late' | 'none' }[];
}
