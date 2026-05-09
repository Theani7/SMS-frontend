import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { FormField } from '../../../shared/components/forms/form-field';
import { useLogin } from '../hooks/use-login';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/lib/constants';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
    onSuccess?.();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Email" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="name@example.com"
              {...register('email')}
            />
          </FormField>

          <FormField label="Password" error={errors.password?.message}>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />
          </FormField>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
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

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center mb-2">
            Demo Credentials:
          </p>
          <div className="text-xs space-y-1">
            <p><strong>Admin:</strong> admin@school.com / admin123</p>
            <p><strong>Teacher:</strong> teacher@school.com / teacher123</p>
            <p><strong>Parent:</strong> parent@school.com / parent123</p>
            <p><strong>Student:</strong> student@school.com / student123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
