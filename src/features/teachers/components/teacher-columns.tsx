import { ColumnDef } from '@tanstack/react-table';
import type { Teacher } from '../types/teacher';
import { Badge } from '../../../shared/components/ui/badge';
import { formatDate } from '../../../shared/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../shared/components/ui/dropdown-menu';

interface TeacherColumnsProps {
  onDelete: (id: string) => void;
}

export const teacherColumns = ({ onDelete }: TeacherColumnsProps): ColumnDef<Teacher>[] => [
  {
    accessorKey: 'employeeId',
    header: 'Employee ID',
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
    accessorKey: 'subject',
    header: 'Subject',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'hireDate',
    header: 'Hire Date',
    cell: ({ row }) => formatDate(row.original.hireDate),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
        active: 'default',
        inactive: 'secondary',
        'on-leave': 'secondary',
      };
      return <Badge variant={variants[status]}>{status}</Badge>;
    },
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