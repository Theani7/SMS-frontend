import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { FormField } from '../../../shared/components/forms/form-field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { useCreateClass } from '../hooks/use-create-class';
import { useUpdateClass } from '../hooks/use-update-class';
import { useNavigate } from 'react-router-dom';
import type { Class } from '../types/class';
import { ROUTES } from '../../../shared/lib/constants';

const classSchema = z.object({
  grade: z.string().min(1, 'Please select a grade'),
  section: z.string().min(1, 'Please enter section'),
  teacherId: z.string().min(1, 'Please select a teacher'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  roomNumber: z.string().optional(),
  schedule: z.string().optional(),
});

type ClassFormData = z.infer<typeof classSchema>;

interface ClassFormProps {
  cls?: Class;
  onSuccess?: () => void;
}

const teachers = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Michael Chen' },
  { id: '3', name: 'Emily Davis' },
  { id: '4', name: 'Robert Wilson' },
  { id: '5', name: 'Jessica Martinez' },
  { id: '6', name: 'David Thompson' },
];

const grades = ['6', '7', '8', '9', '10', '11', '12'];

export function ClassForm({ cls, onSuccess }: ClassFormProps) {
  const navigate = useNavigate();
  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  const isEditing = !!cls;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: cls
      ? {
          grade: cls.grade,
          section: cls.section,
          teacherId: cls.teacherId,
          capacity: cls.capacity,
          roomNumber: cls.roomNumber || '',
          schedule: cls.schedule || '',
        }
      : {},
  });

  const onSubmit = async (data: ClassFormData) => {
    if (isEditing) {
      await updateClass.mutateAsync({ id: cls.id, data });
    } else {
      await createClass.mutateAsync(data);
    }
    navigate(ROUTES.CLASSES);
    onSuccess?.();
  };

  return (
    <Card className="shadow-soft border-slate-200/60 dark:border-slate-800/60 rounded-xl bg-white dark:bg-slate-950 max-w-2xl mx-auto">
      <CardHeader className="border-b border-slate-100/60 dark:border-slate-800/60 pb-4">
        <CardTitle className="text-lg font-semibold">{isEditing ? 'Edit Class' : 'Add New Class'}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Grade" error={errors.grade?.message} required>
              <Select onValueChange={(value) => setValue('grade', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Section" error={errors.section?.message} required>
              <Input placeholder="e.g., A, B, C" {...register('section')} />
            </FormField>
          </div>

          <FormField label="Class Teacher" error={errors.teacherId?.message} required>
            <Select onValueChange={(value) => setValue('teacherId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Capacity" error={errors.capacity?.message} required>
              <Input type="number" placeholder="30" {...register('capacity', { valueAsNumber: true })} />
            </FormField>

            <FormField label="Room Number" error={errors.roomNumber?.message}>
              <Input placeholder="Optional" {...register('roomNumber')} />
            </FormField>
          </div>

          <FormField label="Schedule" error={errors.schedule?.message}>
            <Input placeholder="e.g., Mon-Fri 9:00 AM" {...register('schedule')} />
          </FormField>

          <div className="flex gap-4">
            <Button type="submit" className="w-full h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-button btn-lift gap-2" disabled={createClass.isPending || updateClass.isPending}>
              {createClass.isPending || updateClass.isPending
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                : isEditing
                ? 'Update Class'
                : 'Add Class'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.CLASSES)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}