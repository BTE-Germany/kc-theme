import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<h1 className={"text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 sm:mt-6"}>{msg("emailLinkIdpTitle", idpAlias)}</h1>}
        >
            <div className={"w-full max-w-md text-foreground flex flex-col gap-4"}>
                <p id="instruction1" className="instruction font-medium">
                    {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
                </p>
                <p id="instruction2" className="instruction text-muted-foreground">
                    {msg("emailLinkIdp2")} <a href={url.loginAction}>{msg("doClickHere")}</a> {msg("emailLinkIdp3")}
                </p>
                <p id="instruction3" className="instruction text-muted-foreground">
                    {msg("emailLinkIdp4")} <a href={url.loginAction}>{msg("doClickHere")}</a> {msg("emailLinkIdp5")}
                </p>
            </div>
        </Template>
    );
}
