import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { IconAlertTriangle, IconArrowLeft } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={<PageHeader icon={<IconAlertTriangle />} tone="error" title={msg("errorTitle")} />}
        >
            <div id="kc-error-message" className="flex flex-col gap-6">
                <p
                    className="instruction kc-rich-text rounded-lg border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm leading-relaxed break-words text-foreground/90"
                    dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                />
                {!skipLink && !!client?.baseUrl && (
                    <Button asChild variant="outline" size="lg" className="group w-full">
                        <a id="backToApplication" href={client.baseUrl}>
                            <IconArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
                            <span className="truncate">{msg("returnToApplication")}</span>
                        </a>
                    </Button>
                )}
            </div>
        </Template>
    );
}
