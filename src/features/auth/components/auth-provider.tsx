import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../shared/store/auth-store';
import { ROUTES } from '../../../shared/lib/constants';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const publicRoutes = [ROUTES.LOGIN, ROUTES.REGISTER];
    const isPublicRoute = publicRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (!isAuthenticated && !isPublicRoute) {
      navigate(ROUTES.LOGIN);
    }

    if (isAuthenticated && isPublicRoute) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
}