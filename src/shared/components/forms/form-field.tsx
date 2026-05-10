import * as React from 'react';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactElement;
  required?: boolean;
  className?: string;
  id?: string;
}

export function FormField({ label, error, children, required, className, id: customId }: FormFieldProps) {
  const generatedId = React.useId();
  const id = customId || generatedId;
  const errorId = `${id}-error`;

  return (
    <div className={cn('space-y-2', className)}>
      <Label 
        htmlFor={id} 
        className="text-sm font-semibold text-slate-700"
      >
        {label}
        {required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
      </Label>
      
      {React.cloneElement(children, {
        id,
        'aria-describedby': error ? errorId : undefined,
        'aria-invalid': error ? true : undefined,
      })}

      {error && (
        <p 
          id={errorId}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
