import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={<h1 className={"text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 sm:mt-6"}>{msg("pageExpiredTitle")}</h1>}>
            <p id="instruction1" className="instruction w-full max-w-md">
                <div className={"flex gap-2"}>
                    {msg("pageExpiredMsg1")}
                    <a id="loginRestartLink" href={url.loginRestartFlowUrl} className={"text-primary hover:underline"}>
                        {msg("doClickHere")}{" "}
                    </a>{" "}
                </div>
                <div className={"flex gap-2"}>
                    {msg("pageExpiredMsg2")}
                    <a id="loginContinueLink" href={url.loginAction} className={"text-primary hover:underline"}>
                        {msg("doClickHere")}{" "}
                    </a>{" "}
                </div>
            </p>
        </Template>
    );
}
