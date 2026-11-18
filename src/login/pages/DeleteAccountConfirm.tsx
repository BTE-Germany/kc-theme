import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconDatabaseOff, IconLogout, IconUserX } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function DeleteAccountConfirm(props: PageProps<Extract<KcContext, { pageId: "delete-account-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, triggered_from_aia } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, isCancelling, onSubmit } = useIsSubmitting();

    const consequences = [
        { icon: IconLogout, text: msg("loggingOutImmediately") },
        { icon: IconDatabaseOff, text: msg("errasingData") }
    ];

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconUserX />} tone="error" title={msg("deleteAccountConfirm")} />}
        >
            <form action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <Alert variant="warning">
                    <span className="font-medium">{msg("irreversibleAction")}</span>
                </Alert>

                <div className="rounded-lg border bg-card/60">
                    <p className="px-4 pt-3.5 pb-2 text-sm font-medium">{msg("deletingImplies")}</p>
                    <ul className="divide-y border-t">
                        {consequences.map(({ icon: Icon, text }, index) => (
                            <li key={index} className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
                                <span
                                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-300"
                                    aria-hidden="true"
                                >
                                    <Icon className="size-4" />
                                </span>
                                <span className="min-w-0 break-words">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* This message tells the user to click "Cancel", which only exists for app-initiated actions. */}
                {triggered_from_aia && (
                    <p className="delete-account-text text-sm text-pretty text-muted-foreground">{msg("finalDeletionConfirmation")}</p>
                )}

                {/* The delete button comes first in the DOM so it is the form's default action; on wider screens Cancel sits on the left. */}
                <div id="kc-form-buttons" className={cn("mt-1 grid grid-cols-1 gap-3", triggered_from_aia && "sm:grid-cols-2")}>
                    <Button type="submit" size="lg" variant="destructive" className="w-full" loading={isSubmitting && !isCancelling}>
                        {msgStr("doConfirmDelete")}
                    </Button>
                    {triggered_from_aia && (
                        <Button
                            type="submit"
                            size="lg"
                            variant="outline"
                            className="w-full sm:order-first"
                            name="cancel-aia"
                            loading={isCancelling}
                            value="true"
                        >
                            {msgStr("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
