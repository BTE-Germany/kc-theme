import { useEffect } from "react";
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

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: "dark bg-background"
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={"w-screen h-screen overflow-x-hidden"}>
            <div className={"grid grid-cols-1 lg:grid-cols-2 h-full"}>
                <div className={"relative flex flex-col w-full justify-center items-center bg-background lg:bg-black py-20"}>
                    <div className={"absolute w-full flex flex-col items-center "}>
                        <img src={"/dotted-background.svg"} className={"w-full md:w-1/2 opacity-10 -translate-y-12 pointer-events-none"} />
                    </div>
                    <img src="https://cdn.bte-germany.de/general/logos/Logo.png" alt="" className={"w-16 h-16"}/>
                    <div className={"z-50 flex items-center flex-col"}>
                        {(() => {
                            const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                headerNode
                            ) : (
                                <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                    <h1 className={"text-4xl font-semibold mt-6"}>Willkommen zurück.</h1>
                                    <p className={"text-md mt-2 text-neutral-500"}>Angemeldet als {auth.attemptedUsername}</p>
                                    <a href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")} className={"flex justify-center mt-1"}>
                                        <div className="text-xs text-neutral-500 flex items-row items-center gap-2">
                                            <IconReload size={10}/>
                                            <span className={"hover:underline"}>{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            );


                            return node;
                        })()}

                    </div>

                    <div className={"absolute left-5 bottom-5 text-xs text-neutral-500 flex gap-2"}>
                        &copy; {new Date().getFullYear()} BuildTheEarth Germany e.V. - v{kcContext.themeVersion}

                        <a href="https://bte-germany.de/legal" className={"hover:underline"}>Impressum</a>
                        <a href="https://bte-germany.de/privacy" className={"hover:underline"}>Datenschutz</a>
                    </div>

                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <div
                            className={classNames("w-md my-6 px-4 py-3 backdrop-blur-lg border border-border rounded-lg flex gap-3",
                                {
                                    "bg-red-700/10 border-red-700/30": message.type === "error",
                                    "bg-green-700/10 border-green-700/30": message.type === "success",
                                    "bg-yellow-700/10 border-yellow-700/30": message.type === "warning",
                                    "bg-blue-700/10 border-blue-700/30": message.type === "info"
                                }
                            )}
                        >
                            <div className="mt-0.5">
                                {message.type === "success" && <IconCheck size={18}/>}
                                {message.type === "warning" && <IconAlertTriangle size={18} /> }
                                {message.type === "error" && <IconAlertHexagon size={18} />}
                                {message.type === "info" && <IconInfoCircle size={18}/> }
                            </div>
                            <span
                                className={"text-sm"}
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(message.summary)
                                }}
                            />
                        </div>
                    )}

                    <div className={"mt-8 z-50"}>
                        {children}

                    </div>
                    <div className={"z-50 flex items-center flex-col w-sm"}>
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

                <div className={"w-full h-full bg-[url(/background.webp)] bg-cover bg-center hidden lg:flex items-center justify-center"}>
                    {/*<div className={"absolute right-2 bottom-2 text-xs py-2 px-3 bg-neutral-800/40 text-neutral-200 rounded-lg backdrop-blur-sm"}>
                        Foto von <a href="https://unsplash.com/de/@chamfjord?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Chamfjord</a> auf <a href="https://unsplash.com/de/fotos/ein-raumschiff-fliegt-in-der-nahe-eines-fremden-planeten-muUX3rENBX0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

                    </div>*/}
                </div>
            </div>

        </div>
    )
}
