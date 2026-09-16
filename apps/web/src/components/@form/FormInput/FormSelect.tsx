import {
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'select'> {
  id: string;
  label: string;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
  disabled?: boolean;
}

const FormSelect = ({ id, label, error, options, required, disabled, ...props }: Props) => {
  return (
    <Field data-invalid={!!error} className="w-full">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <Select
        items={options}
        name={id}
        required={required}
        disabled={disabled}
        defaultValue={String(props.defaultValue ?? options[0].value)}
      >
        <SelectTrigger aria-invalid={!!error} className="w-full py-5 bg-gray-100">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {!!error && <FieldError>{error}</FieldError>}
    </Field>
  );
};

export default FormSelect;
