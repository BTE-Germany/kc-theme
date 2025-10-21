import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Button } from "@/components/ui/button.tsx";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <>
                    <h1 className={"text-4xl font-semibold mt-6"}>Herzlich Willkommen.</h1>
                    <p className={"text-md mt-2 text-neutral-500"}>Gebe unten die erforderlichen Daten an.</p>
                </>
            }
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <form id="kc-register-form" className={"w-sm"} action={url.registrationAction} method="post">
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
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}
                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="form-group">
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <div
                                className="cf-turnstile"
                                data-sitekey={recaptchaSiteKey}
                                data-action={recaptchaAction}
                                data-language={"de"}
                            ></div>
                        </div>
                    </div>
                )}
                <div className={kcClsx("kcFormGroupClass")}>
                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <button
                                className={clsx(
                                    kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                                    "g-recaptcha"
                                )}
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                            >
                                {msg("doRegister")}
                            </button>
                        </div>
                    ) : (
                        <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <Button
                                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                className={"w-full mt-8 mb-3"}
                                type="submit"
                            >
                                {msgStr("doRegister")}
                            </Button>
                        </div>
                    )}

                    <Button asChild variant={"ghost"} className={"w-full text-muted-foreground text-xs"}>
                        <a href={url.loginUrl}>{msg("backToLogin")}</a>
                    </Button>
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <>
            <Label className="my-5 bg-background hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary/80 has-[[aria-checked=true]]:bg-primary/40 transition">
                <Checkbox
                    id="termsAccepted"
                    defaultChecked
                    name="termsAccepted"
                    checked={areTermsAccepted}
                    onCheckedChange={e => onAreTermsAcceptedValueChange(e as boolean)}
                    aria-invalid={messagesPerField.existsError("termsAccepted")}
                />
                <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                        {msg("termsTitle")}
                    </p>
                    <p className="text-muted-foreground text-sm">
                        {msg("termsText")}
                    </p>
                    {messagesPerField.existsError("termsAccepted") && (
                        <p className="text-destructive text-sm">
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("termsAccepted"))
                            }}
                        />
                        </p>
                    )}
                </div>

            </Label>


        </>
    );
}
