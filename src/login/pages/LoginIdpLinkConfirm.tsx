import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;



    const { url, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("confirmLinkIdpTitle")}>
            <form id="kc-register-form" action={url.loginAction} method="post">
                <div className={"flex flex-col gap-4"}>
                    <Button
                        type="submit"
                        leftSection={<IconPlus size={16} />}
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                    >
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                    <Button
                        type="submit"
                        leftSection={<IconSearch size={16} />}
                        variant={"light"}
                        name="submitAction"
                        id="updateProfile"
                        value="updateProfile"
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>

                </div>
            </form>
        </Template>
    );
}
