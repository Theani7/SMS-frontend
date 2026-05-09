import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { FormField } from '../../../shared/components/forms/form-field';
import { useMarkAttendance } from '../hooks/use-mark-attendance';
import { useClassOptions } from '../hooks/use-class-options';
import type { AttendanceMark } from '../types/attendance';

const attendanceSchema = z.object({
  classId: z.string().min(1, 'Please select a class'),
  date: z.string().min(1, 'Please select a date'),
  studentId: z.string().min(1, 'Please select a student'),
  status: z.enum(['present', 'absent', 'late']),
  remarks: z.string().optional(),
});

type AttendanceFormData = z.infer<typeof attendanceSchema>;

export function AttendanceForm() {
  const [, setSelectedClass] = useState<string>('');
  const markAttendance = useMarkAttendance();
  const { data: classes } = useClassOptions();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const students = [
    { id: '1', name: 'Emma Wilson' },
    { id: '2', name: 'James Brown' },
    { id: '3', name: 'Olivia Davis' },
  ];

  const onSubmit = async (data: AttendanceFormData) => {
    const record: AttendanceMark = {
      studentId: data.studentId,
      status: data.status,
      remarks: data.remarks,
    };

    await markAttendance.mutateAsync([record]);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Class" error={errors.classId?.message}>
              <Select
                onValueChange={(value) => {
                  setValue('classId', value);
                  setSelectedClass(value);
                  setValue('studentId', '');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes?.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Date" error={errors.date?.message}>
              <Input type="date" {...register('date')} />
            </FormField>
          </div>

          <FormField label="Student" error={errors.studentId?.message}>
            <Select onValueChange={(value) => setValue('studentId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Status" error={errors.status?.message}>
            <Select onValueChange={(value) => setValue('status', value as 'present' | 'absent' | 'late')}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Remarks" error={errors.remarks?.message}>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Optional remarks..."
              {...register('remarks')}
            />
          </FormField>

          <Button
            type="submit"
            className="w-full"
            disabled={markAttendance.isPending}
          >
            {markAttendance.isPending ? 'Marking...' : 'Mark Attendance'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
