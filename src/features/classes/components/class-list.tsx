import { useState, useMemo } from 'react';
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
import { useClasses } from '../hooks/use-classes';
import { classColumns } from './class-columns';
import { Search, Plus, X } from 'lucide-react';
import { useDebounce } from '../../../shared/hooks/use-debounce';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteClass } from '../api';

interface ClassListProps {
  onAddNew?: () => void;
}

export function ClassList({ onAddNew }: ClassListProps) {
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  const queryClient = useQueryClient();
  const { data: classes, isLoading } = useClasses(debouncedSearch);

  const columns = useMemo(() => classColumns({ onDelete: setDeleteId }), [setDeleteId]);

  const deleteMutation = useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      setDeleteId(null);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm h-10 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-10 pr-10 border-0 bg-transparent focus-visible:ring-0 text-sm"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </Button>
          )}
        </div>
        {onAddNew && (
          <Button onClick={onAddNew} className="h-10 px-5 rounded-xl shadow-button btn-lift gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-0">
            <Plus aria-hidden="true" className="h-4 w-4" />
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
        <DataTable columns={columns} data={classes || []} />
      )}

      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this class? This action cannot be undone.
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