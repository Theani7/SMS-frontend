import { useState } from 'react';
import { DataTable } from '../../../shared/components/data-display/data-table';
import { EmptyState } from '../../../shared/components/data-display/empty-state';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { useFees } from '../hooks/use-fees';
import { feeColumns } from './fee-columns';
import { Search, Plus } from 'lucide-react';
import { useDebounce } from '../../../shared/hooks/use-debounce';

interface FeeListProps {
  onAddNew?: () => void;
}

export function FeeList({ onAddNew }: FeeListProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { data: fees, isLoading } = useFees(debouncedSearch);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        {onAddNew && (
          <Button onClick={onAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Fee
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </div>
      ) : fees?.length === 0 ? (
        <EmptyState
          title="No fees found"
          description={search ? 'Try adjusting your search' : 'Add your first fee record to get started'}
          action={onAddNew ? { label: 'Add Fee', onClick: onAddNew } : undefined}
        />
      ) : (
        <DataTable columns={feeColumns} data={fees || []} />
      )}
    </div>
  );
}