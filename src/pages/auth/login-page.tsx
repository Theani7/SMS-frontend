import { LoginForm } from '../../features/auth/components/login-form';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <LoginForm />
    </div>
  );
}
