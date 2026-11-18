import type { ReactNode } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/WebauthnAuthenticate.useScript";
import { IconBluetooth, IconFingerprint, IconKey, IconNfc, IconUsb } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";

type WebauthnAuthenticator = Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>["authenticators"]["authenticators"][number];

const iconByTransport: Record<string, typeof IconKey> = {
    kcWebAuthnUSB: IconUsb,
    kcWebAuthnNFC: IconNfc,
    kcWebAuthnBLE: IconBluetooth,
    kcWebAuthnInternal: IconFingerprint
};

export default function WebauthnAuthenticate(props: PageProps<Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, registrationDisabled, authenticators, shouldDisplayAuthenticators } = kcContext;

    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({ authButtonId, kcContext, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <span id="kc-registration">
                    {msg("noAccount")}{" "}
                    <a href={url.registrationUrl} className="kc-link">
                        {msg("doRegister")}
                    </a>
                </span>
            }
            headerNode={<PageHeader icon={<IconFingerprint />} title={msg("webauthn-login-title")} subtitle={msg("webauthn-help-text")} />}
        >
            <div id="kc-form-webauthn" className="flex flex-col gap-5">
                <form id="webauth" action={url.loginAction} method="post" hidden>
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="authenticatorData" name="authenticatorData" />
                    <input type="hidden" id="signature" name="signature" />
                    <input type="hidden" id="credentialId" name="credentialId" />
                    <input type="hidden" id="userHandle" name="userHandle" />
                    <input type="hidden" id="error" name="error" />
                </form>

                {authenticators && (
                    <>
                        <form id="authn_select" hidden>
                            {authenticators.authenticators.map(authenticator => (
                                <input
                                    key={authenticator.credentialId}
                                    type="hidden"
                                    name="authn_use_chk"
                                    readOnly
                                    value={authenticator.credentialId}
                                />
                            ))}
                        </form>

                        {shouldDisplayAuthenticators && (
                            <AuthenticatorList
                                authenticators={authenticators.authenticators}
                                title={authenticators.authenticators.length > 1 ? msg("webauthn-available-authenticators") : undefined}
                                createdAtLabel={msg("webauthn-createdAt-label")}
                                i18n={i18n}
                            />
                        )}
                    </>
                )}

                <div id="kc-form-buttons">
                    <Button id={authButtonId} type="button" size="lg" className="w-full" autoFocus>
                        <IconFingerprint aria-hidden="true" />
                        {msgStr("webauthn-doAuthenticate")}
                    </Button>
                </div>
            </div>
        </Template>
    );
}

function AuthenticatorList(props: { authenticators: WebauthnAuthenticator[]; title: ReactNode; createdAtLabel: ReactNode; i18n: I18n }) {
    const { authenticators, title, createdAtLabel, i18n } = props;

    const { advancedMsg } = i18n;

    return (
        <div className="flex flex-col gap-2">
            {title !== undefined && <p className="text-sm font-medium">{title}</p>}
            <ul className="divide-y overflow-hidden rounded-lg border bg-card/60">
                {authenticators.map((authenticator, i) => {
                    const Icon = iconByTransport[authenticator.transports.iconClass] ?? IconKey;
                    const transports = authenticator.transports.displayNameProperties ?? [];

                    return (
                        <li
                            key={authenticator.credentialId}
                            id={`kc-webauthn-authenticator-item-${i}`}
                            className="flex min-h-14 items-center gap-3.5 px-4 py-3"
                        >
                            <span
                                className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
                                aria-hidden="true"
                            >
                                <Icon className="size-[18px]" />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p id={`kc-webauthn-authenticator-label-${i}`} className="truncate text-sm font-medium">
                                    {advancedMsg(authenticator.label)}
                                </p>
                                {transports.length !== 0 && (
                                    <p id={`kc-webauthn-authenticator-transport-${i}`} className="truncate text-xs text-muted-foreground">
                                        {transports.map((displayNameProperty, index) => (
                                            <span key={displayNameProperty}>
                                                {advancedMsg(displayNameProperty)}
                                                {index !== transports.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>{createdAtLabel}</span>{" "}
                                    <span id={`kc-webauthn-authenticator-created-${i}`}>{authenticator.createdAt}</span>
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
