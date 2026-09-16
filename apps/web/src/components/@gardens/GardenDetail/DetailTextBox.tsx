import { cn } from 'cn';
import { PropsWithChildren } from 'react';

const DetailTextBox = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        'flex flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl flex-col gap-1',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DetailTextBox;
