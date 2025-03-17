import { Fragment } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, PinInput, Radio } from "@mantine/core";


export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={"flex gap-3"}>
                            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                <Fragment key={index}>
                                    <Radio
                                        id={`kc-otp-credential-${index}`}
                                        className={kcClsx("kcLoginOTPListInputClass")}
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={otpCredential.id}
                                        defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                        label={otpCredential.userLabel}
                                        size={"md"}
                                    />

                                </Fragment>
                            ))}
                        </div>
                    </div>
                )}


                <p className={"mb-2 mt-8"}>
                    {msg("loginOtpOneTime")}
                </p>
                <PinInput
                    size="lg" length={6} type="number" oneTimeCode
                    id="otp"
                    name="otp"
                    className={"w-full"}
                    autoFocus
                    aria-invalid={messagesPerField.existsError("totp")}
                />

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                    </div>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <Button
                            className={"mt-6 mb-4"}
                            name="login"
                            id="kc-login"
                            type="submit"
                            fullWidth

                        >
                            {msgStr("doLogIn")}
                        </Button>
                    </div>
                </div>
            </form>
        </Template>
    );
}
