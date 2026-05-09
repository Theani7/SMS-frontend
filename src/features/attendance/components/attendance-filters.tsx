import { useForm } from 'react-hook-form';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { FormField } from '../../../shared/components/forms/form-field';
import type { AttendanceFilters } from '../types/attendance';
import { useClassOptions } from '../hooks/use-class-options';
import { Search, Filter, X } from 'lucide-react';

interface AttendanceFiltersProps {
  onFilter: (filters: AttendanceFilters) => void;
}

export function AttendanceFilters({ onFilter }: AttendanceFiltersProps) {
  const { data: classes } = useClassOptions();
  const { register, handleSubmit, watch, setValue, reset } = useForm<AttendanceFilters>({
    defaultValues: {
      classId: '',
      date: '',
      status: undefined,
      search: '',
    },
  });

  const onSubmit = (data: AttendanceFilters) => {
    onFilter(data);
  };

  const status = watch('status');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 items-end">
      <FormField label="Search" className="flex-1 min-w-[200px]">
        <div className="relative h-11 rounded-xl border border-slate-200 bg-white">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search student name..."
            className="h-11 pl-10 border-0 bg-transparent focus-visible:ring-0"
            {...register('search')}
          />
        </div>
      </FormField>

      <FormField label="Class" className="w-[180px]">
        <Select onValueChange={(value) => setValue('classId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="All classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All classes</SelectItem>
            {classes?.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Date" className="w-[180px]">
        <Input type="date" {...register('date')} />
      </FormField>

      <FormField label="Status" className="w-[150px]">
        <Select onValueChange={(value) => setValue('status', value as 'present' | 'absent' | 'late')}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="late">Late</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <Button type="submit" variant="secondary" className="gap-2">
        <Filter className="h-4 w-4" />
        Filter
      </Button>

      {(status || watch('classId') || watch('date') || watch('search')) && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            reset();
            onFilter({});
          }}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </form>
  );
}
