import { ColumnDef } from '@tanstack/react-table';
import type { Student } from '../types/student';
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
      const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        active: 'default',
        inactive: 'secondary',
        graduated: 'outline',
      };
      return <Badge variant={variants[status]}>{status}</Badge>;
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