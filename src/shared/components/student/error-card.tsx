import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

interface ErrorCardProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorCard({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: ErrorCardProps) {
  return (
    <Card
      className={cn(
        'border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20',
        className
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
          <AlertCircle className="h-7 w-7 text-rose-500 dark:text-rose-400" />
        </div>
        <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="mb-4 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
