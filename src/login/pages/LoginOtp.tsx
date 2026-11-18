import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconDeviceMobile, IconDeviceMobileCode } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { Field } from "../components/Field";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    const hasError = messagesPerField.existsError("totp");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!hasError}
            headerNode={<PageHeader icon={<IconDeviceMobileCode />} title={msg("otp-display-name")} subtitle={msg("otp-help-text")} />}
        >
            <form id="kc-otp-login-form" action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                {otpLogin.userOtpCredentials.length > 1 && (
                    <fieldset>
                        <legend className="sr-only">{msg("otp-display-name")}</legend>
                        <div className="divide-y overflow-hidden rounded-lg border bg-card/60">
                            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                <label
                                    key={otpCredential.id}
                                    htmlFor={`kc-otp-credential-${index}`}
                                    className="group relative flex min-h-12 cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/60 has-checked:bg-accent/40 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/80 has-focus-visible:ring-inset"
                                >
                                    <input
                                        id={`kc-otp-credential-${index}`}
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={otpCredential.id}
                                        defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                        className="sr-only"
                                    />
                                    <IconDeviceMobile
                                        className="size-5 shrink-0 text-muted-foreground transition-colors group-has-checked:text-foreground"
                                        aria-hidden="true"
                                    />
                                    <span className="min-w-0 flex-1 text-sm font-medium break-words">{otpCredential.userLabel}</span>
                                    <span
                                        className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-input-border transition-colors group-has-checked:border-foreground"
                                        aria-hidden="true"
                                    >
                                        <span className="size-2 scale-0 rounded-full bg-foreground transition-transform duration-200 group-has-checked:scale-100" />
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                )}

                <Field
                    htmlFor="otp"
                    label={msg("loginOtpOneTime")}
                    errorId="input-error-otp-code"
                    error={hasError ? messagesPerField.get("totp") : undefined}
                >
                    <Input
                        id="otp"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        spellCheck={false}
                        autoFocus
                        className="h-12 text-center font-mono text-lg tracking-[0.3em] md:text-lg"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? "input-error-otp-code" : undefined}
                    />
                </Field>

                <Button loading={isSubmitting} className="mt-1 w-full" size="lg" name="login" id="kc-login" type="submit">
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}
