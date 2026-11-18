import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/LoginUsername.useScript";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { Field } from "../components/Field";
import { SocialProviders } from "../components/SocialProviders";
import { PasskeyForms } from "../components/PasskeyForms";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField, enableWebAuthnConditionalUI, authenticators } =
        kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    const webAuthnButtonId = "authenticateWebAuthnButton";

    useScript({ webAuthnButtonId, kcContext, i18n });

    const hasUsernameError = messagesPerField.existsError("username");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!hasUsernameError}
            headerNode={<PageHeader title={msg("welcomeBack")} subtitle={msg("loginSubtitle")} />}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <span id="kc-registration">
                    {msg("noAccount")}{" "}
                    <a href={url.registrationUrl} className="kc-link">
                        {msg("doRegister")}
                    </a>
                </span>
            }
            socialProvidersNode={realm.password ? <SocialProviders providers={social?.providers} i18n={i18n} /> : null}
        >
            {realm.password && (
                <form id="kc-form-login" className="flex flex-col gap-5" onSubmit={onSubmit} action={url.loginAction} method="post">
                    {!usernameHidden && (
                        <Field
                            htmlFor="username"
                            label={
                                !realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")
                            }
                            errorId="input-error"
                            error={hasUsernameError ? messagesPerField.getFirstError("username") : undefined}
                        >
                            <Input
                                id="username"
                                name="username"
                                defaultValue={login.username ?? ""}
                                type="text"
                                autoFocus
                                autoCapitalize="none"
                                spellCheck={false}
                                autoComplete={enableWebAuthnConditionalUI ? "username webauthn" : "username"}
                                aria-invalid={hasUsernameError}
                                aria-describedby={hasUsernameError ? "input-error" : undefined}
                            />
                        </Field>
                    )}

                    {realm.rememberMe && !usernameHidden && (
                        <div className="flex items-center gap-2.5">
                            <Checkbox id="rememberMe" name="rememberMe" defaultChecked={!!login.rememberMe} />
                            <Label htmlFor="rememberMe" className="cursor-pointer font-normal text-muted-foreground">
                                {msg("rememberMe")}
                            </Label>
                        </div>
                    )}

                    <Button loading={isSubmitting} className="mt-1 w-full" size="lg" name="login" id="kc-login" type="submit">
                        {msgStr("doLogIn")}
                    </Button>
                </form>
            )}

            {enableWebAuthnConditionalUI && (
                <PasskeyForms loginAction={url.loginAction} authenticators={authenticators} webAuthnButtonId={webAuthnButtonId} i18n={i18n} />
            )}
        </Template>
    );
}
