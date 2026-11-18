import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconArrowRight, IconClockExclamation, IconRefresh } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconClockExclamation />} tone="warning" title={msg("pageExpiredTitle")} />}
        >
            <div id="instruction1" className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">{msg("pageExpiredMsg1")}</p>
                    <Button asChild size="lg" className="group w-full">
                        <a id="loginRestartLink" href={url.loginRestartFlowUrl}>
                            <IconRefresh className="transition-transform duration-500 group-hover:-rotate-180" aria-hidden="true" />
                            {msg("restartLoginTooltip")}
                        </a>
                    </Button>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">{msg("pageExpiredMsg2")}</p>
                    <Button asChild size="lg" variant="outline" className="group w-full">
                        <a id="loginContinueLink" href={url.loginAction}>
                            {msg("doContinue")}
                            <IconArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>
                    </Button>
                </div>
            </div>
        </Template>
    );
}
