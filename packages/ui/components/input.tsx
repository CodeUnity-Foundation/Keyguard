import { cn } from "@keyguard/lib";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

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

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, isMessageHide = false, ...props }, ref) => {
    return (
      <div className="w-full">
        {props.label && (
          <label htmlFor={props.id} className="text-sm font-light text-black dark:text-white">
            {props.label}
          </label>
        )}

        <div
          className={cn(
            inpulVariants(props.error ? { variant: "error" } : { variant }),
            className,
            `bg-muted-300 dark:bg-muted-500 border-gray-300 dark:border-gray-600 ${props.error ? "border-red-500 dark:border-red-500" : ""}`
          )}>
          {props.icon && (
            <div
              className={cn(
                className,
                "bg-muted-400 flex h-full w-10 items-center justify-center rounded-md rounded-r-none"
              )}>
              <span
                className={`${props.error ? "text-error" : "text-primary dark:text-white"} h-[16px] w-[16px]`}>
                {props.icon}
              </span>
            </div>
          )}
          <input
            type={type}
            className={cn(
              className,
              "placeholder:text-muted-500 dark:placeholder:text-muted-600 h-full w-full bg-transparent px-2 text-black placeholder:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
            )}
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
