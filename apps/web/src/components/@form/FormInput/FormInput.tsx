import { cn } from 'cn';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'input'> {
  id: string;
  label: string;
  endAdornment?: ReactNode;
}

const FormInput = ({
  label,
  id,
  type = 'text',
  className,
  required,
  endAdornment,
  ...rest
}: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-medium text-heading">
          {label}
        </label>
        <span className={cn('font-medium text-sm', required ? 'text-red-700' : 'text-gray-700/60')}>
          {required ? 'required' : 'optional'}
        </span>
      </div>
      <div className="flex items-center bg-gray-100 rounded-md">
        <input
          id={id}
          name={id}
          type={type}
          className={cn(
            'flex-1 bg-transparent rounded-md focus:outline-2 focus:outline-green-700/50 w-full px-3 py-2.5 font-medium',
            className,
          )}
          required={required}
          {...rest}
        />
        {endAdornment && <div className="mr-3">{endAdornment}</div>}
      </div>
    </div>
  );
};

export default FormInput;
