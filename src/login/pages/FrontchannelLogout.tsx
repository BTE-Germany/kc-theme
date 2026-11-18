import { useEffect, useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconCircleCheck, IconLoader2, IconLogout } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";

export default function FrontchannelLogout(props: PageProps<Extract<KcContext, { pageId: "frontchannel-logout.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { logout } = kcContext;

    const { msg, msgStr } = i18n;

    const [iframeLoadCount, setIframeLoadCount] = useState(0);
    // Only used for the per-client status indicator; the redirect below relies on iframeLoadCount, like Keycloakify's original.
    const [loadedClientIndexes, setLoadedClientIndexes] = useState<ReadonlySet<number>>(new Set());

    useEffect(() => {
        if (!kcContext.logout.logoutRedirectUri) {
            return;
        }

        if (iframeLoadCount !== kcContext.logout.clients.length) {
            return;
        }

        window.location.replace(kcContext.logout.logoutRedirectUri);
    }, [iframeLoadCount]);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            documentTitle={msgStr("frontchannel-logout.title")}
            headerNode={<PageHeader icon={<IconLogout />} title={msg("frontchannel-logout.title")} subtitle={msg("frontchannel-logout.message")} />}
        >
            <div className="flex flex-col gap-5">
                <ul className="divide-y rounded-lg border bg-card/60">
                    {logout.clients.map((client, index) => {
                        const isLoaded = loadedClientIndexes.has(index);

                        return (
                            <li key={`${client.name}-${index}`} className="flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-sm">
                                <span className="min-w-0 truncate font-medium">{client.name}</span>
                                {isLoaded ? (
                                    <IconCircleCheck className="size-5 shrink-0 text-emerald-400 animate-pop" aria-hidden="true" />
                                ) : (
                                    <IconLoader2 className="size-5 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" />
                                )}
                                <iframe
                                    src={client.frontChannelLogoutUrl}
                                    title={client.name}
                                    style={{ display: "none" }}
                                    onLoad={() => {
                                        setIframeLoadCount(count => count + 1);
                                        setLoadedClientIndexes(indexes => new Set(indexes).add(index));
                                    }}
                                />
                            </li>
                        );
                    })}
                </ul>

                {logout.logoutRedirectUri !== undefined && (
                    <Button asChild size="lg" className="w-full">
                        <a id="continue" href={logout.logoutRedirectUri}>
                            {msg("doContinue")}
                        </a>
                    </Button>
                )}
            </div>
        </Template>
    );
}
