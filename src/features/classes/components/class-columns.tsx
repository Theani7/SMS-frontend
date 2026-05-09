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

export const classColumns: ColumnDef<Class>[] = [
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
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];