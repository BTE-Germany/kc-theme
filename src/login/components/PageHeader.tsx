import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "success" | "warning" | "error";

const toneClassName: Record<Tone, string> = {
    default: "bg-primary/15 text-primary-foreground ring-primary/30",
    success: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    error: "bg-red-500/15 text-red-300 ring-red-500/30"
};

/** Page title with optional subtitle and status icon. Pass it to the Template as `headerNode`. */
export function PageHeader(props: {
    title: ReactNode;
    subtitle?: ReactNode;
    icon?: ReactNode;
    tone?: Tone;
}) {
    const { title, subtitle, icon, tone = "default" } = props;

    return (
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {icon !== undefined && (
                <div
                    className={cn(
                        "mb-5 flex size-12 items-center justify-center rounded-full ring-1 animate-pop [&_svg]:size-6",
                        toneClassName[tone]
                    )}
                    aria-hidden="true"
                >
                    {icon}
                </div>
            )}
            <h1
                id="kc-page-title"
                className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
            >
                {title}
            </h1>
            {subtitle !== undefined && (
                <p className="mt-2 text-sm text-pretty text-muted-foreground sm:text-base">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
