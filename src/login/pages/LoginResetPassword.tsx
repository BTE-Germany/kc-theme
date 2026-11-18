import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconArrowLeft, IconKey } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { Field } from "../components/Field";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    const hasError = messagesPerField.existsError("username");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!hasError}
            headerNode={
                <PageHeader
                    icon={<IconKey />}
                    title={msg("emailForgotTitle")}
                    subtitle={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
                />
            }
        >
            <form id="kc-reset-password-form" action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <Field
                    htmlFor="username"
                    label={
                        !realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")
                    }
                    errorId="input-error-username"
                    error={hasError ? messagesPerField.get("username") : undefined}
                >
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        autoFocus
                        autoCapitalize="none"
                        spellCheck={false}
                        autoComplete="username"
                        defaultValue={auth.attemptedUsername ?? ""}
                        aria-invalid={hasError}
                        aria-describedby={hasError ? "input-error-username" : undefined}
                    />
                </Field>

                <div className="mt-1 flex flex-col gap-2">
                    <Button size="lg" className="w-full" type="submit" loading={isSubmitting}>
                        {msgStr("doSubmit")}
                    </Button>
                    <Button asChild variant="ghost" className="group w-full">
                        <a href={url.loginUrl}>
                            <IconArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
                            {msg("goBack")}
                        </a>
                    </Button>
                </div>
            </form>
        </Template>
    );
}
