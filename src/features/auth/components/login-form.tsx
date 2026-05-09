import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { useLogin } from '../hooks/use-login';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/lib/constants';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      onSuccess?.();
    } catch {
      // Error is handled by mutation state
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100 shadow-sm">
      <CardHeader className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="h-12 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="h-12 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl gap-2"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>

          {loginMutation.isError && (
            <p className="text-sm text-destructive text-center">
              {loginMutation.error.message}
            </p>
          )}
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Don't have an account?{' '}
          </span>
          <Link
            to={ROUTES.REGISTER}
            className="text-primary hover:underline font-medium"
          >
            Register
          </Link>
        </div>

        <Card className="mt-6 bg-white/60 border-indigo-100">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground text-center mb-3 font-medium">
              Demo Credentials
            </p>
            <div className="text-xs space-y-1.5">
              <p><strong className="text-slate-700">Admin:</strong> <span className="text-muted-foreground">admin@school.com / admin123</span></p>
              <p><strong className="text-slate-700">Teacher:</strong> <span className="text-muted-foreground">teacher@school.com / teacher123</span></p>
              <p><strong className="text-slate-700">Parent:</strong> <span className="text-muted-foreground">parent@school.com / parent123</span></p>
              <p><strong className="text-slate-700">Student:</strong> <span className="text-muted-foreground">student@school.com / student123</span></p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}