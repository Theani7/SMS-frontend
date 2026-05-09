import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { FormField } from '../../../shared/components/forms/form-field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { useCreateTeacher } from '../hooks/use-create-teacher';
import { useUpdateTeacher } from '../hooks/use-update-teacher';
import { useNavigate } from 'react-router-dom';
import type { Teacher } from '../types/teacher';
import { ROUTES } from '../../../shared/lib/constants';

const teacherSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(1, 'Please select a subject'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]*$/, 'Invalid phone format').optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Please enter date of birth'),
  gender: z.enum(['male', 'female', 'other']),
  hireDate: z.string().min(1, 'Please enter hire date'),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

interface TeacherFormProps {
  teacher?: Teacher;
  onSuccess?: () => void;
}

export function TeacherForm({ teacher, onSuccess }: TeacherFormProps) {
  const navigate = useNavigate();
  const createTeacher = useCreateTeacher();
  const updateTeacher = useUpdateTeacher();
  const isEditing = !!teacher;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: teacher
      ? {
          name: teacher.name,
          email: teacher.email,
          subject: teacher.subject,
          phone: teacher.phone || '',
          address: teacher.address || '',
          dateOfBirth: teacher.dateOfBirth,
          gender: teacher.gender,
          hireDate: teacher.hireDate,
        }
      : {
          hireDate: new Date().toISOString().split('T')[0],
        },
  });

  const onSubmit = async (data: TeacherFormData) => {
    if (isEditing) {
      await updateTeacher.mutateAsync({ id: teacher.id, data });
    } else {
      await createTeacher.mutateAsync(data);
    }
    navigate(ROUTES.TEACHERS);
    onSuccess?.();
  };

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science', 'Art', 'Music'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Teacher' : 'Add New Teacher'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Full Name" error={errors.name?.message} required>
              <Input placeholder="Enter teacher name" {...register('name')} />
            </FormField>

            <FormField label="Email" error={errors.email?.message} required>
              <Input type="email" placeholder="teacher@school.com" {...register('email')} />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Subject" error={errors.subject?.message} required>
              <Select onValueChange={(value) => setValue('subject', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Phone" error={errors.phone?.message}>
              <Input placeholder="Optional phone" {...register('phone')} />
            </FormField>
          </div>

          <FormField label="Address" error={errors.address?.message}>
            <Input placeholder="Optional address" {...register('address')} />
          </FormField>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Date of Birth" error={errors.dateOfBirth?.message} required>
              <Input type="date" {...register('dateOfBirth')} />
            </FormField>

            <FormField label="Gender" error={errors.gender?.message} required>
              <Select onValueChange={(value) => setValue('gender', value as 'male' | 'female' | 'other')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField label="Hire Date" error={errors.hireDate?.message} required>
            <Input type="date" {...register('hireDate')} />
          </FormField>

          <div className="flex gap-4">
            <Button type="submit" className="gap-2" disabled={createTeacher.isPending || updateTeacher.isPending}>
              {createTeacher.isPending || updateTeacher.isPending
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                : isEditing
                ? 'Update Teacher'
                : 'Add Teacher'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.TEACHERS)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}