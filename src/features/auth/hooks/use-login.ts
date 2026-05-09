import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/store/auth-store';
import { login as loginApi } from '../api';
import type { LoginCredentials } from '../types/auth';

export function useLogin() {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (data) => {
      login(data.user);
      // Store token in localStorage if needed
      localStorage.setItem('auth-token', data.token);
    },
  });
}
