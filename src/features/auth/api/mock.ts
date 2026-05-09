import type { LoginCredentials, AuthResponse, MockUser } from '../types/auth';
import { mockDb } from '../../../api/mock/database';

export async function mockLogin(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockDb.users.find(
    (u: MockUser) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const { password, ...safeUser } = user;
  return {
    user: safeUser,
    token: `mock-token-${user.id}-${Date.now()}`,
  };
}

export async function mockRegister(data: {
  email: string;
  password: string;
  name: string;
  role: string;
}): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const existingUser = mockDb.users.find((u: MockUser) => u.email === data.email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const newUser: MockUser = {
    id: String(mockDb.users.length + 1),
    email: data.email,
    password: data.password,
    name: data.name,
    role: data.role as MockUser['role'],
    createdAt: new Date().toISOString(),
  };

  mockDb.users.push(newUser);

  const { password, ...safeUser } = newUser;
  return {
    user: safeUser,
    token: `mock-token-${newUser.id}-${Date.now()}`,
  };
}
