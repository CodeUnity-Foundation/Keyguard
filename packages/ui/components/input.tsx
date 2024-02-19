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
        <label htmlFor={props.id} className="text-muted-500 dark:text-muted-200 font-normal text-sm">
          {props.label}
        </label>
      )}

      <div
        className={cn(
          'flex h-10 items-center mt-1 rounded-md border border-input text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring dark:border-muted-400',
          className,
        )}
      >
        {props.icon && (
          <div className="bg-secondary h-full w-10 rounded-md rounded-r-none flex items-center justify-center mr-1 dark:bg-muted">
            {props.icon}
          </div>
        )}
        <input
          type={type}
          className="w-full h-full dark:text-white text-muted-600 px-2 placeholder:text-muted-300 placeholder:font-medium bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
