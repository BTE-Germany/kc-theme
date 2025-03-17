import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { IconArrowLeft, IconExclamationCircle } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div id="kc-error-message">
                <div
                    className="border border-neutral-700 p-4 rounded-lg mb-6 flex gap-3 font-light bg-red-600/10 text-red-100">
                    <IconExclamationCircle />
                    <p dangerouslySetInnerHTML={{ __html: message.summary }} />
                </div>
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <Button component={"a"} href={client.baseUrl} variant={"default"} leftSection={<IconArrowLeft
                        size={16} />}>{msgStr("backToApplication").replace("&laquo;", "")}</Button>
                )}
            </div>
        </Template>
    );
}
