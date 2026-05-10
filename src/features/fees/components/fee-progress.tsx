import { Button } from '../../../shared/components/ui/button';
import { CreditCard, ArrowUpRight, Clock, Loader2 } from 'lucide-react';
import { usePayFee } from '../hooks/use-fees';

interface FeeProgressProps {
  totalFees: number;
  paidFees: number;
  nextDueDate?: string;
}

export function FeeProgress({ totalFees, paidFees, nextDueDate }: FeeProgressProps) {
  const percentage = Math.round((paidFees / totalFees) * 100);
  const outstanding = totalFees - paidFees;
  const { mutate: pay, isPending } = usePayFee();

  return (
    <div className="space-y-6">
      {/* Primary Balance Card */}
      <div className="p-6 rounded-2xl bg-indigo-600 dark:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 h-32 w-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
              <CreditCard className="h-5 w-5" />
            </div>
            {nextDueDate && (
              <div className="px-2 py-1 bg-rose-500/20 border border-rose-500/30 rounded-lg flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-rose-200" />
                <span className="text-[10px] font-bold text-rose-100 uppercase tracking-wider">Due May 15</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">Total Outstanding</p>
            <h2 className="text-4xl font-black tracking-tight">${outstanding.toLocaleString()}.00</h2>
          </div>

          <Button 
            onClick={() => pay()}
            disabled={isPending || outstanding <= 0}
            className="w-full h-11 bg-white text-indigo-600 hover:bg-slate-50 font-black text-xs uppercase tracking-widest rounded-xl shadow-button btn-lift border-0"
          >
            {isPending ? (
              <>Processing... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
            ) : (
              <>Pay Now <ArrowUpRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-soft">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">Term Payment Progress</h3>
        
        <div className="flex items-center gap-6">
          <div className="relative h-20 w-20 flex items-center justify-center">
            <svg className="h-full w-full absolute -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="16"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="3.5"
                fill="none"
              />
              <circle
                cx="18" cy="18" r="16"
                className="stroke-indigo-500 transition-all duration-1000"
                strokeWidth="3.5"
                fill="none"
                strokeDasharray={`${percentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-lg font-black text-slate-900 dark:text-slate-100 leading-none">{percentage}%</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Paid</p>
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Paid Amount</p>
              <p className="text-sm font-black text-emerald-600">${paidFees.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Total Term Fee</p>
              <p className="text-sm font-black text-slate-900 dark:text-slate-100">${totalFees.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
