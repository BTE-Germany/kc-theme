import { useLayoutEffect, useState } from "react";
import type { JSX } from "keycloakify/tools/JSX";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader } from "../components/PageHeader";
import { FieldError } from "../components/FieldError";
import { useIsSubmitting } from "../components/useIsSubmitting";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr, advancedMsg, currentLanguage } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    const { isSubmitting, onSubmit } = useIsSubmitting();

    // Invisible captchas call this global callback once the challenge has been solved.
    useLayoutEffect(() => {
        (window as unknown as Record<string, unknown>)["onSubmitRecaptcha"] = () => {
            (document.getElementById("kc-register-form") as HTMLFormElement | null)?.requestSubmit();
        };

        return () => {
            delete (window as unknown as Record<string, unknown>)["onSubmitRecaptcha"];
        };
    }, []);

    const isInvisibleCaptcha = recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <PageHeader
                    title={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
                    subtitle={msg("registerSubtitle")}
                />
            }
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            displayInfo
            infoNode={
                <span>
                    {msg("alreadyHaveAccount")}{" "}
                    <a href={url.loginUrl} className="kc-link">
                        {msg("doLogIn")}
                    </a>
                </span>
            }
        >
            <form id="kc-register-form" action={url.registrationAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}

                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="flex justify-center">
                        {/* Cloudflare Turnstile and Google reCAPTCHA both pick up their container by class name. */}
                        <div
                            className="cf-turnstile g-recaptcha"
                            data-sitekey={recaptchaSiteKey}
                            data-action={recaptchaAction}
                            data-language={currentLanguage.languageTag}
                            data-theme="dark"
                            data-size="compact"
                        />
                    </div>
                )}

                <div id="kc-form-buttons" className="mt-1">
                    {isInvisibleCaptcha ? (
                        <Button
                            size="lg"
                            className="g-recaptcha w-full"
                            data-sitekey={recaptchaSiteKey}
                            data-callback="onSubmitRecaptcha"
                            data-action={recaptchaAction}
                            type="submit"
                        >
                            {msg("doRegister")}
                        </Button>
                    ) : (
                        <Button
                            size="lg"
                            className="w-full"
                            type="submit"
                            loading={isSubmitting}
                            disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                        >
                            {msgStr("doRegister")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg, msgStr } = i18n;

    const hasError = messagesPerField.existsError("termsAccepted");

    return (
        <div>
            <label
                htmlFor="termsAccepted"
                className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg border bg-card/60 p-4 transition-colors hover:bg-accent/40",
                    areTermsAccepted && "border-primary/60 bg-primary/10 hover:bg-primary/15",
                    hasError && "border-red-500/50"
                )}
            >
                <Checkbox
                    id="termsAccepted"
                    name="termsAccepted"
                    className="mt-0.5"
                    checked={areTermsAccepted}
                    onCheckedChange={checked => onAreTermsAcceptedValueChange(checked === true)}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? "input-error-terms-accepted" : undefined}
                />
                <span className="grid gap-1.5">
                    <span className="text-sm leading-none font-medium">{msg("termsTitle")}</span>
                    <span className="kc-rich-text text-sm text-muted-foreground">
                        {msgStr("termsText").trim() !== "" ? msg("termsText") : msg("acceptTermsText")}
                    </span>
                </span>
            </label>
            <FieldError id="input-error-terms-accepted" message={hasError ? messagesPerField.get("termsAccepted") : undefined} className="mt-2" />
        </div>
    );
}
