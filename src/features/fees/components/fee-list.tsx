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
import { useFees } from '../hooks/use-fees';
import { feeColumns } from './fee-columns';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../../shared/hooks/use-debounce';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFee } from '../api';

export function FeeList() {
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  const queryClient = useQueryClient();
  const { data: fees, isLoading } = useFees(debouncedSearch);

  const columns = useMemo(() => feeColumns({ onDelete: setDeleteId }), [setDeleteId]);

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
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Transaction History</h3>
        <div className="relative flex-1 max-w-sm h-10 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-10 pr-10 border-0 bg-transparent focus-visible:ring-0 text-xs"
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
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-slate-50 dark:bg-slate-900 rounded-xl" />
          ))}
        </div>
      ) : fees?.length === 0 ? (
        <EmptyState
          title={search ? "No transactions match your search." : "All caught up — no outstanding fees."}
          description={search ? "Try adjusting your search terms." : "Your payment history will appear here."}
        />
      ) : (
        <div className="border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 shadow-soft">
          <DataTable columns={columns} data={fees || []} />
        </div>
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