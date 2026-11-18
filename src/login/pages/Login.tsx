import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { IconBox, IconBrandApple, IconBrandDiscord, IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { Suspense, useState } from "react";

const getSocialIcon = (provider: string) => {
    switch (provider) {
        case "google":
            return <IconBrandGoogleFilled />;
        case "github":
            return <IconBrandGithub />;
        case "apple":
            return <IconBrandApple />;
        case "discord":
            return <IconBrandDiscord />;
        default:
            return <IconBox />;
    }
}

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
            headerNode={
                <>
                    <h1 className={"text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 sm:mt-6"}>Willkommen zurück.</h1>
                    <p className={"text-sm sm:text-md mt-2 text-neutral-500"}>Bitte melde dich an, um fortzufahren.</p>
                </>
            }
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div className={"text-sm font-medium mt-5 text-neutral-500"}>
                    <span>
                        {msg("noAccount")}{" "}
                        <a tabIndex={8} href={url.registrationUrl} className={"text-neutral-100 hover:underline transition"}>
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div className={"w-full mt-3 flex flex-col gap-3"}>
                            {social.providers.map((...[p]) => (
                                <Button
                                    key={p.alias}
                                    id={`social-${p.alias}`}
                                    asChild
                                    variant={"outline"}
                                    className={"w-full"}
                                >
                                    <a href={p.loginUrl}>
                                        {getSocialIcon(p.alias)}
                                        {p.displayName}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    )}
                </>
            }
        >
            <Suspense fallback={null}>
                <div className={"w-full max-w-sm"}>
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            className={"w-full"}
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <>
                                    <div className="grid w-full max-w-sm items-center gap-3">
                                        <Label htmlFor="username">{!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                                ? msg("usernameOrEmail")
                                                : msg("email")}</Label>
                                        <div>
                                            <Input tabIndex={2}
                                                id="username"
                                                className={kcClsx("kcInputClass")}
                                                name="username"
                                                defaultValue={login.username ?? ""}
                                                type="text"
                                                autoFocus
                                                autoComplete="username"
                                                aria-invalid={messagesPerField.existsError("username", "password")} />
                                            {messagesPerField.existsError("username", "password") && (
                                                <span
                                                    id="input-error"
                                                    className={"text-destructive text-xs"}
                                                    aria-live="polite"
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}


                            <div className="grid w-full max-w-sm items-center gap-3 mt-5">
                                <Label htmlFor="password">{msg("password")}</Label>

                                <div>
                                    <Input tabIndex={3}
                                        id="password"
                                        className={kcClsx("kcInputClass")}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")} />
                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={"text-destructive text-xs"}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>
                            </div>


                            <div className={"flex justify-between items-center mt-5"}>
                                <div className={""}>
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="flex items-center gap-3">
                                            <Checkbox tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                defaultChecked={!!login.rememberMe} />
                                            <Label htmlFor="rememberMe">{msg("rememberMe")}</Label>
                                        </div>
                                    )}
                                </div>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <a tabIndex={6} href={url.loginResetCredentialsUrl} className={"text-sm font-medium hover:underline transition"}>
                                            {msg("doForgotPassword")}
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className={"mt-5"}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <Button
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={"w-full"}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                >
                                    {msgStr("doLogIn")}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </Suspense>
        </Template>
    );
}
