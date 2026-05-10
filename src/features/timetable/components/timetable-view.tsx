import { useState, useMemo } from 'react';
import { useTimetable } from '../hooks/use-timetable';
import { TimetableSlot, DayOfWeek } from '../types';
import { Card, CardContent } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';
import { Button } from '../../../shared/components/ui/button';
import { Clock, MapPin, User, Calendar, List, Grid3X3, ChevronLeft } from 'lucide-react';
import { cn } from '../../../shared/lib/utils';

type ViewMode = 'daily' | 'weekly';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DAY_NAMES: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function TimetableView() {
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(() => {
    const today = DAY_NAMES[new Date().getDay()];
    return (today === 'Saturday' || today === 'Sunday') ? 'Monday' : today;
  });

  const { data: timetable, isLoading } = useTimetable();

  const sortedSlots = useMemo(() => {
    if (!timetable) return [];
    
    return timetable
      .filter(slot => slot.day === selectedDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [timetable, selectedDay]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64" aria-busy="true" aria-live="polite">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="sr-only">Loading timetable...</span>
      </div>
    );
  }

  const handlePrevDay = () => {
    const currentIndex = DAYS.indexOf(selectedDay);
    const nextIndex = (currentIndex - 1 + DAYS.length) % DAYS.length;
    setSelectedDay(DAYS[nextIndex]);
  };

  const handleNextDay = () => {
    const currentIndex = DAYS.indexOf(selectedDay);
    const nextIndex = (currentIndex + 1) % DAYS.length;
    setSelectedDay(DAYS[nextIndex]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit" role="tablist" aria-label="View selection">
          <Button
            variant={viewMode === 'daily' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('daily')}
            role="tab"
            aria-selected={viewMode === 'daily'}
            className={cn(
              "text-xs h-8 px-3 transition-all",
              viewMode === 'daily' && "bg-white dark:bg-slate-700 shadow-sm"
            )}
          >
            <List className="w-3.5 h-3.5 mr-1.5" />
            Daily View
          </Button>
          <Button
            variant={viewMode === 'weekly' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('weekly')}
            role="tab"
            aria-selected={viewMode === 'weekly'}
            className={cn(
              "text-xs h-8 px-3 transition-all",
              viewMode === 'weekly' && "bg-white dark:bg-slate-700 shadow-sm"
            )}
          >
            <Grid3X3 className="w-3.5 h-3.5 mr-1.5" />
            Weekly View
          </Button>
        </div>

        {viewMode === 'daily' && (
          <div className="flex items-center gap-2" aria-label="Day navigation">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevDay} aria-label="Previous day">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center justify-center min-w-[120px] font-medium text-sm" aria-live="polite">
              <Calendar className="w-4 h-4 mr-2 text-slate-500" />
              {selectedDay}
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextDay} aria-label="Next day">
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}
      </div>

      {viewMode === 'daily' ? (
        <DailyTimeline slots={sortedSlots} />
      ) : (
        <WeeklyGrid timetable={timetable || []} />
      )}
    </div>
  );
}

function DailyTimeline({ slots }: { slots: TimetableSlot[] }) {
  if (slots.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="font-medium text-slate-900 dark:text-slate-100">No classes scheduled</h3>
          <p className="text-sm text-slate-500 max-w-[200px] mt-1">Enjoy your free time!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative space-y-4 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
      {slots.map((slot, index) => (
        <div key={slot.id} className="relative pl-10">
          <div className="absolute left-0 top-3 w-9 h-9 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
          <Card className={cn("overflow-hidden transition-all hover:shadow-md", slot.color)}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base leading-none">{slot.subject}</h3>
                    {index === 0 && (
                      <Badge variant="outline" className="text-[10px] h-5 bg-primary/10 text-primary border-primary/20">
                        Next Class
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center text-[12px] text-slate-600 dark:text-slate-300">
                      <User className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                      {slot.teacher}
                    </div>
                    <div className="flex items-center text-[12px] text-slate-600 dark:text-slate-300">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                      {slot.room}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm font-medium bg-white/50 dark:bg-black/20 px-3 py-1.5 rounded-md w-fit">
                  <Clock className="w-3.5 h-3.5 mr-2 opacity-70" />
                  {slot.startTime} - {slot.endTime}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

function WeeklyGrid({ timetable }: { timetable: TimetableSlot[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {DAYS.map((day) => {
        const daySlots = timetable
          .filter(slot => slot.day === day)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));

        return (
          <div key={day} className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-500">{day}</h3>
              <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                {daySlots.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {daySlots.length > 0 ? (
                daySlots.map((slot) => (
                  <div 
                    key={slot.id} 
                    className={cn(
                      "p-3 rounded-lg border text-left space-y-2 transition-all hover:shadow-sm",
                      slot.color || "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    )}
                  >
                    <div className="font-bold text-xs leading-tight line-clamp-1">{slot.subject}</div>
                    <div className="flex items-center text-[10px] opacity-80">
                      <Clock className="w-2.5 h-2.5 mr-1" />
                      {slot.startTime}
                    </div>
                    <div className="flex items-center text-[10px] opacity-80">
                      <MapPin className="w-2.5 h-2.5 mr-1" />
                      {slot.room}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center border border-dashed rounded-lg">
                  <span className="text-[10px] text-slate-400">No classes</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
