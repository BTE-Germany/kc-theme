import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { Plus, Search } from "lucide-react";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={<h1 className={"text-4xl font-semibold mt-6"}>{msg("confirmLinkIdpTitle")}</h1>}>
            <form id="kc-register-form" action={url.loginAction} method="post">
                <div className={"flex flex-col gap-4 w-md"}>
                    <Button
                        type="submit"
                        className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        name="submitAction"
                        id="updateProfile"
                        value="updateProfile"
                    >
                        <Search />
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                    <Button
                        type="submit"
                        className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        variant={"secondary"}
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                    >
                        <Plus />
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
