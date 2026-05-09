import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../shared/components/layout/sidebar';
import { Header } from '../../shared/components/layout/header';
import { useUIStore } from '../../shared/store/ui-store';

export function AppLayout() {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-muted/50">
      <Sidebar />
      <div className={sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}>
        <Header />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}