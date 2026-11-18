import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconMailCheck } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PageHeader } from "../components/PageHeader";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={<PageHeader icon={<IconMailCheck />} title={msg("emailVerifyTitle")} />}
            infoNode={
                <p className="instruction">
                    {msg("emailVerifyInstruction2")}{" "}
                    <a href={url.loginAction} className="kc-link">
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailVerifyInstruction3")}
                </p>
            }
        >
            <div className="rounded-lg border bg-card/60 p-4 text-sm leading-relaxed text-muted-foreground">
                <p className="instruction break-words">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
            </div>
        </Template>
    );
}
