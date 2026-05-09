import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { FormField } from '../../../shared/components/forms/form-field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { useCreateStudent } from '../hooks/use-create-student';
import { useUpdateStudent } from '../hooks/use-update-student';
import { useNavigate } from 'react-router-dom';
import type { Student } from '../types/student';
import { ROUTES } from '../../../shared/lib/constants';

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  classId: z.string().min(1, 'Please select a class'),
  dateOfBirth: z.string().min(1, 'Please enter date of birth'),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().optional(),
  address: z.string().optional(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  admissionDate: z.string().min(1, 'Please enter admission date'),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  student?: Student;
  onSuccess?: () => void;
}

export function StudentForm({ student, onSuccess }: StudentFormProps) {
  const navigate = useNavigate();
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const isEditing = !!student;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: student
      ? {
          name: student.name,
          email: student.email,
          classId: student.classId,
          dateOfBirth: student.dateOfBirth,
          gender: student.gender,
          phone: student.phone || '',
          address: student.address || '',
          parentName: student.parentName || '',
          parentPhone: student.parentPhone || '',
          admissionDate: student.admissionDate,
        }
      : {
          admissionDate: new Date().toISOString().split('T')[0],
        },
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      if (isEditing) {
        await updateStudent.mutateAsync({ id: student.id, data });
      } else {
        await createStudent.mutateAsync(data);
      }
      navigate(ROUTES.STUDENTS);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save student:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Student' : 'Add New Student'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Full Name" error={errors.name?.message} required>
              <Input placeholder="Enter student name" {...register('name')} />
            </FormField>

            <FormField label="Email" error={errors.email?.message} required>
              <Input type="email" placeholder="student@email.com" {...register('email')} />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Class" error={errors.classId?.message} required>
              <Select onValueChange={(value) => setValue('classId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-a">Grade 10-A</SelectItem>
                  <SelectItem value="class-b">Grade 10-B</SelectItem>
                  <SelectItem value="class-c">Grade 9-A</SelectItem>
                  <SelectItem value="class-d">Grade 9-B</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Date of Birth" error={errors.dateOfBirth?.message} required>
              <Input type="date" {...register('dateOfBirth')} />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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

            <FormField label="Phone" error={errors.phone?.message}>
              <Input placeholder="Optional phone number" {...register('phone')} />
            </FormField>
          </div>

          <FormField label="Address" error={errors.address?.message}>
            <Input placeholder="Optional address" {...register('address')} />
          </FormField>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Parent/Guardian Name" error={errors.parentName?.message}>
              <Input placeholder="Optional" {...register('parentName')} />
            </FormField>

            <FormField label="Parent Phone" error={errors.parentPhone?.message}>
              <Input placeholder="Optional" {...register('parentPhone')} />
            </FormField>
          </div>

          <FormField label="Admission Date" error={errors.admissionDate?.message} required>
            <Input type="date" {...register('admissionDate')} />
          </FormField>

          <div className="flex gap-4">
            <Button type="submit" disabled={createStudent.isPending || updateStudent.isPending}>
              {createStudent.isPending || updateStudent.isPending
                ? 'Saving...'
                : isEditing
                ? 'Update Student'
                : 'Add Student'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.STUDENTS)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}