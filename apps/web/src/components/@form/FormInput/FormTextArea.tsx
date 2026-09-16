import { Field, FieldDescription, FieldError, FieldLabel, Textarea } from '@/components/ui';
import { cn } from 'cn';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'textarea'> {
  id: string;
  label?: string;
  error?: string;
  message?: string;
}

const FormInput = ({
  label,
  id,
  className,
  required,
  rows = 3,
  disabled,
  error,
  message,
  ...rest
}: Props) => {
  return (
    <Field data-invalid={!!error} data-disabled={disabled} className="gap-1">
      <FieldLabel htmlFor={id} className="mb-1">
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <Textarea
        {...rest}
        name={id}
        aria-invalid={!!error}
        rows={rows}
        required={required}
        className={cn('bg-gray-100', className)}
        id={id}
      />

      {!!error && <FieldError className="italic font-medium">{error}</FieldError>}
      {message && <FieldDescription className="italic">{message}</FieldDescription>}
    </Field>
  );
};

export default FormInput;
