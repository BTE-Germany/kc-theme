import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconFileText } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url } = kcContext;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    // Keycloak ships an empty "termsText" until the realm defines one; show the built-in placeholder instead of an empty card.
    const hasTermsText = msgStr("termsText").trim() !== "";

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={<PageHeader icon={<IconFileText />} title={msg("termsTitle")} />}
        >
            <div className="flex flex-col gap-6">
                {/* The scrollbar is hidden; the fade at the bottom hints that the text continues. */}
                <div
                    id="kc-terms-text"
                    role="region"
                    aria-labelledby="kc-page-title"
                    tabIndex={0}
                    className={cn(
                        "kc-rich-text max-h-[min(55vh,26rem)] overflow-y-auto rounded-lg border bg-card/60 px-4 pt-4 pb-10 sm:px-5 sm:pt-5",
                        "text-sm leading-relaxed text-pretty break-words text-muted-foreground outline-none transition-[box-shadow]",
                        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                        "[mask-image:linear-gradient(to_bottom,black_calc(100%-2.5rem),transparent)]",
                        "[&_h1]:mb-2 [&_h1]:text-base [&_h1]:font-semibold [&_h1]:text-foreground",
                        "[&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-foreground [&_h2:first-child]:mt-0",
                        "[&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:font-medium [&_h3]:text-foreground",
                        "[&_p+p]:mt-3 [&_ol]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_li+li]:mt-1"
                    )}
                >
                    {hasTermsText ? msg("termsText") : msg("termsPlainText")}
                </div>

                <form action={url.loginAction} method="POST" onSubmit={onSubmit}>
                    {/* Accept comes first in the DOM so it stays the default (Enter) action; on wider screens it sits on the right. */}
                    <div id="kc-form-buttons" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button type="submit" size="lg" className="w-full" name="accept" id="kc-accept" loading={isSubmitting}>
                            {msgStr("doAccept")}
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            variant="outline"
                            className="w-full sm:order-first"
                            name="cancel"
                            id="kc-decline"
                            value="true"
                        >
                            {msgStr("doDecline")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
