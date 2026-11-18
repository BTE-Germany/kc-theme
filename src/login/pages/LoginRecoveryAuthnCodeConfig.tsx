import { useEffect, useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useScript } from "keycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
import { IconCheck, IconCopy, IconDownload, IconLifebuoy, IconPrinter } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

const actionButtonClassName =
    "h-auto min-h-14 w-full min-w-0 flex-col gap-1.5 px-1 py-2.5 text-xs whitespace-normal hyphens-auto wrap-anywhere has-[>svg]:px-1 [&_svg:not([class*='size-'])]:size-[18px]";

export default function LoginRecoveryAuthnCodeConfig(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, isCancelling, onSubmit } = useIsSubmitting();

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

    // Reset the "Copied" feedback after a moment; a failure stays visible until the next attempt.
    useEffect(() => {
        if (copyState !== "copied") {
            return;
        }

        const timeout = window.setTimeout(() => setCopyState("idle"), 2000);

        return () => window.clearTimeout(timeout);
    }, [copyState]);

    const olRecoveryCodesListId = "kc-recovery-codes-list";

    // Wires up the print, download and copy buttons by their ids.
    useScript({ olRecoveryCodesListId, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconLifebuoy />} title={msg("recovery-code-config-header")} />}
        >
            <div className="flex flex-col gap-5">
                <Alert variant="warning">
                    <p className="font-medium text-foreground">{msg("recovery-code-config-warning-title")}</p>
                    <p className="mt-1 text-muted-foreground">{msg("recovery-code-config-warning-message")}</p>
                </Alert>

                <div className="overflow-hidden rounded-lg border bg-card/60">
                    {/* The script reads each item's innerText ("1: XXXX-XXXX-XXXX"), so keep each item's content inline (no flex/block children that would add line breaks). */}
                    <ol id={olRecoveryCodesListId} className="gap-x-4 px-4 py-3 font-mono text-sm text-foreground sm:columns-2">
                        {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
                            <li key={index} className="break-inside-avoid py-1 whitespace-nowrap">
                                <span className="inline-block min-w-7 text-muted-foreground tabular-nums select-none">{index + 1}:</span>{" "}
                                {`${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8)}`}
                            </li>
                        ))}
                    </ol>

                    <div className="grid grid-cols-3 gap-2 border-t bg-background/30 p-2">
                        <Button id="printRecoveryCodes" type="button" variant="ghost" className={actionButtonClassName}>
                            <IconPrinter aria-hidden="true" />
                            {msg("recovery-codes-print")}
                        </Button>
                        <Button id="downloadRecoveryCodes" type="button" variant="ghost" className={actionButtonClassName}>
                            <IconDownload aria-hidden="true" />
                            {msg("recovery-codes-download")}
                        </Button>
                        {/* Not "copyRecoveryCodes": Keycloak's script would bind its own copy handler, which can't report failures. */}
                        <Button
                            id="copyRecoveryCodesButton"
                            type="button"
                            variant="ghost"
                            className={cn(actionButtonClassName, copyState === "copied" && "text-emerald-400 hover:text-emerald-400")}
                            onClick={() => {
                                const text = recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList
                                    .map((code, index) => `${index + 1}: ${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8)}`)
                                    .join("\n");

                                // The Clipboard API is missing on insecure origins and in some embedded browsers.
                                if (navigator.clipboard?.writeText === undefined) {
                                    setCopyState(copyWithExecCommand(text) ? "copied" : "failed");
                                    return;
                                }

                                navigator.clipboard.writeText(text).then(
                                    () => setCopyState("copied"),
                                    () => setCopyState(copyWithExecCommand(text) ? "copied" : "failed")
                                );
                            }}
                        >
                            <span key={copyState} className="animate-pop" aria-hidden="true">
                                {copyState === "copied" ? <IconCheck className="size-[18px]" /> : <IconCopy className="size-[18px]" />}
                            </span>
                            <span aria-live="polite">{copyState === "copied" ? msg("recovery-codes-copied") : msg("recovery-codes-copy")}</span>
                        </Button>
                    </div>
                    {copyState === "failed" && (
                        <p role="alert" className="border-t px-4 py-2 text-xs text-red-400 animate-fade-up">
                            {msg("copyFailed")}
                        </p>
                    )}
                </div>

                <label
                    htmlFor="kcRecoveryCodesConfirmationCheck"
                    className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-lg border bg-card/60 p-4 text-sm transition-colors hover:bg-accent/40",
                        isConfirmed && "border-primary/50"
                    )}
                >
                    <Checkbox
                        id="kcRecoveryCodesConfirmationCheck"
                        name="kcRecoveryCodesConfirmationCheck"
                        checked={isConfirmed}
                        onCheckedChange={checked => setIsConfirmed(checked === true)}
                        className="mt-px"
                    />
                    <span className="leading-snug">{msg("recovery-codes-confirmation-message")}</span>
                </label>

                <form
                    id="kc-recovery-codes-settings-form"
                    action={kcContext.url.loginAction}
                    method="post"
                    onSubmit={onSubmit}
                    className="flex flex-col gap-5"
                >
                    <input
                        type="hidden"
                        name="generatedRecoveryAuthnCodes"
                        value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString}
                    />
                    <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
                    <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

                    <div id="kc-form-options" className="flex items-center gap-2.5">
                        <Checkbox id="logout-sessions" name="logout-sessions" value="on" />
                        <Label htmlFor="logout-sessions" className="cursor-pointer font-normal text-muted-foreground">
                            {msg("logoutOtherSessions")}
                        </Label>
                    </div>

                    {/* The submit button comes first in the DOM; on wider screens it is moved to the right. */}
                    <div className={cn("mt-1 grid gap-3", isAppInitiatedAction && "sm:grid-cols-2")}>
                        <Button
                            type="submit"
                            id="saveRecoveryAuthnCodesBtn"
                            size="lg"
                            className="w-full sm:order-last"
                            disabled={!isConfirmed}
                            loading={isSubmitting && !isCancelling}
                        >
                            {msgStr("recovery-codes-action-complete")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button
                                type="submit"
                                id="cancelRecoveryAuthnCodesBtn"
                                name="cancel-aia"
                                loading={isCancelling}
                                value="true"
                                variant="outline"
                                size="lg"
                                className="w-full"
                            >
                                {msg("recovery-codes-action-cancel")}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </Template>
    );
}

/** Legacy copy fallback for browsers without the Clipboard API. Returns whether copying worked. */
function copyWithExecCommand(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
        return document.execCommand("copy");
    } catch {
        return false;
    } finally {
        textarea.remove();
    }
}
