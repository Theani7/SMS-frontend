import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/store/auth-store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/lib/constants';

export function useLogout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // Could call logout API here
      await new Promise((resolve) => setTimeout(resolve, 200));
    },
    onSuccess: () => {
      logout();
      localStorage.removeItem('auth-token');
      navigate(ROUTES.LOGIN);
    },
  });
}
