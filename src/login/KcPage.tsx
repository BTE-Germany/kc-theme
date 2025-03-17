import { lazy, Suspense } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import "@mantine/core/styles.css";
import "./main.css";

import { MantineProvider } from "@mantine/core";

const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Info = lazy(() => import("./pages/Info"));
const Error = lazy(() => import("./pages/Error"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginIdpLinkEmail = lazy(() => import("./pages/LoginIdpLinkEmail"));
const IdpReviewUserProfile = lazy(() => import("./pages/IdpReviewUserProfile"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));


const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            <MantineProvider defaultColorScheme={"dark"} withGlobalClasses={true}>
                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <Login
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "register.ftl":
                            return (
                                <Register
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                        case "info.ftl":
                            return (
                                <Info
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "error.ftl":
                            return (
                                <Error
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "login-reset-password.ftl":
                            return (
                                <LoginResetPassword
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "login-update-profile.ftl":
                            return (
                                <LoginUpdateProfile
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                        case "login-update-password.ftl":
                            return (
                                <LoginUpdatePassword
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "login-idp-link-confirm.ftl":
                            return (
                                <LoginIdpLinkConfirm
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "login-idp-link-email.ftl":
                            return (
                                <LoginIdpLinkEmail
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "idp-review-user-profile.ftl":
                            return (
                                <IdpReviewUserProfile
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                        case "login-page-expired.ftl":
                            return (
                                <LoginPageExpired
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "login-verify-email.ftl":
                            return (
                                <LoginVerifyEmail
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "login-otp.ftl":
                            return (
                                <LoginOtp
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
            </MantineProvider>
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
