import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Checkbox, PasswordInput } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

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
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">

               <div className={"flex flex-col gap-3"}>
                   <PasswordInput
                       label={msg("passwordNew")}
                       error={messagesPerField.existsError("password") && messagesPerField.getFirstError("password")}
                       type="password"
                       id="password-new"
                       name="password-new"
                       className={kcClsx("kcInputClass")}
                       autoFocus
                       autoComplete="new-password"
                       aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                   />

                   <PasswordInput
                       label={msg("passwordConfirm")}
                       error={messagesPerField.existsError("password-confirm") && messagesPerField.getFirstError("password-confirm")}
                       type="password"
                       id="password-confirm"
                       name="password-confirm"
                       className={kcClsx("kcInputClass")}
                       autoFocus
                       autoComplete="new-password"
                       aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                   />
               </div>


                <div className={kcClsx("kcFormGroupClass")}>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <Button
                            className={"mt-6 mb-4"}
                            type="submit"
                            fullWidth
                        >
                            {msgStr("doSubmit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <div className={"flex justify-center"}>
                                <button type="submit"
                                        name="cancel-aia"
                                        value="true"
                                        formNoValidate
                                        className={"flex items-center gap-1 group text-neutral-500 text-sm"}>
                                    <IconArrowLeft size={18} className={"group-hover:-translate-x-1 transition"} />
                                    {msgStr("doCancel").replace("&laquo;", "")}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const {  i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={"mt-5"}>

            <Checkbox label={msg("logoutOtherSessions")} id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true}/>
        </div>
    );
}
