import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/ui/table';
import { Badge } from '../../../shared/components/ui/badge';
import { EmptyState } from '../../../shared/components/data-display/empty-state';
import { useAttendance } from '../hooks/use-attendance';
import { AttendanceFilters } from './attendance-filters';
import { formatDate } from '../../../shared/lib/utils';
import type { AttendanceFilters as Filters } from '../types/attendance';

export function AttendanceList() {
  const [filters, setFilters] = useState<Filters>({});
  const { data: attendance, isLoading } = useAttendance(filters);

  const getStatusBadge = (status: 'present' | 'absent' | 'late') => {
    const variants: Record<string, 'default' | 'destructive' | 'secondary'> = {
      present: 'default',
      absent: 'destructive',
      late: 'secondary',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <AttendanceFilters onFilter={setFilters} />

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </div>
      ) : attendance?.length === 0 ? (
        <EmptyState
          title="No attendance records"
          description="Try adjusting your filters or mark attendance for today"
        />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance?.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.studentName}</TableCell>
                  <TableCell>{record.className}</TableCell>
                  <TableCell>{formatDate(record.date)}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{record.remarks || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
