import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import { IconFingerprint, IconFingerprintScan } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PageHeader } from "../components/PageHeader";

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, isSetRetry, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({ authButtonId, kcContext, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconFingerprintScan />} title={msg("webauthn-registration-title")} />}
        >
            <div className="flex flex-col gap-5">
                {/* Filled in and submitted by Keycloak's webauthnRegister.js. */}
                <form id="register" action={url.loginAction} method="post">
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="authenticatorAttachment" name="authenticatorAttachment" />
                    <input type="hidden" id="error" name="error" />
                    <div id="kc-form-options" className="flex items-center gap-2.5">
                        <Checkbox id="logout-sessions" name="logout-sessions" value="on" />
                        <Label htmlFor="logout-sessions" className="cursor-pointer font-normal text-muted-foreground">
                            {msg("logoutOtherSessions")}
                        </Label>
                    </div>
                </form>

                <div className="mt-1 flex flex-col gap-3">
                    <Button id={authButtonId} type="button" size="lg" className="w-full">
                        <IconFingerprint aria-hidden="true" />
                        {msgStr("doRegisterSecurityKey")}
                    </Button>

                    {!isSetRetry && isAppInitiatedAction && (
                        <form id="kc-webauthn-settings-form" action={url.loginAction} method="post">
                            <Button
                                type="submit"
                                id="cancelWebAuthnAIA"
                                name="cancel-aia"
                                value="true"
                                variant="outline"
                                size="lg"
                                className="w-full"
                            >
                                {msg("doCancel")}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
