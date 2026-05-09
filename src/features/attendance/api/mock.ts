import type { AttendanceRecord, AttendanceMark, AttendanceFilters, ClassOption } from '../types/attendance';
import { mockDb } from '../../../api/mock/database';

const generateAttendanceData = (): AttendanceRecord[] => {
  const data: AttendanceRecord[] = [];
  const students = [
    { id: '1', name: 'Emma Wilson', class: 'Grade 10-A' },
    { id: '2', name: 'James Brown', class: 'Grade 10-A' },
    { id: '3', name: 'Olivia Davis', class: 'Grade 10-A' },
    { id: '4', name: 'Noah Martinez', class: 'Grade 10-B' },
    { id: '5', name: 'Ava Anderson', class: 'Grade 10-B' },
    { id: '6', name: 'Liam Thomas', class: 'Grade 9-A' },
    { id: '7', name: 'Sophia White', class: 'Grade 9-A' },
    { id: '8', name: 'Mason Lee', class: 'Grade 9-B' },
  ];

  const statuses: ('present' | 'absent' | 'late')[] = ['present', 'present', 'present', 'absent', 'late'];
  const dates = ['2026-05-10', '2026-05-09', '2026-05-08', '2026-05-07', '2026-05-06'];

  dates.forEach((date, dateIndex) => {
    students.forEach((student, idx) => {
      data.push({
        id: `${dateIndex}-${idx}`,
        studentId: student.id,
        studentName: student.name,
        classId: `class-${student.class.split(' ')[1].toLowerCase()}`,
        className: student.class,
        date,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        remarks: '',
      });
    });
  });

  return data;
};

let attendanceData = generateAttendanceData();

export async function getAttendanceList(filters?: AttendanceFilters): Promise<AttendanceRecord[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let data = [...attendanceData];

  if (filters?.classId) {
    data = data.filter((a) => a.classId === filters.classId);
  }
  if (filters?.date) {
    data = data.filter((a) => a.date === filters.date);
  }
  if (filters?.status) {
    data = data.filter((a) => a.status === filters.status);
  }
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    data = data.filter((a) =>
      a.studentName.toLowerCase().includes(search)
    );
  }

  return data;
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
