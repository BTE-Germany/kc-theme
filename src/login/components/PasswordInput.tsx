import type { ComponentProps, ReactNode } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { I18n } from "../i18n";

/**
 * Adds a show/hide toggle on top of an existing password input.
 * The input passed as `children` must have the id `passwordInputId` and right padding (`pr-11`).
 */
export function PasswordRevealWrapper(props: {
    passwordInputId: string;
    i18n: I18n;
    children: ReactNode;
}) {
    const { passwordInputId, i18n, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <div className="relative">
            {children}
            <button
                type="button"
                onClick={toggleIsPasswordRevealed}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                aria-pressed={isPasswordRevealed}
                className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:inset-ring-2 focus-visible:inset-ring-ring"
            >
                <span key={String(isPasswordRevealed)} className="animate-pop">
                    {isPasswordRevealed ? (
                        <IconEyeOff className="size-[18px]" />
                    ) : (
                        <IconEye className="size-[18px]" />
                    )}
                </span>
            </button>
        </div>
    );
}

/** Password input with an inline show/hide toggle. */
export function PasswordInput(
    props: Omit<ComponentProps<typeof Input>, "type" | "id"> & { id: string; i18n: I18n }
) {
    const { id, i18n, className, ...rest } = props;

    return (
        <PasswordRevealWrapper passwordInputId={id} i18n={i18n}>
            <Input id={id} type="password" className={cn("pr-11", className)} {...rest} />
        </PasswordRevealWrapper>
    );
}
