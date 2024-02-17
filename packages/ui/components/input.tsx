import * as React from 'react';
import { PersonIcon } from '@radix-ui/react-icons';

import { cn } from '@vaultmaster/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="mb-3">
      {props.label && (
        <label htmlFor={props.id} className="text-[#757575] font-semibold">
          {props.label || 'Name'}
        </label>
      )}

      <div
        className={cn(
          'flex h-10 items-center mt-1 rounded-md bg-secondary pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring',
          className,
        )}
      >
        {props.icon && (
          <div className="bg-white h-6 w-6 rounded-md flex items-center justify-center mr-1">{props.icon}</div>
        )}
        <input
          type={type}
          className="w-full p-2 bg-secondary placeholder:text-input-foreground placeholder:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
