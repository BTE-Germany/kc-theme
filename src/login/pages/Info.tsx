import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { IconArrowLeft, IconArrowRight, IconInfoCircle } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msgStr } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: messageHeader ?? message.summary
                    }}
                />
            }
        >
            <div id="kc-info-message" >
                <div
                    className="border border-neutral-700 p-4 rounded-lg my-6 flex gap-3 font-light bg-blue-600/10 text-blue-100">

                    <IconInfoCircle />
                    <p

                        dangerouslySetInnerHTML={{
                            __html: (() => {
                                let html = message.summary;

                                if (requiredActions) {
                                    html += "<b>";

                                    html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                    html += "</b>";
                                }

                                return html;
                            })()
                        }}
                    />
                </div>

                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <p>
                                <Button component={"a"} href={pageRedirectUri} variant={"default"} leftSection={<IconArrowLeft size={16}/>}>{msgStr("backToApplication").replace("&laquo;", "")}</Button>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p>
                                <Button component={"a"} href={pageRedirectUri} variant={"default"} rightSection={<IconArrowRight size={16}/>}>
                                    {msgStr("proceedWithAction").replace("&raquo;", "")}
                                </Button>
                            </p>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <p>
                                <Button component={"a"} href={pageRedirectUri} variant={"default"} leftSection={<IconArrowLeft size={16}/>}>{msgStr("backToApplication").replace("&laquo;", "")}</Button>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
