import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm md:text-md 2xl:text-xl font-semibold lg:font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 shadow-md dark:font-extrabold",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-tertiary hover:text-tertiary-foreground hover:border-tertiary border-primary",
        secondary:
          "bg-secondary text-secondary-foreground opacity-90 hover:bg-transparent hover:border-secondary hover:text-secondary border-secondary",
        tertiary:
          "bg-tertiary text-tertiary-foreground hover:bg-transparent hover:border-tertiary hover:text-tertiary border-tertiary",
        accent:
          "bg-accent-4 text-accent-foreground hover:bg-transparent hover:border-accent-4 hover:text-accent-4 border-accent-4",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive hover:bg-transparent hover:text-foreground",
        outline: "bg-background hover:border-secondary hover:text-secondary",
        ghost:
          "shadow-none hover:bg-accent-1 hover:text-accent-foreground border-transparent",
        link: "shadow-none text-accent-3 underline-offset-4 underline hover:no-underline border-transparent",
        disabled: "bg-muted text-muted-foreground border-muted opacity-50",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
