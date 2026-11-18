import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { cn } from "@/lib/utils";

/** Inline validation message below a form control. `message` may contain HTML from Keycloak. */
export function FieldError(props: {
    id: string;
    message: string | undefined;
    className?: string;
}) {
    const { id, message, className } = props;

    if (!message) {
        return null;
    }

    return (
        <p
            id={id}
            className={cn("text-xs leading-snug text-red-400 animate-fade-up", className)}
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: kcSanitize(message) }}
        />
    );
}
