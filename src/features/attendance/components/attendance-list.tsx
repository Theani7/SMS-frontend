import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/ui/table';
import { Badge } from '../../../shared/components/ui/badge';
import { EmptyState } from '../../../shared/components/data-display/empty-state';
import { useAttendance } from '../hooks/use-attendance';
import { AttendanceFilters } from './attendance-filters';
import { formatDate, cn } from '../../../shared/lib/utils';
import type { AttendanceFilters as Filters } from '../types/attendance';

export function AttendanceList() {
  const [filters, setFilters] = useState<Filters>({});
  const { data: attendance, isLoading } = useAttendance(filters);

  const getStatusBadge = (status: 'present' | 'absent' | 'late') => {
    const variants = {
      present: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
      absent: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50",
      late: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
    };
    return (
      <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5", variants[status])}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">History Log</h3>
        <AttendanceFilters onFilter={setFilters} />
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-50 dark:bg-slate-900 rounded-xl" />
          ))}
        </div>
      ) : attendance?.length === 0 ? (
        <EmptyState
          title="No attendance records"
          description="Try adjusting your filters or mark attendance for today"
        />
      ) : (
        <div className="border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 shadow-soft">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow className="border-slate-100 dark:border-slate-900 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6">Class / Subject</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6">Date</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6 text-center">Status</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-6">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance?.map((record) => (
                <TableRow key={record.id} className="border-slate-50 dark:border-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                  <TableCell className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{record.className}</p>
                    <p className="text-[10px] font-medium text-slate-500">Scheduled Session</p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{formatDate(record.date)}</p>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    {getStatusBadge(record.status)}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-xs text-slate-500 italic">{record.remarks || 'No remarks recorded'}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
