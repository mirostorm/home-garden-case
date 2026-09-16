import {
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui';
import { cn } from 'cn';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'input'> {
  id: string;
  label?: string;
  endAdornment?: ReactNode;
  error?: string;
}

const FormInput = ({
  label,
  id,
  className,
  required,
  endAdornment,
  hidden,
  disabled,
  error,
  ...rest
}: Props) => {
  return (
    <Field className={hidden ? 'hidden' : ''} data-invalid={!!error} data-disabled={disabled}>
      <FieldLabel htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <InputGroup {...rest} aria-invalid={!!error} className={cn('bg-gray-100', className)}>
        <InputGroupInput {...rest} name={id} aria-invalid={!!error} required={required} id={id} />
        {endAdornment && <InputGroupAddon align="inline-end">{endAdornment}</InputGroupAddon>}
      </InputGroup>

      {!!error && <FieldError>{error}</FieldError>}
    </Field>
  );
};

export default FormInput;
