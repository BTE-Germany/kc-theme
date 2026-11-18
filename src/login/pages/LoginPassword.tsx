import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/LoginPassword.useScript";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { Field } from "../components/Field";
import { PasswordInput } from "../components/PasswordInput";
import { PasskeyForms } from "../components/PasskeyForms";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { realm, url, messagesPerField, enableWebAuthnConditionalUI, authenticators } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    const webAuthnButtonId = "authenticateWebAuthnButton";

    useScript({ webAuthnButtonId, kcContext, i18n });

    const hasPasswordError = messagesPerField.existsError("password");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!hasPasswordError}
            headerNode={<PageHeader title={msg("welcomeBack")} subtitle={msg("loginSubtitle")} />}
        >
            <form id="kc-form-login" className="flex flex-col gap-5" onSubmit={onSubmit} action={url.loginAction} method="post">
                <Field
                    htmlFor="password"
                    label={msg("password")}
                    errorId="input-error-password"
                    error={hasPasswordError ? messagesPerField.get("password") : undefined}
                    labelAddon={
                        realm.resetPasswordAllowed && (
                            <a href={url.loginResetCredentialsUrl} className="kc-link text-xs text-muted-foreground hover:text-foreground">
                                {msg("doForgotPassword")}
                            </a>
                        )
                    }
                >
                    <PasswordInput
                        id="password"
                        name="password"
                        i18n={i18n}
                        autoFocus
                        autoComplete="current-password"
                        aria-invalid={messagesPerField.existsError("username", "password")}
                        aria-describedby={hasPasswordError ? "input-error-password" : undefined}
                    />
                </Field>

                <Button loading={isSubmitting} className="mt-1 w-full" size="lg" name="login" id="kc-login" type="submit">
                    {msgStr("doLogIn")}
                </Button>
            </form>

            {enableWebAuthnConditionalUI && (
                <PasskeyForms loginAction={url.loginAction} authenticators={authenticators} webAuthnButtonId={webAuthnButtonId} i18n={i18n} />
            )}
        </Template>
    );
}
