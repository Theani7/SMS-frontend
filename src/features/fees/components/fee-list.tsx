import { useState } from 'react';
import { DataTable } from '../../../shared/components/data-display/data-table';
import { EmptyState } from '../../../shared/components/data-display/empty-state';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../shared/components/ui/dialog';
import { useFees } from '../hooks/use-fees';
import { feeColumns } from './fee-columns';
import { Search, Plus, X } from 'lucide-react';
import { useDebounce } from '../../../shared/hooks/use-debounce';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFee } from '../api';

interface FeeListProps {
  onAddNew?: () => void;
}

export function FeeList({ onAddNew }: FeeListProps) {
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  const queryClient = useQueryClient();
  const { data: fees, isLoading } = useFees(debouncedSearch);

  const deleteMutation = useMutation({
    mutationFn: deleteFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      setDeleteId(null);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm h-11 rounded-xl border border-slate-200 bg-white">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-10 pr-10 border-0 bg-transparent focus-visible:ring-0"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {onAddNew && (
          <Button onClick={onAddNew} className="h-11 px-5 rounded-xl shadow-button btn-lift gap-2">
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
        <DataTable columns={feeColumns({ onDelete: setDeleteId })} data={fees || []} />
      )}

      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this fee record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}