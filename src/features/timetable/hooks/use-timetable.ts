import { useQuery } from '@tanstack/react-query';
import { getTimetable } from '../api';
import { DayOfWeek } from '../types';

export function useTimetable() {
  return useQuery({
    queryKey: ['timetable'],
    queryFn: getTimetable,
  });
}

export function useFilteredTimetable(day?: DayOfWeek) {
  const { data: timetable, ...rest } = useTimetable();
  
  const filteredData = day && timetable
    ? timetable.filter((slot) => slot.day === day)
    : timetable;

  return {
    data: filteredData,
    ...rest,
  };
}

export function useTodayTimetable() {
  const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();
  const today = days[todayIndex];
  
  // For demo purposes, if it's weekend, let's show Monday
  const dayToShow = (today === 'Saturday' || today === 'Sunday') ? 'Monday' : today;
  
  return useFilteredTimetable(dayToShow as DayOfWeek);
}
