import * as React from "react";

import { cn } from "@/lib/utils";

/** Shared look for text-like form controls (input, select, textarea). */
const inputClassName = cn(
    "flex w-full min-w-0 rounded-md border border-input bg-input/30 px-3 text-base shadow-xs outline-none md:text-sm",
    "transition-[color,background-color,border-color,box-shadow] duration-200",
    "placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground",
    "hover:border-foreground/20",
    "focus-visible:border-ring focus-visible:bg-input/50 focus-visible:ring-[3px] focus-visible:ring-ring/40",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/30 aria-invalid:focus-visible:ring-destructive/40",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground"
);

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(inputClassName, "h-10 py-1", className)}
            {...props}
        />
    );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(inputClassName, "min-h-24 py-2", className)}
            {...props}
        />
    );
}

function Select({ className, multiple, ...props }: React.ComponentProps<"select">) {
    return (
        <select
            data-slot="select"
            multiple={multiple}
            className={cn(
                inputClassName,
                multiple
                    ? "py-2"
                    : "h-10 appearance-none bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-9",
                className
            )}
            style={
                multiple
                    ? undefined
                    : {
                          // Chevron icon, drawn with the current text color.
                          backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"
                      }
            }
            {...props}
        />
    );
}

export { Input, Textarea, Select };
