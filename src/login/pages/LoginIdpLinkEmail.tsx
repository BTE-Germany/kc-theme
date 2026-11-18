import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconMailForward } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PageHeader } from "../components/PageHeader";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconMailForward />} title={msg("emailLinkIdpTitle", idpAlias)} />}
        >
            <div className="flex flex-col gap-4 text-sm leading-relaxed">
                <p id="instruction1" className="instruction rounded-lg border bg-card/60 p-4 break-words">
                    {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
                </p>
                <p id="instruction2" className="instruction text-muted-foreground">
                    {msg("emailLinkIdp2")} {/* Both links read "Click here"; give each a name that says what it does. */}
                    <a
                        href={url.loginAction}
                        className="kc-link"
                        aria-label={`${msgStr("emailLinkIdp2")} ${msgStr("doClickHere")} ${msgStr("emailLinkIdp3")}`}
                    >
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp3")}
                </p>
                <p id="instruction3" className="instruction text-muted-foreground">
                    {msg("emailLinkIdp4")}{" "}
                    <a
                        href={url.loginAction}
                        className="kc-link"
                        aria-label={`${msgStr("emailLinkIdp4")} ${msgStr("doClickHere")} ${msgStr("emailLinkIdp5")}`}
                    >
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp5")}
                </p>
            </div>
        </Template>
    );
}
