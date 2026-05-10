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
    <div className={cn('flex flex-col gap-5 p-4 lg:p-6', className)}>
      {title && (
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
          {description && (
            <p className="text-[13px] text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
