import { isValidElement, useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import { IconMapPin, IconRefresh, IconUserCircle } from "@tabler/icons-react";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { PageHeader } from "./components/PageHeader";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useBackgroundImage } from "./components/useBackgroundImage";
import "../index.css";

const LOGO_URL = "https://cdn.bte-germany.de/general/logos/Logo.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
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

    const { msg, msgStr, currentLanguage } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
    }, []);

    useEffect(() => {
        document.documentElement.lang = currentLanguage.languageTag;
    }, [currentLanguage.languageTag]);

    useSetClassName({
        qualifiedName: "html",
        className: cn(kcClsx("kcHtmlClass"), "dark scheme-dark")
    });

    useSetClassName({
        qualifiedName: "body",
        className: "bg-background text-foreground antialiased"
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    const backgroundImage = useBackgroundImage();

    if (!isReadyToRender) {
        return null;
    }

    const shouldShowAttemptedUsername = auth !== undefined && auth.showUsername && !auth.showResetCredentials;

    return (
        <div className="relative isolate flex min-h-dvh w-full bg-background">
            {/* Mobile and tablet: the photo is a faint backdrop behind the form. */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden lg:hidden">
                {backgroundImage !== undefined && (
                    <div
                        className="absolute inset-0 scale-110 bg-cover bg-center opacity-25 blur-sm animate-fade-in"
                        style={{ backgroundImage: `url("${backgroundImage.src}")` }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/95 to-background" />
            </div>

            <div className="relative z-10 flex min-h-dvh w-full flex-col px-5 sm:px-10 lg:w-1/2 lg:max-w-[720px] lg:shrink-0 lg:border-r lg:border-border/60 lg:bg-background lg:px-14 xl:px-20">
                <header className="flex items-center justify-between gap-4 pt-5 sm:pt-8" aria-label={msgStr("mainNavigation")}>
                    <a
                        href={url.loginUrl}
                        className="group flex items-center gap-3 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                        <img
                            src={LOGO_URL}
                            alt=""
                            width={36}
                            height={36}
                            className="size-9 transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105"
                        />
                        <span className="text-sm leading-tight font-semibold tracking-tight">
                            BuildTheEarth
                            <span className="block text-xs font-normal text-muted-foreground">Germany</span>
                        </span>
                    </a>
                    <LanguageSwitcher i18n={i18n} />
                </header>

                <main id="kc-content" className="flex flex-1 flex-col justify-center py-10 sm:py-14">
                    <div className="kc-stagger mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
                        <div id="kc-header">
                            {isValidElement(headerNode) && headerNode.type === PageHeader ? headerNode : <PageHeader title={headerNode} />}
                        </div>

                        {shouldShowAttemptedUsername && (
                            <div
                                id="kc-username"
                                className="mt-5 flex items-center gap-3 rounded-lg border bg-card/60 py-2 pr-2 pl-3 backdrop-blur-sm"
                            >
                                <IconUserCircle className="size-6 shrink-0 text-muted-foreground" aria-hidden="true" />
                                <div className="min-w-0 flex-1 text-left">
                                    <p className="text-xs text-muted-foreground">{msg("signingInAs")}</p>
                                    <p id="kc-attempted-username" className="truncate text-sm font-medium">
                                        {auth.attemptedUsername}
                                    </p>
                                </div>
                                <a
                                    id="reset-login"
                                    href={url.loginRestartFlowUrl}
                                    title={msgStr("restartLoginTooltip")}
                                    aria-label={msgStr("restartLoginTooltip")}
                                    className="group flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                >
                                    <IconRefresh className="size-4 transition-transform duration-500 group-hover:-rotate-180" aria-hidden="true" />
                                </a>
                            </div>
                        )}

                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <Alert variant={message.type} className="mt-6">
                                <span className="kc-rich-text" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                            </Alert>
                        )}

                        {displayRequiredFields && (
                            <p className="mt-6 text-center text-xs text-muted-foreground lg:text-left">
                                <span className="text-red-400">*</span> {msg("requiredFields")}
                            </p>
                        )}

                        <div className={cn(displayRequiredFields ? "mt-4" : "mt-8")}>{children}</div>

                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-4 text-center">
                                <input type="hidden" name="tryAnotherWay" value="on" />
                                <button
                                    type="submit"
                                    id="try-another-way"
                                    className="kc-link cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                                >
                                    {msg("doTryAnotherWay")}
                                </button>
                            </form>
                        )}

                        {socialProvidersNode}

                        {displayInfo && (
                            <div id="kc-info" className="mt-8 text-center text-sm text-muted-foreground">
                                {infoNode}
                            </div>
                        )}
                    </div>
                </main>

                <footer className="flex flex-col items-center gap-x-4 gap-y-1 pb-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
                    <span>
                        &copy; {new Date().getFullYear()} BuildTheEarth Germany e.V.
                        {kcContext.themeVersion !== undefined && <span className="ml-1.5 opacity-60">v{kcContext.themeVersion}</span>}
                    </span>
                    <nav className="flex gap-4">
                        <a href="https://bte-germany.de/legal" className="kc-link font-normal text-muted-foreground hover:text-foreground">
                            {msg("legalNotice")}
                        </a>
                        <a href="https://bte-germany.de/privacy" className="kc-link font-normal text-muted-foreground hover:text-foreground">
                            {msg("privacyPolicy")}
                        </a>
                    </nav>
                </footer>
            </div>

            {/* Desktop: a large photo of a building from the BTE Germany Minecraft server. */}
            <aside aria-hidden={backgroundImage?.attribution === undefined} className="relative hidden flex-1 overflow-hidden bg-muted lg:block">
                {backgroundImage !== undefined && (
                    <div className="absolute inset-0 animate-fade-in">
                        <div
                            className="absolute inset-0 bg-cover bg-center will-change-transform motion-safe:animate-ken-burns"
                            style={{ backgroundImage: `url("${backgroundImage.src}")` }}
                        />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/10" />

                {backgroundImage?.attribution !== undefined && (
                    <p className="absolute right-5 bottom-5 flex max-w-[calc(100%-2.5rem)] items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-neutral-100 backdrop-blur-md animate-fade-up">
                        <IconMapPin className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="sr-only">{msg("imageCredit")}: </span>
                        <span className="truncate">{backgroundImage.attribution}</span>
                    </p>
                )}
            </aside>
        </div>
    );
}
