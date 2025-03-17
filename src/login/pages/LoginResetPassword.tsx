import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, TextInput } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, messagesPerField, auth } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>

                        <TextInput
                            label={!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                    ? msg("usernameOrEmail")
                                    : msg("email")}
                            error={messagesPerField.existsError("username") && messagesPerField.getFirstError("username")}
                            type="text"
                            id="username"
                            name="username"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        />

                </div>
                <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>



                        <Button
                            className={"mt-6 mb-4"}
                            type="submit"
                            fullWidth
                        >
                            {msgStr("doSubmit")}
                        </Button>

                    <div className={"flex justify-center"}>
                        <a href={url.loginUrl} className={"flex items-center gap-1 group text-neutral-500 text-sm"}>
                            <IconArrowLeft size={18} className={"group-hover:-translate-x-1 transition"} />
                            {msgStr("backToLogin").replace("&laquo;", "")}
                        </a>
                    </div>
                </div>
            </form>
        </Template>
    );
}
