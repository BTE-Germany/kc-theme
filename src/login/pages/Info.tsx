import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { IconArrowRight, IconInfoCircle } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    const summaryHtml = (() => {
        let html = message.summary?.trim() ?? "";

        if (requiredActions) {
            html += ` <b>${requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ")}</b>`;
        }

        return html;
    })();

    const action = (() => {
        if (skipLink) {
            return undefined;
        }
        if (pageRedirectUri) {
            return { href: pageRedirectUri, label: msg("returnToApplication"), primary: false };
        }
        if (actionUri) {
            return { href: actionUri, label: msg("proceed"), primary: true };
        }
        if (client.baseUrl) {
            return { href: client.baseUrl, label: msg("returnToApplication"), primary: false };
        }
        return undefined;
    })();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <PageHeader
                    icon={<IconInfoCircle />}
                    title={<span dangerouslySetInnerHTML={{ __html: kcSanitize(messageHeader ?? message.summary) }} />}
                />
            }
        >
            <div id="kc-info-message" className="flex flex-col gap-6">
                {messageHeader !== undefined && (
                    <p
                        className="kc-rich-text text-sm leading-relaxed text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: kcSanitize(summaryHtml) }}
                    />
                )}
                {messageHeader === undefined && requiredActions !== undefined && (
                    <p className="text-sm text-muted-foreground">
                        <b className="text-foreground">
                            {requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ")}
                        </b>
                    </p>
                )}
                {action !== undefined && (
                    <Button asChild size="lg" variant={action.primary ? "default" : "outline"} className="group w-full">
                        <a href={action.href}>
                            {action.label}
                            <IconArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>
                    </Button>
                )}
            </div>
        </Template>
    );
}
