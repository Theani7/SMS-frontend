import { cn } from '../../lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function PageContainer({
  children,
  className,
  title,
  description
}: PageContainerProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {title && (
        <div className="flex flex-col gap-1 border-b pb-4 mb-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
