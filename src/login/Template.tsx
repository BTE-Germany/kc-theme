import { useEffect, useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import "../index.css";
import { IconAlertHexagon, IconAlertTriangle, IconCheck, IconInfoCircle, IconReload } from "@tabler/icons-react";
import classNames from 'classnames';
import axios from "axios";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;


    const getBackgroundImage = async (): Promise<{ image: string, attribution: string }> => {
        const { data } = await axios.get("https://cms.bte-germany.de/items/login_images?filter[status][_eq]=published")
        const images = data.data
        const randomIndex = Math.floor(Math.random() * images.length);
        return {
            attribution: images[randomIndex].attribution,
            image: "https://cms.bte-germany.de/assets/" + images[randomIndex].image + "?format=webp&quality=80"
        }
    }

    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [imageAttribution, setImageAttribution] = useState<string | null>(null);

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
        getBackgroundImage().then(image => {
            setBackgroundImage(image.image);
            setImageAttribution(image.attribution);
        })
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: "dark bg-background text-foreground antialiased h-screen overflow-hidden"
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={"w-full h-screen bg-background overflow-y-auto max-h-screen max-w-screen"}>
            <div className={"flex flex-row h-full"}>
                <div className={"relative flex flex-col w-full lg:w-[70%] items-center bg-background px-4 sm:px-6 md:px-8 z-20 min-h-screen overflow-y-auto"}>

                    <div className={"flex-1 flex flex-col justify-center items-center w-full  max-w-sm py-8 sm:py-12"}>
                        <img src="https://cdn.bte-germany.de/general/logos/Logo.png" alt="" className={"w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6"} />
                        <div className={"z-50 flex items-center flex-col"}>
                            {(() => {
                                const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                    headerNode
                                ) : (
                                    <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                        <h1 className={"text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 sm:mt-6"}>Willkommen zurück.</h1>
                                        <p className={"text-sm sm:text-md mt-2 text-neutral-500"}>Angemeldet als {auth.attemptedUsername}</p>
                                        <a href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")} className={"flex justify-center mt-1"}>
                                            <div className="text-xs text-neutral-500 flex items-row items-center gap-2">
                                                <IconReload size={10} />
                                                <span className={"hover:underline"}>{msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                );


                                return node;
                            })()}

                        </div>

                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={classNames("w-full max-w-md my-4 sm:my-6 px-4 py-3 backdrop-blur-lg border border-border rounded-lg flex gap-3",
                                    {
                                        "bg-red-700/10 border-red-700/30": message.type === "error",
                                        "bg-green-700/10 border-green-700/30": message.type === "success",
                                        "bg-yellow-700/10 border-yellow-700/30": message.type === "warning",
                                        "bg-blue-700/10 border-blue-700/30": message.type === "info"
                                    }
                                )}
                            >
                                <div className="mt-0.5">
                                    {message.type === "success" && <IconCheck size={18} />}
                                    {message.type === "warning" && <IconAlertTriangle size={18} />}
                                    {message.type === "error" && <IconAlertHexagon size={18} />}
                                    {message.type === "info" && <IconInfoCircle size={18} />}
                                </div>
                                <span
                                    className={"text-sm"}
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(message.summary)
                                    }}
                                />
                            </div>
                        )}

                        <div className={"mt-6 sm:mt-8 z-50 w-full max-w-md px-2 sm:px-0"}>
                            {children}

                        </div>
                        <div className={"z-50 flex items-center flex-col w-full max-w-sm px-2 sm:px-0"}>
                            {socialProvidersNode}
                            {displayInfo && (
                                <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                                    <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                        {infoNode}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={"pb-4 sm:pb-6 text-[10px] sm:text-xs text-neutral-500 flex flex-wrap justify-center md:justify-start gap-1 sm:gap-2 w-full "}>
                        <span className="whitespace-nowrap">&copy; {new Date().getFullYear()} BuildTheEarth Germany e.V. - v{kcContext.themeVersion}</span>

                        <a href="https://bte-germany.de/legal" className={"hover:underline whitespace-nowrap"}>Impressum</a>
                        <a href="https://bte-germany.de/privacy" className={"hover:underline whitespace-nowrap"}>Datenschutz</a>
                    </div>

                </div>

                <div className={"w-full h-full bg-cover bg-center hidden lg:flex items-center justify-center overflow-hidden relative"} style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className={"absolute h-full w-full bg-gradient-to-r from-background via-30% via-background/60 to-transparent"}></div>
                    <div className={"absolute inset-0 bg-background/50"}></div>
                    <div className={"absolute right-2 bottom-2 text-[10px] lg:text-xs py-1.5 px-2 lg:py-2 lg:px-3 bg-neutral-800/40 text-neutral-200 rounded-lg backdrop-blur-sm max-w-[200px] lg:max-w-none"}>
                        {imageAttribution}
                    </div>
                </div>
            </div>

        </div>
    )
}
