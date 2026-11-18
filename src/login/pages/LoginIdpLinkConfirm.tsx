import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconLink, IconUserSearch } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconLink />} title={msg("confirmLinkIdpTitle")} />}
        >
            <form id="kc-register-form" action={url.loginAction} method="post" className="flex flex-col gap-3">
                <Button type="submit" size="lg" className="w-full" name="submitAction" id="updateProfile" value="updateProfile">
                    <IconUserSearch aria-hidden="true" />
                    {msg("confirmLinkIdpReviewProfile")}
                </Button>
                <Button type="submit" size="lg" variant="outline" className="w-full" name="submitAction" id="linkAccount" value="linkAccount">
                    <IconLink aria-hidden="true" />
                    <span className="truncate">{msg("confirmLinkIdpContinue", idpAlias)}</span>
                </Button>
            </form>
        </Template>
    );
}
