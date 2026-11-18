import { lazy, Suspense } from "react";
import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import Template from "./Template";

const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Info = lazy(() => import("./pages/Info"));
const Error = lazy(() => import("./pages/Error"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const Terms = lazy(() => import("./pages/Terms"));
const LoginOauth2DeviceVerifyUserCode = lazy(
    () => import("./pages/LoginOauth2DeviceVerifyUserCode")
);
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const LoginUsername = lazy(() => import("./pages/LoginUsername"));
const LoginPassword = lazy(() => import("./pages/LoginPassword"));
const WebauthnAuthenticate = lazy(() => import("./pages/WebauthnAuthenticate"));
const WebauthnRegister = lazy(() => import("./pages/WebauthnRegister"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LinkIdpAction = lazy(() => import("./pages/LinkIdpAction"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"));
const LogoutConfirm = lazy(() => import("./pages/LogoutConfirm"));
const IdpReviewUserProfile = lazy(() => import("./pages/IdpReviewUserProfile"));
const UpdateEmail = lazy(() => import("./pages/UpdateEmail"));
const SelectAuthenticator = lazy(() => import("./pages/SelectAuthenticator"));
const SamlPostForm = lazy(() => import("./pages/SamlPostForm"));
const DeleteCredential = lazy(() => import("./pages/DeleteCredential"));
const Code = lazy(() => import("./pages/Code"));
const DeleteAccountConfirm = lazy(() => import("./pages/DeleteAccountConfirm"));
const FrontchannelLogout = lazy(() => import("./pages/FrontchannelLogout"));
const LoginRecoveryAuthnCodeConfig = lazy(
    () => import("./pages/LoginRecoveryAuthnCodeConfig")
);
const LoginRecoveryAuthnCodeInput = lazy(
    () => import("./pages/LoginRecoveryAuthnCodeInput")
);
const LoginResetOtp = lazy(() => import("./pages/LoginResetOtp"));
const LoginX509Info = lazy(() => import("./pages/LoginX509Info"));
const WebauthnError = lazy(() => import("./pages/WebauthnError"));
const LoginPasskeysConditionalAuthenticate = lazy(
    () => import("./pages/LoginPasskeysConditionalAuthenticate")
);
const LoginIdpLinkConfirmOverride = lazy(
    () => import("./pages/LoginIdpLinkConfirmOverride")
);
const SelectOrganization = lazy(() => import("./pages/SelectOrganization"));

const classes = {} satisfies { [key in ClassKey]?: string };

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    const common = { i18n, classes, Template, doUseDefaultCss: false } as const;

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return <Login {...common} kcContext={kcContext} />;
                    case "register.ftl":
                        return (
                            <Register
                                {...common}
                                kcContext={kcContext}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "info.ftl":
                        return <Info {...common} kcContext={kcContext} />;
                    case "error.ftl":
                        return <Error {...common} kcContext={kcContext} />;
                    case "login-reset-password.ftl":
                        return <LoginResetPassword {...common} kcContext={kcContext} />;
                    case "login-verify-email.ftl":
                        return <LoginVerifyEmail {...common} kcContext={kcContext} />;
                    case "terms.ftl":
                        return <Terms {...common} kcContext={kcContext} />;
                    case "login-oauth2-device-verify-user-code.ftl":
                        return (
                            <LoginOauth2DeviceVerifyUserCode
                                {...common}
                                kcContext={kcContext}
                            />
                        );
                    case "login-oauth-grant.ftl":
                        return <LoginOauthGrant {...common} kcContext={kcContext} />;
                    case "login-otp.ftl":
                        return <LoginOtp {...common} kcContext={kcContext} />;
                    case "login-username.ftl":
                        return <LoginUsername {...common} kcContext={kcContext} />;
                    case "login-password.ftl":
                        return <LoginPassword {...common} kcContext={kcContext} />;
                    case "webauthn-authenticate.ftl":
                        return <WebauthnAuthenticate {...common} kcContext={kcContext} />;
                    case "webauthn-register.ftl":
                        return <WebauthnRegister {...common} kcContext={kcContext} />;
                    case "login-update-password.ftl":
                        return <LoginUpdatePassword {...common} kcContext={kcContext} />;
                    case "link-idp-action.ftl":
                        return <LinkIdpAction {...common} kcContext={kcContext} />;
                    case "login-update-profile.ftl":
                        return (
                            <LoginUpdateProfile
                                {...common}
                                kcContext={kcContext}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "login-idp-link-confirm.ftl":
                        return <LoginIdpLinkConfirm {...common} kcContext={kcContext} />;
                    case "login-idp-link-email.ftl":
                        return <LoginIdpLinkEmail {...common} kcContext={kcContext} />;
                    case "login-page-expired.ftl":
                        return <LoginPageExpired {...common} kcContext={kcContext} />;
                    case "login-config-totp.ftl":
                        return <LoginConfigTotp {...common} kcContext={kcContext} />;
                    case "logout-confirm.ftl":
                        return <LogoutConfirm {...common} kcContext={kcContext} />;
                    case "idp-review-user-profile.ftl":
                        return (
                            <IdpReviewUserProfile
                                {...common}
                                kcContext={kcContext}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "update-email.ftl":
                        return (
                            <UpdateEmail
                                {...common}
                                kcContext={kcContext}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "select-authenticator.ftl":
                        return <SelectAuthenticator {...common} kcContext={kcContext} />;
                    case "saml-post-form.ftl":
                        return <SamlPostForm {...common} kcContext={kcContext} />;
                    case "delete-credential.ftl":
                        return <DeleteCredential {...common} kcContext={kcContext} />;
                    case "code.ftl":
                        return <Code {...common} kcContext={kcContext} />;
                    case "delete-account-confirm.ftl":
                        return <DeleteAccountConfirm {...common} kcContext={kcContext} />;
                    case "frontchannel-logout.ftl":
                        return <FrontchannelLogout {...common} kcContext={kcContext} />;
                    case "login-recovery-authn-code-config.ftl":
                        return (
                            <LoginRecoveryAuthnCodeConfig
                                {...common}
                                kcContext={kcContext}
                            />
                        );
                    case "login-recovery-authn-code-input.ftl":
                        return (
                            <LoginRecoveryAuthnCodeInput
                                {...common}
                                kcContext={kcContext}
                            />
                        );
                    case "login-reset-otp.ftl":
                        return <LoginResetOtp {...common} kcContext={kcContext} />;
                    case "login-x509-info.ftl":
                        return <LoginX509Info {...common} kcContext={kcContext} />;
                    case "webauthn-error.ftl":
                        return <WebauthnError {...common} kcContext={kcContext} />;
                    case "login-passkeys-conditional-authenticate.ftl":
                        return (
                            <LoginPasskeysConditionalAuthenticate
                                {...common}
                                kcContext={kcContext}
                            />
                        );
                    case "login-idp-link-confirm-override.ftl":
                        return (
                            <LoginIdpLinkConfirmOverride
                                {...common}
                                kcContext={kcContext}
                            />
                        );
                    case "select-organization.ftl":
                        return <SelectOrganization {...common} kcContext={kcContext} />;
                    default:
                        // Pages added in future Keycloak versions fall back to Keycloakify's default markup inside our Template.
                        return (
                            <DefaultPage
                                {...common}
                                kcContext={kcContext}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}
