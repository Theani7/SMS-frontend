import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../shared/store/auth-store';
import { ROUTES } from '../../shared/lib/constants';

export function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-md p-8">
        <Outlet />
      </div>
    </div>
  );
}