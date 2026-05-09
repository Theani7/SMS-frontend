import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../shared/components/layout/sidebar';
import { Header } from '../../shared/components/layout/header';

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <Sidebar />
      <div
        id="main-content"
        className="flex flex-col flex-1 min-w-0 overflow-hidden"
      >
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50">
          <div className="px-4 py-5 lg:px-8 lg:py-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}