import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

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
            headerNode={<h1 className={"text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 sm:mt-6"}>{msg("emailVerifyTitle")}</h1>}

        >
            <div className={"w-full max-w-md text-foreground"}>
                <p className="instruction">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
                <p className="instruction mt-4 text-muted-foreground">
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <a href={url.loginAction} className={"text-primary hover:underline"}>{msg("doClickHere")}</a>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </p>
            </div>

        </Template>
    );
}
