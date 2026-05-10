import { UserPlus, GraduationCap, DollarSign, ClipboardCheck } from 'lucide-react';
import { cn } from '../../../shared/lib/utils';

interface ActionButtonProps {
  icon: typeof UserPlus;
  label: string;
  onClick?: () => void;
  className?: string;
}

function ActionButton({ icon: Icon, label, onClick, className }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm",
        "transition-all duration-150 ease-out hover:bg-indigo-50/50 hover:border-indigo-500/20 hover:-translate-y-0.5 group",
        className
      )}
    >
      <div className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-100/50 dark:group-hover:bg-indigo-900/30 transition-colors">
        <Icon className="h-[14px] w-[14px] text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
      </div>
      <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>
    </button>
  );
}

export function ActionVault() {
  const actions = [
    { icon: UserPlus, label: 'Add Student' },
    { icon: GraduationCap, label: 'Add Teacher' },
    { icon: DollarSign, label: 'Record Fee' },
    { icon: ClipboardCheck, label: 'Mark Attendance' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {actions.map((action) => (
        <ActionButton
          key={action.label}
          icon={action.icon}
          label={action.label}
        />
      ))}
    </div>
  );
}
