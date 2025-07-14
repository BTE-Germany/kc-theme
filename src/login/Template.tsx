import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { motion } from "framer-motion";
import { LanguagePicker } from "./components/LanguagePicker.tsx";
import {
    IconAlertTriangle,
    IconCheck,
    IconExclamationCircle,
    IconInfoCircle,
     IconLogout2,
    IconReload
} from "@tabler/icons-react";
import classNames from 'classnames';
import { Avatar, Button, Tooltip } from "@mantine/core";

export default function CustomTemplate(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, enabledLanguages } = i18n;

    const { auth, url, message, isAppInitiatedAction } = kcContext;


    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });


    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={"grid grid-cols-6 w-screen h-screen overflow-hidden"}>
            <div className={"col-span-6 lg:col-span-4 2xl:col-span-2 flex h-full p-4 lg:p-16 items-start flex-col"}>
                <div className={"w-full"}>
                    <motion.div
                        initial={{ opacity: 0, scale: 1, y: "-100%", x: "-50%" }}
                        animate={{ opacity: 0.4, scale: 1, y: "-50%", x: "-50%" }}
                        transition={{ duration: 5, ease: "easeOut" }}
                        className={"w-60 h-60 bg-gradient-to-r from-blue-500 to-blue-950 rounded-full blur-[100px] -translate-y-1/2 absolute"} />

                    <div className={"w-full flex justify-between items-center flex-col gap-4 mt-6 lg:mt-0 lg:flex-row"}>
                        <div className={"flex justify-center  items-center gap-4"}>
                            <img
                                src="https://cdn.bte-germany.de/general/logos/Logo.png" alt=""
                                className={"w-12 h-12"} />
                            <div className={"flex items-center gap-2"}>
                                <h1
                                    className={"text-lg font-bold tracking-wide"}>
                                    BTE Germany

                                </h1>
                                {
                                    kcContext.themeName === "bte-germany-internal" ? (
                                            <div className={"bg-red-600 text-xs rounded-md py-1 px-2"}>
                                                Intern
                                            </div>
                                        ) :
                                        <div className={"bg-blue-600 text-xs rounded-md py-1 px-2"}>
                                            SSO
                                        </div>
                                }
                            </div>
                        </div>
                        {enabledLanguages.length > 1 && (
                            <LanguagePicker i18n={i18n} kcContext={kcContext} />
                        )}
                    </div>
                </div>

                <div className={"flex-1 flex flex-col my-12 lg:my-44 px-4 lg:px-16 w-full"}>
                    {(() => {
                        const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                            <h1 className={"mb-14 text-4xl font-bold "}>{headerNode}</h1>
                        ) : (
                            <div className={"flex justify-between w-full items-center"}>
                                <div className={"flex items-center gap-2"}>
                                    <Avatar name={auth.attemptedUsername} color="initials" />
                                    <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                </div>
                                <a id="reset-login" href={url.loginRestartFlowUrl}
                                   aria-label={msgStr("restartLoginTooltip")}>

                                    <Tooltip label={msg("restartLoginTooltip")} transitionProps={{ transition: 'pop-top-right', duration: 300 }} position={"left"}>
                                        <IconLogout2 className={"text-neutral-500"} size={20}/>
                                    </Tooltip>



                                </a>
                            </div>
                        );

                        if (displayRequiredFields) {
                            return (
                                <div className={kcClsx("kcContentWrapperClass")}>
                                    <div>
                                        <span className="text-xs text-neutral-600">
                                            <span className="required">*</span>
                                            {msg("requiredFields")}
                                        </span>
                                    </div>
                                    <div className="col-md-10">{node}</div>
                                </div>
                            );
                        }

                        return node;
                    })()}

                    {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <motion.div
                            className={classNames(
                                'border border-neutral-700 p-4 rounded-lg my-6 flex gap-3 font-light',
                                {
                                    'bg-green-600/10 text-green-100': message.type === "success",
                                    'bg-yellow-600/10 text-yellow-100': message.type === "warning",
                                    'bg-red-600/10 text-red-100': message.type === "error",
                                    'bg-blue-600/10 text-blue-100': message.type === "info"
                                }
                            )}
                            initial={{ opacity: 0, y: "15px" }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0,.99,.3,.99] }}
                        >
                            <div className="pf-c-alert__icon">
                                {message.type === "success" &&
                                    <IconCheck />}
                                {message.type === "warning" &&
                                    <IconAlertTriangle />}
                                {message.type === "error" &&
                                    <IconExclamationCircle />}
                                {message.type === "info" &&  <IconInfoCircle />}
                            </div>
                            <span
                                className={kcClsx("kcAlertTitleClass")}
                                dangerouslySetInnerHTML={{
                                    __html: message.summary
                                }}
                            />
                        </motion.div>
                    )}
                    {children}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                            <div className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" name="tryAnotherWay" value="on"/>
                                <Button
                                    id="try-another-way"
                                    fullWidth
                                    variant={"subtle"}
                                    className={"mt-6"}
                                    leftSection={<IconReload size={16}/>}
                                    onClick={() => {
                                        document.forms["kc-select-try-another-way-form" as never].submit();
                                        return false;
                                    }}
                                >
                                    {msg("doTryAnotherWay")}
                                </Button>
                            </div>
                        </form>
                    )}

                    {displayInfo && (
                        <div id="kc-info" className={"mt-1 pt-3 text-center text-neutral-500 font-light text-sm"}>
                            <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                {infoNode}
                            </div>
                        </div>
                    )}

                    {socialProvidersNode}
                </div>

                <div className={"flex text-xs text-neutral-500 gap-3 w-full items-end"}>
                    &copy; {new Date().getFullYear()} BuildTheEarth Germany e.V.
                    <a href="https://bte-germany.de/legal" className={"hover:underline"}>Impressum</a>
                    <a href="https://bte-germany.de/privacy" className={"hover:underline"}>Datenschutzerklärung</a>
                    <div className={"flex-1"}/>
                    <span className={"text-neutral-700/70"}>v{kcContext.themeVersion}</span>
                </div>

            </div>
            <div
                className={"w-full h-screen hidden lg:block lg:col-span-2 2xl:col-span-4 bg-[url(https://cdn.bte-germany.de/general/backgrounds/login/bg-1.webp)] bg-no-repeat bg-center bg-cover brightness-50"}>
            </div>
        </div>
    )
        ;
}
