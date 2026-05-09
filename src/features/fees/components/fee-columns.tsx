import { ColumnDef } from '@tanstack/react-table';
import type { Fee } from '../types/fee';
import { Badge } from '../../../shared/components/ui/badge';
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
      const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        pending: 'secondary',
        paid: 'default',
        overdue: 'destructive',
        waived: 'outline',
      };
      return <Badge variant={variants[status]}>{status}</Badge>;
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