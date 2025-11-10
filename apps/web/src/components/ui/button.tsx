import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:opacity-90 dark:bg-primary",
        destructive:
          "bg-destructive text-white shadow hover:opacity-90 dark:bg-destructive",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:opacity-90 dark:border-input dark:bg-transparent",
        secondary:
          "bg-secondary text-secondary-foreground shadow hover:opacity-90 dark:bg-secondary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:opacity-90 dark:hover:bg-accent",
        link:
          "text-primary underline-offset-4 hover:underline hover:opacity-90 dark:text-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { buttonVariants };
