import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconArrowLeft, IconLogout } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconLogout />} title={msg("logoutConfirmTitle")} subtitle={msg("logoutConfirmHeader")} />}
        >
            <div id="kc-logout-confirm" className="flex flex-col gap-3">
                <form action={url.logoutConfirmAction} method="POST" onSubmit={onSubmit}>
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        name="confirmLogout"
                        id="kc-logout"
                        value={msgStr("doLogout")}
                        loading={isSubmitting}
                    >
                        {msgStr("doLogout")}
                    </Button>
                </form>
                {!logoutConfirm.skipLink && client.baseUrl && (
                    <div id="kc-info-message">
                        <Button asChild variant="ghost" className="group w-full">
                            <a href={client.baseUrl}>
                                <IconArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
                                <span className="truncate">{msg("returnToApplication")}</span>
                            </a>
                        </Button>
                    </div>
                )}
            </div>
        </Template>
    );
}
