import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconMail } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

type UpdateEmailProps = PageProps<Extract<KcContext, { pageId: "update-email.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function UpdateEmail(props: UpdateEmailProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    const { isSubmitting, isCancelling, onSubmit } = useIsSubmitting();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            headerNode={<PageHeader icon={<IconMail />} title={msg("updateEmailTitle")} />}
        >
            <form id="kc-update-email-form" action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                <div className="flex items-center gap-2.5">
                    <Checkbox id="logout-sessions" name="logout-sessions" value="on" />
                    <Label htmlFor="logout-sessions" className="cursor-pointer font-normal text-muted-foreground">
                        {msg("logoutOtherSessions")}
                    </Label>
                </div>

                {/* The submit button comes first in the DOM so pressing Enter submits instead of cancelling. */}
                <div id="kc-form-buttons" className={cn("mt-1 grid gap-3", isAppInitiatedAction && "grid-cols-2")}>
                    <Button type="submit" size="lg" className="w-full" disabled={!isFormSubmittable} loading={isSubmitting && !isCancelling}>
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
