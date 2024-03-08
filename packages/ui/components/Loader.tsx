import { cn } from "@keyguard/lib/cn";
import { VariantProps, cva } from "class-variance-authority";

const loaderVariants = cva("h-24 w-24 animate-spin rounded-full border-8", {
  variants: {
    variant: {
      default: "border-primary border-2 border-solid border-t-transparent",
      destructive: "border-destructive border-2 border-solid border-t-transparent",
      secondary: "border border-input border-2 border-solid border-t-transparent",
    },
    size: {
      default: "h-24 w-24",
      sm: "h-6 w-6",
      lg: "h-15 w-15",
      xl: "h-28 w-28",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
}

export const Loader = ({ className, variant, size }: LoaderProps) => {
  return (
    <div className={cn(loaderVariants({ variant, size }), className)}>
      <div className="h-full w-full"></div>
    </div>
  );
};
