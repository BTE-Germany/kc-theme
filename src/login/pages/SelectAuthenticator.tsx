import type { PageProps } from "keycloakify/login/pages/PageProps";
import {
    IconCertificate,
    IconChevronRight,
    IconDeviceMobileCode,
    IconFingerprint,
    IconLifebuoy,
    IconListDetails,
    IconLockPassword,
    IconShieldLock,
    IconUser
} from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PageHeader } from "../components/PageHeader";

type AuthenticationSelection = Extract<KcContext, { pageId: "select-authenticator.ftl" }>["auth"]["authenticationSelections"][number];

const iconByCssClass: Record<string, typeof IconUser> = {
    kcAuthenticatorDefaultClass: IconListDetails,
    kcAuthenticatorPasswordClass: IconLockPassword,
    kcAuthenticatorOTPClass: IconDeviceMobileCode,
    kcAuthenticatorWebAuthnClass: IconFingerprint,
    kcAuthenticatorWebAuthnPasswordlessClass: IconFingerprint
};

// Some authenticators don't set an icon class, so fall back to their message key.
const iconByDisplayName: Record<string, typeof IconUser> = {
    "auth-username-form-display-name": IconUser,
    "auth-username-password-form-display-name": IconLockPassword,
    "password-display-name": IconLockPassword,
    "otp-display-name": IconDeviceMobileCode,
    "webauthn-display-name": IconFingerprint,
    "webauthn-passwordless-display-name": IconFingerprint,
    "auth-recovery-authn-code-form-display-name": IconLifebuoy,
    "auth-x509-client-username-form-display-name": IconCertificate
};

function getIcon(selection: AuthenticationSelection) {
    return iconByDisplayName[selection.displayName] ?? (selection.iconCssClass && iconByCssClass[selection.iconCssClass]) ?? IconListDetails;
}

export default function SelectAuthenticator(props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, auth } = kcContext;

    const { msg, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={<PageHeader icon={<IconShieldLock />} title={msg("loginChooseAuthenticator")} />}
        >
            <form id="kc-select-credential-form" action={url.loginAction} method="post">
                <div className="divide-y overflow-hidden rounded-lg border bg-card/60">
                    {auth.authenticationSelections.map((authenticationSelection, i) => {
                        const Icon = getIcon(authenticationSelection);

                        return (
                            <button
                                key={i}
                                type="submit"
                                name="authenticationExecution"
                                value={authenticationSelection.authExecId}
                                className="group flex min-h-16 w-full cursor-pointer items-center gap-4 px-4 py-3.5 text-left transition-colors outline-none hover:bg-accent/60 focus-visible:bg-accent/40 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-inset"
                            >
                                <span
                                    className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary-foreground ring-1 ring-primary/30"
                                    aria-hidden="true"
                                >
                                    <Icon className="size-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-medium break-words">{advancedMsg(authenticationSelection.displayName)}</span>
                                    <span className="mt-0.5 block text-xs leading-snug break-words text-muted-foreground">
                                        {advancedMsg(authenticationSelection.helpText)}
                                    </span>
                                </span>
                                <IconChevronRight
                                    className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
                                    aria-hidden="true"
                                />
                            </button>
                        );
                    })}
                </div>
            </form>
        </Template>
    );
}
