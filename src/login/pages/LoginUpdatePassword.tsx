import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconLockPassword } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PageHeader } from "../components/PageHeader";
import { Field } from "../components/Field";
import { PasswordInput } from "../components/PasswordInput";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    const { isSubmitting, isCancelling, onSubmit } = useIsSubmitting();

    const hasError = messagesPerField.existsError("password", "password-confirm");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!hasError}
            headerNode={<PageHeader icon={<IconLockPassword />} title={msg("updatePasswordTitle")} />}
        >
            <form id="kc-passwd-update-form" action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <Field htmlFor="password-new" label={msg("passwordNew")} errorId="input-error-password" error={messagesPerField.get("password")}>
                    <PasswordInput
                        id="password-new"
                        name="password-new"
                        i18n={i18n}
                        autoFocus
                        autoComplete="new-password"
                        aria-invalid={hasError}
                        aria-describedby={messagesPerField.existsError("password") ? "input-error-password" : undefined}
                    />
                </Field>

                <Field
                    htmlFor="password-confirm"
                    label={msg("passwordConfirm")}
                    errorId="input-error-password-confirm"
                    error={messagesPerField.get("password-confirm")}
                >
                    <PasswordInput
                        id="password-confirm"
                        name="password-confirm"
                        i18n={i18n}
                        autoComplete="new-password"
                        aria-invalid={hasError}
                        aria-describedby={messagesPerField.existsError("password-confirm") ? "input-error-password-confirm" : undefined}
                    />
                </Field>

                <div className="flex items-center gap-2.5">
                    <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked />
                    <Label htmlFor="logout-sessions" className="cursor-pointer font-normal text-muted-foreground">
                        {msg("logoutOtherSessions")}
                    </Label>
                </div>

                {/* Submit comes first in the DOM so that pressing Enter submits instead of cancelling; Cancel is moved left visually. */}
                <div id="kc-form-buttons" className={cn("mt-1 grid gap-3", isAppInitiatedAction && "grid-cols-2")}>
                    <Button type="submit" size="lg" className="w-full" loading={isSubmitting && !isCancelling}>
                        {msgStr("doSubmit")}
                    </Button>
                    {isAppInitiatedAction && (
                        <Button
                            variant="outline"
                            size="lg"
                            className="order-first w-full"
                            type="submit"
                            name="cancel-aia"
                            loading={isCancelling}
                            value="true"
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
