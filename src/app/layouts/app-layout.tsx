import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../shared/components/layout/sidebar';
import { Header } from '../../shared/components/layout/header';
import { useUIStore } from '../../shared/store/ui-store';
import { cn } from '../../shared/lib/utils';

export function AppLayout() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-muted/50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <Sidebar />
      <div
        id="main-content"
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-14' : 'lg:ml-60'
        )}
      >
        <Header />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}