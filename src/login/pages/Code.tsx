import { useEffect, useRef, useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { IconAlertCircle, IconCheck, IconCircleCheck, IconCopy } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";

export default function Code(props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { code } = kcContext;

    const { msg, msgStr } = i18n;

    const inputRef = useRef<HTMLInputElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (!isCopied) {
            return;
        }

        const timeout = setTimeout(() => setIsCopied(false), 2000);

        return () => clearTimeout(timeout);
    }, [isCopied]);

    const onCopy = async () => {
        const input = inputRef.current;

        if (input === null) {
            return;
        }

        try {
            await navigator.clipboard.writeText(input.value);
            setIsCopied(true);
        } catch {
            // Clipboard API unavailable (e.g. insecure context): select the code so the user can copy it manually.
            input.focus();
            input.select();
        }
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                code.success ? (
                    <PageHeader icon={<IconCircleCheck />} tone="success" title={msg("codeSuccessTitle")} subtitle={msg("copyCodeInstruction")} />
                ) : (
                    <PageHeader
                        icon={<IconAlertCircle />}
                        tone="error"
                        title={<span className="break-words">{msg("codeErrorTitle", code.error)}</span>}
                    />
                )
            }
        >
            <div id="kc-code">
                {code.success ? (
                    <div className="flex gap-2">
                        <Input
                            ref={inputRef}
                            id="code"
                            readOnly
                            defaultValue={code.code}
                            aria-label={msgStr("codeSuccessTitle")}
                            onFocus={event => event.currentTarget.select()}
                            className="h-11 flex-1 font-mono text-base tracking-wide md:text-base"
                        />
                        <Button type="button" variant="outline" size="lg" className="shrink-0" onClick={onCopy} aria-live="polite">
                            {isCopied ? <IconCheck className="text-emerald-400 animate-pop" aria-hidden="true" /> : <IconCopy aria-hidden="true" />}
                            {isCopied ? msg("recovery-codes-copied") : msg("recovery-codes-copy")}
                        </Button>
                    </div>
                ) : (
                    code.error && (
                        <div className="rounded-lg border bg-card/60 p-4 text-sm leading-relaxed text-muted-foreground">
                            <p id="error" className="kc-rich-text break-words" dangerouslySetInnerHTML={{ __html: kcSanitize(code.error) }} />
                        </div>
                    )
                )}
            </div>
        </Template>
    );
}
