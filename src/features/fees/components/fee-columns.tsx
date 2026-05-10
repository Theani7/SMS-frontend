import { ColumnDef } from '@tanstack/react-table';
import type { Fee } from '../types/fee';
import { formatDate, formatCurrency } from '../../../shared/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../shared/components/ui/dropdown-menu';

interface FeeColumnsProps {
  onDelete: (id: string) => void;
}

export const feeColumns = ({ onDelete }: FeeColumnsProps): ColumnDef<Fee>[] => [
  {
    accessorKey: 'studentName',
    header: () => (
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student</span>
    ),
  },
  {
    accessorKey: 'className',
    header: () => (
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class</span>
    ),
  },
  {
    accessorKey: 'feeType',
    header: () => (
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fee Type</span>
    ),
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{row.original.feeType}</p>
        <p className="text-[10px] text-slate-500 font-medium">Academic Year 25/26</p>
      </div>
    )
  },
  {
    accessorKey: 'amount',
    header: () => (
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</span>
    ),
    cell: ({ row }) => <span className="text-xs font-black text-slate-900 dark:text-slate-100">{formatCurrency(row.original.amount)}</span>,
  },
  {
    accessorKey: 'dueDate',
    header: () => (
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Due Date</span>
    ),
    cell: ({ row }) => <span className="text-xs font-medium text-slate-500">{formatDate(row.original.dueDate)}</span>,
  },
  {
    accessorKey: 'status',
    header: () => (
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const variants: Record<string, string> = {
        paid: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50',
        pending: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50',
        overdue: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50',
        waived: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50',
      };
      return (
        <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${variants[status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'paidDate',
    header: 'Paid Date',
    cell: ({ row }) => row.original.paidDate ? formatDate(row.original.paidDate) : '-',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          {row.original.status === 'pending' && (
            <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
          )}
          <DropdownMenuItem aria-label="Delete" className="text-destructive" onSelect={(e) => {
              e.preventDefault();
              onDelete(row.original.id);
            }}>
              Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];