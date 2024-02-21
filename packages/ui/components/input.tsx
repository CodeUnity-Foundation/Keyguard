import { cn } from "@vaultmaster/lib/cn";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="mb-3">
      {props.label && (
        <label htmlFor={props.id} className="text-muted-500 dark:text-muted-200 text-sm font-normal">
          {props.label}
        </label>
      )}

      <div
        className={cn(
          "border-input ring-offset-background focus-within:ring-ring dark:border-muted-400 mt-1 flex h-10 items-center rounded-md border text-sm focus-within:ring-1",
          className,
        )}>
        {props.icon && (
          <div className="bg-secondary dark:bg-muted mr-1 flex h-full w-10 items-center justify-center rounded-md rounded-r-none">
            {props.icon}
          </div>
        )}
        <input
          type={type}
          className="text-muted-600 placeholder:text-muted-300 h-full w-full bg-transparent px-2 placeholder:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
