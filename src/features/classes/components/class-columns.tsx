import { ColumnDef } from '@tanstack/react-table';
import type { Class } from '../types/class';
import { Badge } from '../../../shared/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../shared/components/ui/dropdown-menu';

interface ClassColumnsProps {
  onDelete: (id: string) => void;
}

export const classColumns = ({ onDelete }: ClassColumnsProps): ColumnDef<Class>[] => [
  {
    accessorKey: 'name',
    header: 'Class Name',
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
  },
  {
    accessorKey: 'section',
    header: 'Section',
  },
  {
    accessorKey: 'teacherName',
    header: 'Class Teacher',
  },
  {
    accessorKey: 'currentStrength',
    header: 'Strength',
    cell: ({ row }) => `${row.original.currentStrength}/${row.original.capacity}`,
  },
  {
    accessorKey: 'roomNumber',
    header: 'Room',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      );
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