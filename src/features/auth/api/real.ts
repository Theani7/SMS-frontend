import type { LoginCredentials, AuthResponse, RegisterData } from '../types/auth';
import { apiClient } from '../../../api/client';

export async function realLogin(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
}

export async function realRegister(data: RegisterData): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
}
