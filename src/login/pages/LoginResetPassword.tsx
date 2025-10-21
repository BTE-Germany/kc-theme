import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function LoginResetPassword(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-reset-password.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            headerNode={<>
                <h1 className={"text-4xl font-semibold mt-6"}>{msg("emailForgotTitle")}</h1>
                <p className={"text-md mt-2 text-neutral-500 max-w-sm text-center"}>{realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}</p>
            </>}
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={"w-sm"}>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="username">
                            {!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                  ? msg("usernameOrEmail")
                                  : msg("email")}
                        </Label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        />
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                className={"text-destructive text-xs"}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>

                    <Button
                        className={"w-full mt-8 mb-3"}
                        type="submit"
                    >
                        {msgStr("doSubmit")}
                    </Button>
                    <Button asChild variant={"ghost"} className={"w-full text-muted-foreground text-xs"}>
                        <a href={url.loginUrl}>{msg("backToLogin")}</a>
                    </Button>
                </div>
            </form>
        </Template>
    );
}
