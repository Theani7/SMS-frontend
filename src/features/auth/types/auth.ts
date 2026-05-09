import type { User } from '../../../shared/types/user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'teacher' | 'parent' | 'student';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface MockUser extends User {
  password?: string;
}
