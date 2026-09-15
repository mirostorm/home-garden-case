import { cn } from 'cn';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'textarea'> {
  id: string;
  label: string;
}

const FormInput = ({ label, id, rows = 3, className, required, ...rest }: Props) => {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="font-medium text-heading">
          {label}
        </label>
        <span className={cn('font-medium text-sm', required ? 'text-red-700' : 'text-gray-700/60')}>
          {required ? 'required' : 'optional'}
        </span>
      </div>
      <textarea
        id={id}
        name={id}
        rows={rows}
        className={cn(
          'bg-gray-100 resize-none rounded-md focus:outline-2 focus:outline-green-700/50 w-full px-3 py-2.5 font-medium',
          className,
        )}
        required={required}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
