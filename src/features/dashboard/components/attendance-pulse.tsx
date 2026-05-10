import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';
import { cn } from '../../../shared/lib/utils';
import { Activity } from 'lucide-react';

const CLASSES = ['10-A', '10-B', '9-A', '9-B', '8-A'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// Mock data generator for the heatmap
const generateMockPulse = () => {
  return CLASSES.map(cls => ({
    className: cls,
    data: DAYS.map(day => ({
      day,
      percentage: Math.floor(Math.random() * (100 - 75 + 1)) + 75, // Random % between 75 and 100
    }))
  }));
};

const pulseData = generateMockPulse();

const getHealthColor = (percentage: number) => {
  if (percentage >= 95) return 'bg-emerald-500';
  if (percentage >= 90) return 'bg-emerald-300';
  if (percentage >= 80) return 'bg-amber-400';
  return 'bg-red-400';
};

export function AttendancePulse() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
            <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight">Attendance Pulse</CardTitle>
            <CardDescription className="text-xs">Weekly health by class</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-2">
          <div className="flex flex-col gap-2 min-w-[400px]">
            {/* Header row for days */}
            <div className="flex items-center gap-2 mb-1">
              <div className="w-10" /> {/* Spacer for class names */}
              {DAYS.map(day => (
                <div key={day} className="flex-1 text-center text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                  {day}
                </div>
              ))}
            </div>

            {/* Rows for classes */}
            {pulseData.map((row) => (
              <div key={row.className} className="flex items-center gap-2">
                <div className="w-10 text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-tight">
                  {row.className}
                </div>
                <div className="flex-1 flex gap-1">
                  {row.data.map((cell, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex-1 h-5 rounded-sm transition-all duration-200 hover:scale-110 cursor-help",
                        getHealthColor(cell.percentage)
                      )}
                      title={`${row.className} - ${cell.day}: ${cell.percentage}%`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-medium text-slate-500">95%+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-300" />
            <span className="text-[10px] font-medium text-slate-500">90%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-[10px] font-medium text-slate-500">80%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <span className="text-[10px] font-medium text-slate-500">&lt;80%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
