import { useState } from 'react';
import { DataTable } from '../../../shared/components/data-display/data-table';
import { EmptyState } from '../../../shared/components/data-display/empty-state';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { useTeachers } from '../hooks/use-teachers';
import { teacherColumns } from './teacher-columns';
import { Search, Plus } from 'lucide-react';
import { useDebounce } from '../../../shared/hooks/use-debounce';

interface TeacherListProps {
  onAddNew?: () => void;
}

export function TeacherList({ onAddNew }: TeacherListProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { data: teachers, isLoading } = useTeachers(debouncedSearch);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {onAddNew && (
          <Button onClick={onAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Teacher
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </div>
      ) : teachers?.length === 0 ? (
        <EmptyState
          title="No teachers found"
          description={search ? 'Try adjusting your search' : 'Add your first teacher to get started'}
          action={onAddNew ? { label: 'Add Teacher', onClick: onAddNew } : undefined}
        />
      ) : (
        <DataTable columns={teacherColumns} data={teachers || []} />
      )}
    </div>
  );
}