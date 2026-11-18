import type { JSX } from "keycloakify/tools/JSX";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";
import classNames from "classnames";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={<h1 className={"text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 sm:mt-6"}>{msg("updatePasswordTitle")}</h1>}
        >
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={"w-full max-w-sm flex flex-col gap-4"}>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="password-new">{msg("passwordNew")}</Label>
                        <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-new">
                            <Input
                                type="password"
                                id="password-new"
                                name="password-new"
                                className={kcClsx("kcInputClass")}
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>
                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password"
                                className={"text-destructive text-xs"}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password"))
                                }}
                            />
                        )}
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="password-confirm">{msg("passwordConfirm")}</Label>
                        <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-new">
                            <Input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                className={kcClsx("kcInputClass")}
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>
                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password-confirm"
                                className={"text-destructive text-xs"}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password-confirm"))
                                }}
                            />
                        )}
                    </div>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                </div>

                <div className={kcClsx("kcFormGroupClass")}>

                    <div id="kc-form-buttons" className={classNames("mt-8", {
                        "grid grid-cols-2 gap-3": isAppInitiatedAction
                    })}>
                        {isAppInitiatedAction && (
                            <Button
                                variant={"outline"}
                                className={"w-full"}
                                type="submit"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </Button>
                        )}
                        <Button
                            type="submit"
                            className={"w-full"}
                        >
                            {msgStr("doSubmit")}
                        </Button>

                    </div>
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { i18n } = props;

    const { msg } = i18n;

    return (
        <div>
            <div className="flex items-center gap-3">
                <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                <Label htmlFor="logout-sessions">{msg("logoutOtherSessions")}</Label>
            </div>
        </div>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className="flex w-full items-center gap-2">
            {children}
            <Button
                variant={"outline"}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={() => toggleIsPasswordRevealed()}
                type={"button"}
            >
                {isPasswordRevealed ? <IconEyeOff /> : <IconEye />}
            </Button>
        </div>
    );
}
