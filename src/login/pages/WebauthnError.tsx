import { useRef } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconFingerprintOff, IconRefresh } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function WebauthnError(props: PageProps<Extract<KcContext, { pageId: "webauthn-error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, isAppInitiatedAction, execution } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    const formRef = useRef<HTMLFormElement>(null);
    const executionValueRef = useRef<HTMLInputElement>(null);
    const isSetRetryRef = useRef<HTMLInputElement>(null);

    const onTryAgain = () => {
        if (formRef.current === null || executionValueRef.current === null || isSetRetryRef.current === null) {
            return;
        }

        isSetRetryRef.current.value = "retry";
        executionValueRef.current.value = execution;
        formRef.current.requestSubmit();
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage
            headerNode={<PageHeader icon={<IconFingerprintOff />} tone="error" title={msg("webauthn-error-title")} />}
        >
            <form ref={formRef} id="kc-error-credential-form" action={url.loginAction} method="post" onSubmit={onSubmit} hidden>
                <input ref={executionValueRef} type="hidden" id="executionValue" name="authenticationExecution" />
                <input ref={isSetRetryRef} type="hidden" id="isSetRetry" name="isSetRetry" />
            </form>

            <div className="flex flex-col gap-3">
                <Button
                    type="button"
                    id="kc-try-again"
                    name="try-again"
                    size="lg"
                    className="group w-full"
                    loading={isSubmitting}
                    onClick={onTryAgain}
                >
                    {!isSubmitting && <IconRefresh className="transition-transform duration-500 group-hover:-rotate-180" aria-hidden="true" />}
                    {msgStr("doTryAgain")}
                </Button>

                {isAppInitiatedAction && (
                    <form id="kc-webauthn-settings-form" action={url.loginAction} method="post">
                        <Button type="submit" id="cancelWebAuthnAIA" name="cancel-aia" value="true" variant="outline" size="lg" className="w-full">
                            {msgStr("doCancel")}
                        </Button>
                    </form>
                )}
            </div>
        </Template>
    );
}
