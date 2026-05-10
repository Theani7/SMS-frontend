import { cn } from '../../lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  withMesh?: boolean;
}

export function PageContainer({
  children,
  className,
  title,
  description,
  withMesh = false
}: PageContainerProps) {
  return (
    <div className={cn(
      'flex flex-col gap-4 lg:gap-6 p-4 lg:p-6',
      withMesh && 'bg-mesh min-h-full -m-4 p-4 lg:-m-8 lg:p-8',
      className
    )}>
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
