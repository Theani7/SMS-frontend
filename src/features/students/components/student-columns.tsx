import { ColumnDef } from '@tanstack/react-table';
import type { Student } from '../types/student';
import { formatDate } from '../../../shared/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../shared/components/ui/dropdown-menu';

interface StudentColumnsProps {
  onDelete: (id: string) => void;
}

export const studentColumns = ({ onDelete }: StudentColumnsProps): ColumnDef<Student>[] => [
  {
    accessorKey: 'rollNo',
    header: 'Roll No',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'class',
    header: 'Class',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'DOB',
    cell: ({ row }) => formatDate(row.original.dateOfBirth),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const colorMap: Record<string, string> = {
        active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        inactive: 'bg-slate-100 text-slate-600 border-slate-200',
        graduated: 'bg-blue-100 text-blue-700 border-blue-200',
      };
      return <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${colorMap[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>{status}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem aria-label="Delete" className="text-destructive" onSelect={(e) => {
                e.preventDefault();
                onDelete(row.original.id);
              }}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];