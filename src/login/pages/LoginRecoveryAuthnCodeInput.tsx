import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconLifebuoy } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { Field } from "../components/Field";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginRecoveryAuthnCodeInput(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    const hasError = messagesPerField.existsError("recoveryCodeInput");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!hasError}
            headerNode={
                <PageHeader icon={<IconLifebuoy />} title={msg("auth-recovery-code-header")} subtitle={msg("auth-recovery-code-info-message")} />
            }
        >
            <form id="kc-recovery-code-login-form" action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <Field
                    htmlFor="recoveryCodeInput"
                    label={msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                    errorId="input-error"
                    error={hasError ? messagesPerField.get("recoveryCodeInput") : undefined}
                >
                    <Input
                        id="recoveryCodeInput"
                        name="recoveryCodeInput"
                        type="text"
                        autoComplete="off"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        autoFocus
                        className="h-12 font-mono text-base tracking-wider md:text-base"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? "input-error" : undefined}
                    />
                </Field>

                <Button loading={isSubmitting} className="mt-1 w-full" size="lg" name="login" id="kc-login" type="submit">
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}
