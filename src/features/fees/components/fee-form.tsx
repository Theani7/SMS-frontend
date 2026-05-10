import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { FormField } from '../../../shared/components/forms/form-field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { useCreateFee } from '../hooks/use-create-fee';
import { useUpdateFee } from '../hooks/use-update-fee';
import { useNavigate } from 'react-router-dom';
import type { Fee } from '../types/fee';
import { ROUTES } from '../../../shared/lib/constants';
import { FEE_TYPES } from '../types/fee';

const feeSchema = z.object({
  studentId: z.string().min(1, 'Please select a student'),
  feeType: z.string().min(1, 'Please select fee type'),
  amount: z.number().min(1, 'Amount must be at least 1'),
  dueDate: z.string().min(1, 'Please select due date'),
  remarks: z.string().optional(),
});

type FeeFormData = z.infer<typeof feeSchema>;

interface FeeFormProps {
  fee?: Fee;
  onSuccess?: () => void;
}

const students = [
  { id: '1', name: 'Emma Wilson', class: 'Grade 10-A' },
  { id: '2', name: 'James Brown', class: 'Grade 10-A' },
  { id: '3', name: 'Olivia Davis', class: 'Grade 10-B' },
  { id: '4', name: 'Noah Martinez', class: 'Grade 10-B' },
  { id: '5', name: 'Ava Anderson', class: 'Grade 9-A' },
  { id: '6', name: 'Liam Thomas', class: 'Grade 9-A' },
  { id: '7', name: 'Sophia White', class: 'Grade 9-B' },
  { id: '8', name: 'Mason Lee', class: 'Grade 9-B' },
];

export function FeeForm({ fee, onSuccess }: FeeFormProps) {
  const navigate = useNavigate();
  const createFee = useCreateFee();
  const updateFee = useUpdateFee();
  const isEditing = !!fee;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FeeFormData>({
    resolver: zodResolver(feeSchema),
    defaultValues: fee
      ? {
          studentId: fee.studentId,
          feeType: fee.feeType,
          amount: fee.amount,
          dueDate: fee.dueDate,
          remarks: fee.remarks || '',
        }
      : {},
  });

  const onSubmit = async (data: FeeFormData) => {
    if (isEditing) {
      await updateFee.mutateAsync({ id: fee.id, data });
    } else {
      await createFee.mutateAsync(data);
    }
    navigate(ROUTES.FEES);
    onSuccess?.();
  };

  return (
    <Card className="shadow-soft border-slate-200/60 dark:border-slate-800/60 rounded-xl bg-white dark:bg-slate-950 max-w-2xl mx-auto">
      <CardHeader className="border-b border-slate-100/60 dark:border-slate-800/60 pb-4">
        <CardTitle className="text-lg font-semibold">{isEditing ? 'Edit Fee' : 'Add New Fee'}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField label="Student" error={errors.studentId?.message} required>
            <Select onValueChange={(value) => setValue('studentId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} ({s.class})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Fee Type" error={errors.feeType?.message} required>
            <Select onValueChange={(value) => setValue('feeType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fee type" />
              </SelectTrigger>
              <SelectContent>
                {FEE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Amount" error={errors.amount?.message} required>
              <Input type="number" placeholder="0.00" {...register('amount', { valueAsNumber: true })} />
            </FormField>

            <FormField label="Due Date" error={errors.dueDate?.message} required>
              <Input type="date" {...register('dueDate')} />
            </FormField>
          </div>

          <FormField label="Remarks" error={errors.remarks?.message}>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Optional remarks..."
              {...register('remarks')}
            />
          </FormField>

          <div className="flex gap-4">
            <Button type="submit" className="w-full h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-button btn-lift gap-2" disabled={createFee.isPending || updateFee.isPending}>
              {createFee.isPending || updateFee.isPending
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                : isEditing
                ? 'Update Fee'
                : 'Add Fee'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.FEES)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}