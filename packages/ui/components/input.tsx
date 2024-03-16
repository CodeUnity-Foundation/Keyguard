import { cn } from "@keyguard/lib/cn";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inpulVariants> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  isMessageHide?: boolean;
}

const inpulVariants = cva(
  "border-input ring-offset-background focus-within:ring-ring mt-1 flex h-10 items-center rounded-md border text-sm focus-within:ring-1",
  {
    variants: {
      variant: {
        error: "border-error",
      },
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, isMessageHide = false, ...props }, ref) => {
    return (
      <div className="mb-3">
        {props.label && (
          <label htmlFor={props.id} className="text-muted-500 dark:text-muted-200 text-sm font-normal">
            {props.label}
          </label>
        )}

        <div className={cn(inpulVariants(props.error ? { variant: "error" } : { variant }), className)}>
          {props.icon && (
            <div className="bg-secondary dark:bg-muted mr-1 flex h-full w-10 items-center justify-center rounded-md rounded-r-none">
              <span className={`${props.error ? "text-error" : "text-primary"} h-[16px] w-[16px]`}>
                {props.icon}
              </span>
            </div>
          )}
          <input
            type={type}
            className="text-muted-600 placeholder:text-muted-300 h-full w-full bg-transparent px-2 placeholder:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
            ref={ref}
            {...props}
          />
        </div>

        {props?.error && !isMessageHide ? <span className="text-xs text-red-500">{props?.error}</span> : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
