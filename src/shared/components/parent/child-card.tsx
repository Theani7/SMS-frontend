import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

interface ChildData {
  id: string;
  name: string;
  class: string;
  hasOverdueFees?: boolean;
  hasRecentAbsence?: boolean;
}

interface ChildCardProps {
  child: ChildData;
}

export function ChildCard({ child }: ChildCardProps) {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getBorderColor = () => {
    if (child.hasOverdueFees) return 'border-rose-300 dark:border-rose-800';
    if (child.hasRecentAbsence) return 'border-amber-300 dark:border-amber-800';
    return 'border-slate-200 dark:border-slate-800';
  };

  const getStatusDot = () => {
    if (child.hasOverdueFees) {
      return <div className="h-2 w-2 rounded-full bg-rose-500" />;
    }
    if (child.hasRecentAbsence) {
      return <div className="h-2 w-2 rounded-full bg-amber-500" />;
    }
    return null;
  };

  return (
    <Card
      onClick={() => navigate(`/children/${child.id}`)}
      className={cn(
        'cursor-pointer transition-all duration-150 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600',
        getBorderColor()
      )}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300">
          {getInitials(child.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {child.name}
            </p>
            {getStatusDot()}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {child.class}
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
      </CardContent>
    </Card>
  );
}
