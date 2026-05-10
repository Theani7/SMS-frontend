import { TimetableSlot } from '../types';

export const MOCK_TIMETABLE: TimetableSlot[] = [
  // Monday
  { id: 'm1', subject: 'Mathematics', teacher: 'Dr. Smith', startTime: '08:00', endTime: '09:00', room: 'Room 101', day: 'Monday', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'm2', subject: 'Physics', teacher: 'Prof. Jones', startTime: '09:15', endTime: '10:15', room: 'Lab 1', day: 'Monday', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'm3', subject: 'English Literature', teacher: 'Ms. Davis', startTime: '10:30', endTime: '11:30', room: 'Room 203', day: 'Monday', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'm4', subject: 'History', teacher: 'Mr. Wilson', startTime: '12:30', endTime: '13:30', room: 'Room 105', day: 'Monday', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  
  // Tuesday
  { id: 't1', subject: 'Biology', teacher: 'Dr. Miller', startTime: '08:00', endTime: '09:00', room: 'Lab 2', day: 'Tuesday', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 't2', subject: 'Chemistry', teacher: 'Dr. Brown', startTime: '09:15', endTime: '10:15', room: 'Lab 3', day: 'Tuesday', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 't3', subject: 'Physical Education', teacher: 'Coach Taylor', startTime: '10:30', endTime: '12:00', room: 'Gymnasium', day: 'Tuesday', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  
  // Wednesday
  { id: 'w1', subject: 'Mathematics', teacher: 'Dr. Smith', startTime: '08:00', endTime: '09:00', room: 'Room 101', day: 'Wednesday', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'w2', subject: 'Computer Science', teacher: 'Mr. Anderson', startTime: '09:15', endTime: '10:45', room: 'IT Lab', day: 'Wednesday', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { id: 'w3', subject: 'Art & Design', teacher: 'Ms. White', startTime: '11:00', endTime: '12:30', room: 'Studio 1', day: 'Wednesday', color: 'bg-rose-100 text-rose-700 border-rose-200' },
  
  // Thursday
  { id: 'th1', subject: 'Physics', teacher: 'Prof. Jones', startTime: '08:00', endTime: '09:00', room: 'Lab 1', day: 'Thursday', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'th2', subject: 'Geography', teacher: 'Mr. Clark', startTime: '09:15', endTime: '10:15', room: 'Room 108', day: 'Thursday', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  { id: 'th3', subject: 'Spanish', teacher: 'Senora Garcia', startTime: '10:30', endTime: '11:30', room: 'Room 201', day: 'Thursday', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'th4', subject: 'Economics', teacher: 'Mr. Lewis', startTime: '12:30', endTime: '13:30', room: 'Room 106', day: 'Thursday', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  
  // Friday
  { id: 'f1', subject: 'Biology', teacher: 'Dr. Miller', startTime: '08:00', endTime: '09:00', room: 'Lab 2', day: 'Friday', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'f2', subject: 'English Literature', teacher: 'Ms. Davis', startTime: '09:15', endTime: '10:15', room: 'Room 203', day: 'Friday', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'f3', subject: 'Mathematics', teacher: 'Dr. Smith', startTime: '10:30', endTime: '11:30', room: 'Room 101', day: 'Friday', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'f4', subject: 'Music', teacher: 'Mr. Reed', startTime: '12:30', endTime: '14:00', room: 'Music Room', day: 'Friday', color: 'bg-teal-100 text-teal-700 border-teal-200' },
];

export async function getTimetable(): Promise<TimetableSlot[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...MOCK_TIMETABLE];
}
