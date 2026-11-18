import { useEffect, useRef, useState, type FormEvent } from "react";

/** Safety net: unlock the form if the navigation never happened (e.g. the user pressed Stop). */
const UNLOCK_AFTER_MS = 15_000;

/**
 * Tracks whether a classic (full page) form post is in flight, so the submit button can show a spinner.
 * Further submits are ignored while the first one is pending. The state is reset when the page is
 * restored from the back/forward cache, and after a while in case the navigation was aborted.
 */
export function useIsSubmitting() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    /** `name` of the button that submitted the form, so only that button shows a spinner. */
    const [submitterName, setSubmitterName] = useState<string | undefined>(undefined);
    const isSubmittingRef = useRef(false);

    useEffect(() => {
        if (!isSubmitting) {
            return;
        }

        const timeout = window.setTimeout(() => {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }, UNLOCK_AFTER_MS);

        return () => window.clearTimeout(timeout);
    }, [isSubmitting]);

    useEffect(() => {
        const onPageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                isSubmittingRef.current = false;
                setIsSubmitting(false);
            }
        };

        window.addEventListener("pageshow", onPageShow);

        return () => window.removeEventListener("pageshow", onPageShow);
    }, []);

    return {
        isSubmitting,
        submitterName,
        /** True when the form was submitted with Keycloak's cancel button (`cancel` or `cancel-aia`). */
        isCancelling:
            isSubmitting &&
            (submitterName === "cancel" || submitterName === "cancel-aia"),
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
            if (isSubmittingRef.current) {
                event.preventDefault();
                return;
            }
            isSubmittingRef.current = true;
            setIsSubmitting(true);

            const submitter = (event.nativeEvent as SubmitEvent).submitter;
            setSubmitterName(
                submitter instanceof HTMLButtonElement && submitter.name !== ""
                    ? submitter.name
                    : undefined
            );
        }
    };
}
