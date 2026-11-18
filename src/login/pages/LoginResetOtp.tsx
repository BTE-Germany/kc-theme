import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconDeviceMobile, IconDeviceMobileOff } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginResetOtp(props: PageProps<Extract<KcContext, { pageId: "login-reset-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, messagesPerField, configuredOtpCredentials } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={<PageHeader icon={<IconDeviceMobileOff />} tone="warning" title={msg("otp-display-name")} />}
        >
            <form id="kc-otp-reset-form" action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <fieldset className="flex flex-col gap-3" aria-describedby="kc-otp-reset-form-description">
                    <p id="kc-otp-reset-form-description" className="text-sm text-muted-foreground">
                        {msg("otp-reset-description")}
                    </p>
                    <div className="divide-y overflow-hidden rounded-lg border bg-card/60">
                        {configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => (
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
                                    defaultChecked={otpCredential.id === configuredOtpCredentials.selectedCredentialId}
                                    className="sr-only"
                                />
                                <IconDeviceMobile
                                    className="size-5 shrink-0 text-muted-foreground transition-colors group-has-checked:text-foreground"
                                    aria-hidden="true"
                                />
                                <span className="min-w-0 flex-1 text-sm font-medium break-words">{otpCredential.userLabel}</span>
                                <span
                                    className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-input transition-colors group-has-checked:border-primary"
                                    aria-hidden="true"
                                >
                                    <span className="size-2 scale-0 rounded-full bg-primary transition-transform duration-200 group-has-checked:scale-100" />
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <Button id="kc-otp-reset-form-submit" loading={isSubmitting} className="mt-1 w-full" size="lg" type="submit">
                    {msgStr("doSubmit")}
                </Button>
            </form>
        </Template>
    );
}
