import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { IconLoader2 } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    [
        "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap outline-none select-none",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-[3px] focus-visible:ring-offset-1",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Forced colors remove background fills; keep buttons recognisable with a system-colored border.
        "forced-colors:border forced-colors:border-[color:ButtonText]"
    ],
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/85 hover:shadow-md",
                destructive:
                    "bg-destructive text-white shadow-sm hover:bg-destructive/85",
                outline:
                    "border border-input bg-input/30 shadow-xs hover:border-foreground/20 hover:bg-input/60",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground",
                link: "text-foreground underline-offset-4 hover:underline"
            },
            size: {
                default: "h-10 px-4 has-[>svg]:px-3",
                sm: "h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
                lg: "h-11 px-6 has-[>svg]:px-4",
                icon: "size-10"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        /**
         * Shows a spinner while a form is being submitted. The button stays enabled (only `aria-disabled`),
         * because a disabled submit button would drop its own name/value from the posted form data.
         * Double submits are prevented by `useIsSubmitting`.
         */
        loading?: boolean;
    };

function Button({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    disabled,
    children,
    ...props
}: ButtonProps) {
    if (asChild) {
        return (
            <Slot
                data-slot="button"
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            >
                {children}
            </Slot>
        );
    }

    return (
        <button
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            disabled={disabled}
            aria-disabled={loading || undefined}
            aria-busy={loading || undefined}
            {...props}
        >
            {loading && <IconLoader2 className="animate-spin" aria-hidden="true" />}
            {children}
        </button>
    );
}

export { Button, buttonVariants };
