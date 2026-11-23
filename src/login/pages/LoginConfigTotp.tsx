import { useEffect, useState, type ReactNode } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconCheck, IconCopy, IconDeviceMobileCode, IconKeyboard, IconQrcode } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PageHeader } from "../components/PageHeader";
import { Field } from "../components/Field";
import { useIsSubmitting } from "../components/useIsSubmitting";
import { OtpInput } from "../components/OtpInput";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const { isSubmitting, isCancelling, onSubmit } = useIsSubmitting();

    const hasTotpError = messagesPerField.existsError("totp");
    const hasUserLabelError = messagesPerField.existsError("userLabel");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
            headerNode={<PageHeader icon={<IconDeviceMobileCode />} title={msg("loginTotpTitle")} subtitle={msg("loginTotpIntro")} />}
        >
            <ol id="kc-totp-settings" className="flex flex-col gap-6">
                <Step number={1}>
                    <p>{msg("loginTotpStep1")}</p>
                    <ul id="kc-totp-supported-apps" className="mt-3 flex flex-wrap gap-2">
                        {totp.supportedApplications.map(app => (
                            <li
                                key={app}
                                className="max-w-full truncate rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-foreground"
                            >
                                {advancedMsg(app)}
                            </li>
                        ))}
                    </ul>
                </Step>

                {mode == "manual" ? (
                    <>
                        <Step number={2}>
                            <p>{msg("loginTotpManualStep2")}</p>
                            <div className="mt-3 flex items-center gap-1 rounded-lg border bg-card/60 py-1.5 pr-1.5 pl-3.5">
                                <span
                                    id="kc-totp-secret-key"
                                    className="min-w-0 flex-1 font-mono text-sm tracking-wider wrap-anywhere text-foreground"
                                >
                                    {totp.totpSecretEncoded}
                                </span>
                                <CopyButton value={totp.totpSecretEncoded.replace(/\s/g, "")} i18n={i18n} />
                            </div>
                            <a href={totp.qrUrl} id="mode-barcode" className="kc-link mt-3 inline-flex min-h-10 items-center gap-2 text-sm">
                                <IconQrcode className="size-4" aria-hidden="true" />
                                {msg("loginTotpScanBarcode")}
                            </a>
                        </Step>
                        <Step number={3}>
                            <p>{msg("loginTotpManualStep3")}</p>
                            <ul className="mt-3 divide-y rounded-lg border bg-card/60">
                                <ConfigValue id="kc-totp-type" label={msg("loginTotpType")} value={msg(`loginTotp.${totp.policy.type}`)} />
                                <ConfigValue id="kc-totp-algorithm" label={msg("loginTotpAlgorithm")} value={totp.policy.getAlgorithmKey()} />
                                <ConfigValue id="kc-totp-digits" label={msg("loginTotpDigits")} value={totp.policy.digits} />
                                {totp.policy.type === "totp" ? (
                                    <ConfigValue id="kc-totp-period" label={msg("loginTotpInterval")} value={totp.policy.period} />
                                ) : (
                                    <ConfigValue id="kc-totp-counter" label={msg("loginTotpCounter")} value={totp.policy.initialCounter} />
                                )}
                            </ul>
                        </Step>
                    </>
                ) : (
                    <Step number={2}>
                        <p>{msg("loginTotpStep2")}</p>
                        <div className="mt-3 inline-flex rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5 animate-pop">
                            <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt={msgStr("loginTotpStep2")}
                                width={176}
                                height={176}
                                className="size-40 [image-rendering:pixelated] sm:size-44"
                            />
                        </div>
                        <div>
                            <a href={totp.manualUrl} id="mode-manual" className="kc-link mt-2 inline-flex min-h-10 items-center gap-2 text-sm">
                                <IconKeyboard className="size-4" aria-hidden="true" />
                                {msg("loginTotpUnableToScan")}
                            </a>
                        </div>
                    </Step>
                )}

                <Step number={mode == "manual" ? 4 : 3}>
                    <p>{msg("loginTotpStep3")}</p>
                    <p className="mt-1">{msg("loginTotpStep3DeviceName")}</p>
                </Step>
            </ol>

            <form id="kc-totp-settings-form" action={url.loginAction} method="post" onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
                <Field
                    htmlFor="totp"
                    label={
                        <>
                            {msg("authenticatorCode")}
                            <RequiredMark />
                        </>
                    }
                    errorId="input-error-otp-code"
                    error={hasTotpError ? messagesPerField.get("totp") : undefined}
                >
                    <OtpInput
                        id="totp"
                        name="totp"
                        length={totp.policy.digits}
                        aria-required
                        aria-invalid={hasTotpError}
                        aria-describedby={hasTotpError ? "input-error-otp-code" : undefined}
                    />
                </Field>
                <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                {mode && <input type="hidden" id="mode" value={mode} />}

                <Field
                    htmlFor="userLabel"
                    label={
                        <>
                            {msg("loginTotpDeviceName")}
                            {totp.otpCredentials.length >= 1 && <RequiredMark />}
                        </>
                    }
                    errorId="input-error-otp-label"
                    error={hasUserLabelError ? messagesPerField.get("userLabel") : undefined}
                >
                    <Input
                        id="userLabel"
                        name="userLabel"
                        type="text"
                        autoComplete="off"
                        aria-required={totp.otpCredentials.length >= 1}
                        aria-invalid={hasUserLabelError}
                        aria-describedby={hasUserLabelError ? "input-error-otp-label" : undefined}
                    />
                </Field>

                <div id="kc-form-options" className="flex items-center gap-2.5">
                    <Checkbox id="logout-sessions" name="logout-sessions" value="on" />
                    <Label htmlFor="logout-sessions" className="cursor-pointer font-normal text-muted-foreground">
                        {msg("logoutOtherSessions")}
                    </Label>
                </div>

                {/* The submit button comes first in the DOM so pressing Enter saves instead of cancelling. */}
                <div id="kc-form-buttons" className={cn("mt-1 grid gap-3", isAppInitiatedAction && "grid-cols-2")}>
                    <Button
                        type="submit"
                        id="saveTOTPBtn"
                        size="lg"
                        className={cn("w-full", isAppInitiatedAction && "order-last")}
                        loading={isSubmitting && !isCancelling}
                    >
                        {msgStr("doSubmit")}
                    </Button>
                    {isAppInitiatedAction && (
                        <Button
                            type="submit"
                            id="cancelTOTPBtn"
                            name="cancel-aia"
                            loading={isCancelling}
                            value="true"
                            variant="outline"
                            size="lg"
                            className="w-full"
                            formNoValidate
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}

function Step(props: { number: number; children: ReactNode }) {
    const { number, children } = props;

    return (
        <li className="flex gap-3.5 sm:gap-4">
            <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary-foreground tabular-nums ring-1 ring-primary/30"
                aria-hidden="true"
            >
                {number}
            </span>
            <div className="min-w-0 flex-1 pt-1 text-sm text-muted-foreground">{children}</div>
        </li>
    );
}

function ConfigValue(props: { id: string; label: ReactNode; value: ReactNode }) {
    const { id, label, value } = props;

    return (
        <li id={id} className="flex items-center justify-between gap-4 px-4 py-2.5">
            <span>{label}</span>
            <span className="min-w-0 truncate font-mono font-medium text-foreground">{value}</span>
        </li>
    );
}

function RequiredMark() {
    return (
        <span className="text-red-400" aria-hidden="true">
            *
        </span>
    );
}

function CopyButton(props: { value: string; i18n: I18n }) {
    const { value, i18n } = props;

    const { msgStr } = i18n;

    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (!isCopied) {
            return;
        }

        const timeout = window.setTimeout(() => setIsCopied(false), 2000);

        return () => window.clearTimeout(timeout);
    }, [isCopied]);

    // The Clipboard API is only available in secure contexts.
    if (typeof navigator === "undefined" || navigator.clipboard === undefined) {
        return null;
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-label={msgStr(isCopied ? "recovery-codes-copied" : "recovery-codes-copy")}
            title={msgStr(isCopied ? "recovery-codes-copied" : "recovery-codes-copy")}
            onClick={() =>
                navigator.clipboard.writeText(value).then(
                    () => setIsCopied(true),
                    () => undefined
                )
            }
        >
            <span key={String(isCopied)} className="animate-pop">
                {isCopied ? <IconCheck className="size-4 text-emerald-400" aria-hidden="true" /> : <IconCopy className="size-4" aria-hidden="true" />}
            </span>
        </Button>
    );
}
