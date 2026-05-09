import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types/user';

interface AuthState {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,

      login: (user) => set({
        user,
        role: user.role,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        role: null,
        isAuthenticated: false
      }),

      setRole: (role) => set({ role }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
