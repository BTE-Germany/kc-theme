import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("pageExpiredTitle")}>
            <div className={"flex flex-col gap-4 text-neutral-400 font-light"}>
                <p id="instruction1" className="instruction">
                    {msg("pageExpiredMsg1")}{" "}
                    <a id="loginRestartLink" href={url.loginRestartFlowUrl} className={"text-blue-500 hover:text-blue-600"}>
                        {msg("doClickHere")}
                    </a>
                    <br />
                    {msg("pageExpiredMsg2")}{" "}
                    <a id="loginContinueLink" href={url.loginAction} className={"text-blue-500 hover:text-blue-600"}>
                        {msg("doClickHere")}
                    </a>

                </p>
            </div>

        </Template>
    );
}
