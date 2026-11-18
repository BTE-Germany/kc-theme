import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconArrowsExchange } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginIdpLinkConfirmOverride(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm-override.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, idpDisplayName } = kcContext;

    const { msg } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconArrowsExchange />} tone="warning" title={msg("confirmOverrideIdpTitle")} />}
            displayInfo
            infoNode={
                <p>
                    {msg("pageExpiredMsg1")}{" "}
                    <a id="loginRestartLink" href={url.loginRestartFlowUrl} className="kc-link">
                        {msg("doClickHere")}
                    </a>
                </p>
            }
        >
            <form id="kc-register-form" action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <Button
                    type="submit"
                    size="lg"
                    className="h-auto min-h-11 w-full py-2.5 text-center whitespace-normal"
                    loading={isSubmitting}
                    name="submitAction"
                    id="confirmOverride"
                    value="confirmOverride"
                >
                    {msg("confirmOverrideIdpContinue", idpDisplayName)}
                </Button>
            </form>
        </Template>
    );
}
