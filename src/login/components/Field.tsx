import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldError } from "./FieldError";

/** Label, control and validation message, stacked. */
export function Field(props: {
    label: ReactNode;
    htmlFor: string;
    children: ReactNode;
    error?: string;
    errorId?: string;
    /** Rendered on the right side of the label row (e.g. a "Forgot password?" link). */
    labelAddon?: ReactNode;
    hint?: ReactNode;
    className?: string;
}) {
    const {
        label,
        htmlFor,
        children,
        error,
        errorId = `input-error-${htmlFor}`,
        labelAddon,
        hint,
        className
    } = props;

    return (
        <div className={cn("grid w-full gap-2", className)}>
            <div className="flex min-h-4 items-center justify-between gap-3">
                <Label htmlFor={htmlFor}>{label}</Label>
                {labelAddon}
            </div>
            {children}
            {hint !== undefined && (
                <p className="text-xs text-muted-foreground">{hint}</p>
            )}
            <FieldError id={errorId} message={error} />
        </div>
    );
}
