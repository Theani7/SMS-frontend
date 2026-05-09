import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../shared/store/auth-store';
import { ROUTES } from '../../../shared/lib/constants';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const isPublicRoute = ([ROUTES.LOGIN, ROUTES.REGISTER] as string[]).includes(location.pathname);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (!isAuthenticated && !isPublicRoute) {
      navigate(ROUTES.LOGIN);
    }

    if (isAuthenticated && isPublicRoute) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, location.pathname, navigate, isPublicRoute]);

  return <>{children}</>;
}