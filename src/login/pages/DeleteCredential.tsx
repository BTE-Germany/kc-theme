import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconKeyOff } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function DeleteCredential(props: PageProps<Extract<KcContext, { pageId: "delete-credential.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url, credentialLabel } = kcContext;

    const { isSubmitting, isCancelling, onSubmit } = useIsSubmitting();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <PageHeader
                    icon={<IconKeyOff />}
                    tone="warning"
                    // Credential labels are user-defined and may be one long word.
                    title={<span className="wrap-anywhere">{msg("deleteCredentialTitle", credentialLabel)}</span>}
                />
            }
        >
            <div className="flex flex-col gap-6">
                <div id="kc-delete-text" className="text-sm text-pretty wrap-anywhere text-muted-foreground">
                    {msg("deleteCredentialMessage", credentialLabel)}
                </div>
                <form action={url.loginAction} method="POST" onSubmit={onSubmit}>
                    {/* The delete button comes first in the DOM so it is the form's default action; on wider screens Cancel sits on the left. */}
                    <div id="kc-form-buttons" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            type="submit"
                            size="lg"
                            variant="destructive"
                            className="w-full"
                            name="accept"
                            id="kc-accept"
                            loading={isSubmitting && !isCancelling}
                        >
                            {msgStr("doConfirmDelete")}
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            variant="outline"
                            className="w-full sm:order-first"
                            name="cancel-aia"
                            loading={isCancelling}
                            id="kc-decline"
                            value="true"
                        >
                            {msgStr("doCancel")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
