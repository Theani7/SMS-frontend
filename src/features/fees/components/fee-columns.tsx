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
    header: 'Student Name',
  },
  {
    accessorKey: 'className',
    header: 'Class',
  },
  {
    accessorKey: 'feeType',
    header: 'Fee Type',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => formatDate(row.original.dueDate),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const colorMap: Record<string, string> = {
        paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        pending: 'bg-amber-100 text-amber-700 border-amber-200',
        overdue: 'bg-red-100 text-red-700 border-red-200',
        waived: 'bg-blue-100 text-blue-700 border-blue-200',
      };
      return <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${colorMap[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>{status}</span>;
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