import { IconFingerprint } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import type { I18n } from "../i18n";

type Props = {
    loginAction: string;
    authenticators: { authenticators: { credentialId: string }[] } | undefined;
    webAuthnButtonId: string;
    i18n: I18n;
};

/**
 * Hidden forms and the button used by Keycloak's WebAuthn (passkey) scripts.
 * The element ids are part of Keycloak's contract and must not change.
 */
export function PasskeyForms(props: Props) {
    const { loginAction, authenticators, webAuthnButtonId, i18n } = props;

    const { msg } = i18n;

    return (
        <>
            <form id="webauth" action={loginAction} method="post" hidden>
                <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                <input type="hidden" id="authenticatorData" name="authenticatorData" />
                <input type="hidden" id="signature" name="signature" />
                <input type="hidden" id="credentialId" name="credentialId" />
                <input type="hidden" id="userHandle" name="userHandle" />
                <input type="hidden" id="error" name="error" />
            </form>
            {authenticators !== undefined &&
                authenticators.authenticators.length !== 0 && (
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
                )}
            <Button
                id={webAuthnButtonId}
                type="button"
                variant="outline"
                className="mt-3 w-full"
            >
                <IconFingerprint aria-hidden="true" />
                {msg("passkey-doAuthenticate")}
            </Button>
        </>
    );
}
