import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
    IconAlertTriangle,
    IconCircleCheck,
    IconCircleX,
    IconInfoCircle
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
    "relative flex w-full gap-3 rounded-lg border px-4 py-3 text-sm backdrop-blur-sm animate-fade-up",
    {
        variants: {
            variant: {
                info: "border-sky-500/30 bg-sky-500/10 [&>svg]:text-sky-400",
                success:
                    "border-emerald-500/30 bg-emerald-500/10 [&>svg]:text-emerald-400",
                warning: "border-amber-500/30 bg-amber-500/10 [&>svg]:text-amber-400",
                error: "border-red-500/35 bg-red-500/10 animate-shake [&>svg]:text-red-400"
            }
        },
        defaultVariants: {
            variant: "info"
        }
    }
);

const icons = {
    info: IconInfoCircle,
    success: IconCircleCheck,
    warning: IconAlertTriangle,
    error: IconCircleX
} as const;

function Alert({
    className,
    variant,
    children,
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
    const Icon = icons[variant ?? "info"];

    return (
        <div
            data-slot="alert"
            role={variant === "error" || variant === "warning" ? "alert" : "status"}
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            <Icon className="mt-px size-[18px] shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1 leading-relaxed break-words">{children}</div>
        </div>
    );
}

export { Alert };
