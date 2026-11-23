import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { IconCheck } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

function Checkbox({
    className,
    ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                "peer size-[18px] shrink-0 cursor-pointer rounded-[5px] border border-input-border bg-input/30 shadow-xs outline-none",
                "transition-[background-color,border-color,box-shadow] duration-200 hover:border-foreground/60",
                "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                // Small control: a solid ring with a gap stays visible on checked and invalid boxes too.
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "aria-invalid:border-red-500",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-current animate-pop"
            >
                <IconCheck className="size-3.5" stroke={3} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
