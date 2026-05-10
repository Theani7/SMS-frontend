export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface TimetableSlot {
  id: string;
  subject: string;
  teacher: string;
  startTime: string; // e.g. "08:30"
  endTime: string;   // e.g. "09:30"
  room: string;
  day: DayOfWeek;
  color?: string; // Optional color for the UI
}

export interface TimetableFilters {
  day?: DayOfWeek;
}
