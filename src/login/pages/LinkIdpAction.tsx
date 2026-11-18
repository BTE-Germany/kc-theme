import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconLink } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LinkIdpAction(props: PageProps<Extract<KcContext, { pageId: "link-idp-action.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { idpDisplayName, url } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, submitterName, onSubmit } = useIsSubmitting();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <PageHeader
                    icon={<IconLink />}
                    title={<span className="break-words">{msg("linkIdpActionTitle", idpDisplayName)}</span>}
                    subtitle={
                        <span id="kc-link-text" className="break-words">
                            {msg("linkIdpActionMessage", idpDisplayName)}
                        </span>
                    }
                />
            }
        >
            <form action={url.loginAction} method="post" onSubmit={onSubmit} className="grid grid-cols-2 gap-3">
                <Button
                    type="submit"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    name="cancel-aia"
                    id="kc-cancel"
                    value={msgStr("doCancel")}
                    loading={isSubmitting && submitterName === "cancel-aia"}
                >
                    {msgStr("doCancel")}
                </Button>
                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    name="continue"
                    id="kc-continue"
                    value={msgStr("doContinue")}
                    loading={isSubmitting && submitterName === "continue"}
                >
                    {msgStr("doContinue")}
                </Button>
            </form>
        </Template>
    );
}
