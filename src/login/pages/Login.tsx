import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Checkbox, Divider, PasswordInput, SimpleGrid, TextInput } from "@mantine/core";
import {
    IconBox,
    IconBrandApple,
    IconBrandDiscord,
    IconBrandGithub,
    IconBrandGoogle,
    IconKey,
    IconUser, IconWorld
} from "@tabler/icons-react";

const getSocialIcon = (provider: string) => {
    switch (provider) {
        case "discord":
            return <IconBrandDiscord size={18} />;
        case "google":
            return <IconBrandGoogle size={18} />;
        case "apple":
            return <IconBrandApple size={18} />;
        case "github":
            return <IconBrandGithub size={18} />;
        case "buildtheearth":
            return <IconWorld size={18} />;
        default:
            return <IconBox size={18} />;
    }
};

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={<>
                <span>{msg("loginAccountTitle")}</span><br/>
                <span className={"text-sm text-neutral-500 font-normal"}>{msg("loginAccountSubtitle")}</span>
            </>}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl} className={"text-blue-500"}>
                                {msg("doRegister")}
                            </a>

                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers?.length && (
                        <div id="kc-social-providers" className={"mt-4"}>
                            <Divider my="lg" label={msg("identity-provider-login-label")} labelPosition="center" />

                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                <SimpleGrid cols={social.providers.length >= 4 ? 2 : 1}>
                                    {social.providers.map((p) => (
                                        <Button
                                            variant="outline"
                                            color="gray"
                                            key={p.providerId}
                                            id={`social-${p.alias}`}
                                            component="a"
                                            href={p.loginUrl}
                                            leftSection={getSocialIcon(p.alias)}
                                        >
                                            {p.displayName}
                                        </Button>
                                    ))}
                                </SimpleGrid>
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            <div className={"flex flex-col gap-3"}>
                                {!usernameHidden && (
                                    <TextInput
                                        label={!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                                ? msg("usernameOrEmail")
                                                : msg("email")}
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        error={messagesPerField.existsError("username", "password") && messagesPerField.getFirstError("username", "password")}
                                        leftSection={<IconUser size={16} />}
                                    />
                                )}

                                <div>
                                    <PasswordInput
                                        label={msg("password")}
                                        leftSection={<IconKey size={16} />}
                                        tabIndex={3}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        error={messagesPerField.existsError("username", "password") && messagesPerField.getFirstError("username", "password")}
                                    />
                                    {realm.resetPasswordAllowed && (
                                        <a tabIndex={6} href={url.loginResetCredentialsUrl}
                                           className={"text-sm font-light text-blue-500"}>
                                            {msg("doForgotPassword")}
                                        </a>
                                    )}
                                </div>

                                {realm.rememberMe && !usernameHidden && (
                                    <Checkbox
                                        label={msg("rememberMe")}
                                        tabIndex={5}
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        className={"mt-2"}
                                        defaultChecked={!!login.rememberMe}
                                    />
                                )}


                                <input type="hidden" id="id-hidden-input" name="credentialId"
                                       value={auth.selectedCredential} />
                                <Button
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={"mt-6"}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    fullWidth={true}
                                >
                                    {msgStr("doLogIn")}
                                </Button>

                            </div>

                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
