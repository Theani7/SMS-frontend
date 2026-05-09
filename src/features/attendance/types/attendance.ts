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
