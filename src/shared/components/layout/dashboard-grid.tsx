import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface DashboardGridProps {
  children: ReactNode;
  sidebar: ReactNode;
  className?: string;
}

/**
 * A 12-column grid layout for dashboards.
 * Desktop (lg+): 8 columns for main content, 4 columns for sidebar.
 * Mobile/Tablet: Stacked layout.
 */
export function DashboardGrid({ children, sidebar, className }: DashboardGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-12', className)}>
      {/* Main Stage Area (8 columns) */}
      <div className="flex flex-col gap-6 lg:col-span-8">
        {children}
      </div>

      {/* Utility Sidebar Area (4 columns) */}
      <div className="flex flex-col gap-6 lg:col-span-4">
        {sidebar}
      </div>
    </div>
  );
}
