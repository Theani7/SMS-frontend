import { CreditCard } from 'lucide-react';

export function QuickFees() {
  return (
    <section className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-white overflow-hidden relative shadow-lg">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
      <div className="relative z-10">
        <p className="text-[10px] font-bold text-indigo-300 uppercase mb-1 flex items-center gap-1.5">
          <CreditCard className="h-3 w-3" />
          Outstanding Balance
        </p>
        <div className="text-2xl font-bold tracking-tight">$1,240.00</div>
        <p className="text-[10px] text-indigo-300/60 mt-1 font-medium">Due by May 15</p>
        <button className="w-full mt-4 py-2 px-4 rounded-lg bg-white text-slate-900 text-[11px] font-bold hover:bg-indigo-50 transition-all duration-150 active:scale-95">
          Pay via Portal
        </button>
      </div>
    </section>
  );
}
