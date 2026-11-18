import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconCheck, IconExternalLink, IconShieldCheck } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginOauthGrant(props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

    const { url, oauth, client } = kcContext;

    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

    const { isSubmitting, submitterName, onSubmit } = useIsSubmitting();

    const clientName = client.name ? advancedMsgStr(client.name) : client.clientId;
    const { logoUri, tosUri, policyUri } = client.attributes;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <PageHeader
                    icon={
                        logoUri ? <img src={logoUri} alt="" className="size-full rounded-full bg-white object-contain p-1.5" /> : <IconShieldCheck />
                    }
                    title={<span className="break-words">{msg("oauthGrantTitle", clientName)}</span>}
                    subtitle={msg("oauthGrantRequest")}
                />
            }
            displayInfo={!!(tosUri || policyUri)}
            infoNode={
                <div className="flex flex-col gap-2">
                    <p className="break-words">{msg("oauthGrantInformation", clientName)}</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                        {tosUri && (
                            <a href={tosUri} target="_blank" rel="noopener noreferrer" className="kc-link inline-flex items-center gap-1">
                                {msg("oauthGrantTos")}
                                <IconExternalLink className="size-3.5" aria-hidden="true" />
                            </a>
                        )}
                        {policyUri && (
                            <a href={policyUri} target="_blank" rel="noopener noreferrer" className="kc-link inline-flex items-center gap-1">
                                {msg("oauthGrantPolicy")}
                                <IconExternalLink className="size-3.5" aria-hidden="true" />
                            </a>
                        )}
                    </div>
                </div>
            }
        >
            <div id="kc-oauth" className="flex flex-col gap-5">
                <ul className="divide-y rounded-lg border bg-card/60">
                    {oauth.clientScopesRequested.map((clientScope, index) => (
                        <li key={`${clientScope.consentScreenText}-${index}`} className="flex min-h-12 items-center gap-3 px-4 py-3 text-sm">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                                <IconCheck className="size-3.5" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 break-words">
                                {advancedMsg(clientScope.consentScreenText)}
                                {clientScope.dynamicScopeParameter && (
                                    <>
                                        : <b className="font-mono font-medium break-all">{clientScope.dynamicScopeParameter}</b>
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>

                <form action={url.oauthAction} method="POST" onSubmit={onSubmit} className="grid grid-cols-2 gap-3">
                    <input type="hidden" name="code" value={oauth.code} />

                    <Button
                        type="submit"
                        variant="outline"
                        size="lg"
                        className="w-full"
                        name="cancel"
                        id="kc-cancel"
                        value={msgStr("doNo")}
                        loading={isSubmitting && submitterName === "cancel"}
                    >
                        {msgStr("doNo")}
                    </Button>
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        name="accept"
                        id="kc-login"
                        value={msgStr("doYes")}
                        loading={isSubmitting && submitterName === "accept"}
                    >
                        {msgStr("doYes")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
