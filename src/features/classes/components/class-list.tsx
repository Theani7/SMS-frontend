import { useState } from 'react';
import { DataTable } from '../../../shared/components/data-display/data-table';
import { EmptyState } from '../../../shared/components/data-display/empty-state';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { useClasses } from '../hooks/use-classes';
import { classColumns } from './class-columns';
import { Search, Plus } from 'lucide-react';
import { useDebounce } from '../../../shared/hooks/use-debounce';

interface ClassListProps {
  onAddNew?: () => void;
}

export function ClassList({ onAddNew }: ClassListProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { data: classes, isLoading } = useClasses(debouncedSearch);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {onAddNew && (
          <Button onClick={onAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Class
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </div>
      ) : classes?.length === 0 ? (
        <EmptyState
          title="No classes found"
          description={search ? 'Try adjusting your search' : 'Add your first class to get started'}
          action={onAddNew ? { label: 'Add Class', onClick: onAddNew } : undefined}
        />
      ) : (
        <DataTable columns={classColumns} data={classes || []} />
      )}
    </div>
  );
}