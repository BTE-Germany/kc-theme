import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <>
                    <h1 className={"text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 sm:mt-6"}><span
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(messageHeader ?? message.summary)
                        }}
                    /></h1>
                </>

            }
        >
            <div id="kc-info-message" className={"w-full max-w-md text-foreground text-center"}>
                <p
                    className="instruction"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = message.summary?.trim();

                                if (requiredActions) {
                                    html += " <b>";

                                    html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                    html += "</b>";
                                }

                                return html;
                            })()
                        )
                    }}
                />
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <p>
                                <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p>
                                <a href={actionUri} ><Button className={"mt-4"}>
                                    {msg("proceedWithAction")}
                                </Button></a>
                            </p>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <p>
                                <a href={client.baseUrl}><Button className={"mt-4"} variant={"secondary"}>
                                    {msg("backToApplication")}
                                </Button></a>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
