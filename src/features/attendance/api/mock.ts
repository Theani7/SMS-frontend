import type { AttendanceRecord, AttendanceMark, AttendanceFilters, ClassOption, AttendanceInsights } from '../types/attendance';
import { mockDb } from '../../../api/mock/database';

const generateAttendanceData = (): AttendanceRecord[] => {
  const data: AttendanceRecord[] = [];
  const students = [
    { id: '1', name: 'Emma Wilson', class: 'Grade 10-A' },
  ];

  // Generate 60 days of data for the first student
  const statuses: ('present' | 'absent' | 'late')[] = ['present', 'present', 'present', 'present', 'present', 'absent', 'late'];
  
  for (let i = 60; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    students.forEach((student) => {
      data.push({
        id: `${dateStr}-${student.id}`,
        studentId: student.id,
        studentName: student.name,
        classId: `class-a`,
        className: student.class,
        date: dateStr,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        remarks: '',
      });
    });
  }

  return data;
};

let attendanceData = generateAttendanceData();

export async function getAttendanceList(filters?: AttendanceFilters): Promise<AttendanceRecord[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  let data = [...attendanceData];
  if (filters?.classId) data = data.filter((a) => a.classId === filters.classId);
  if (filters?.date) data = data.filter((a) => a.date === filters.date);
  if (filters?.status) data = data.filter((a) => a.status === filters.status);
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    data = data.filter((a) => a.studentName.toLowerCase().includes(search));
  }
  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAttendanceInsights(): Promise<AttendanceInsights> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  
  const studentRecords = attendanceData.filter(a => a.studentId === '1');
  const total = studentRecords.length;
  const present = studentRecords.filter(a => a.status === 'present' || a.status === 'late').length;
  const percentage = Math.round((present / total) * 100);

  // Generate 30 days heatmap
  const heatmap = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const record = studentRecords.find(r => r.date === dateStr);
    
    heatmap.push({
      date: dateStr,
      status: record ? record.status : 'none' as const
    });
  }

  return {
    overallPercentage: percentage,
    status: percentage > 90 ? 'excellent' : percentage > 80 ? 'good' : percentage > 75 ? 'warning' : 'critical',
    streak: 12,
    subjectBreakdown: [
      { subject: 'Mathematics', percentage: 76, totalClasses: 24, present: 18, status: 'warning' },
      { subject: 'Physics', percentage: 92, totalClasses: 20, present: 18, status: 'excellent' },
      { subject: 'Computer Science', percentage: 88, totalClasses: 18, present: 16, status: 'good' },
      { subject: 'English Lit', percentage: 84, totalClasses: 15, present: 13, status: 'good' },
    ],
    monthlyHeatmap: heatmap
  };
}

export async function markAttendance(records: AttendanceMark[]): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const today = new Date().toISOString().split('T')[0];

  records.forEach((record) => {
    const existingIndex = attendanceData.findIndex(
      (a) => a.studentId === record.studentId && a.date === today
    );

    if (existingIndex >= 0) {
      attendanceData[existingIndex] = {
        ...attendanceData[existingIndex],
        status: record.status,
        remarks: record.remarks,
      };
    } else {
      const student = mockDb.students.find((s) => s.id === record.studentId);
      attendanceData.push({
        id: `${today}-${record.studentId}`,
        studentId: record.studentId,
        studentName: student?.name || 'Unknown',
        classId: student?.class || 'Unknown',
        className: student?.class || 'Unknown',
        date: today,
        status: record.status,
        remarks: record.remarks,
      });
    }
  });
}

export async function getClassOptions(): Promise<ClassOption[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return [
    { id: 'class-a', name: 'Grade 10-A', teacherName: 'Sarah Johnson' },
    { id: 'class-b', name: 'Grade 10-B', teacherName: 'Michael Chen' },
    { id: 'class-c', name: 'Grade 9-A', teacherName: 'Emily Davis' },
    { id: 'class-d', name: 'Grade 9-B', teacherName: 'Robert Wilson' },
  ];
}
