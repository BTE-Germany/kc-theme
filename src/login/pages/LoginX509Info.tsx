import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconCertificate, IconCertificateOff } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginX509Info(props: PageProps<Extract<KcContext, { pageId: "login-x509-info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, x509 } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, submitterName, onSubmit } = useIsSubmitting();

    const { subjectDN, isUserEnabled, username } = x509.formData;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <PageHeader
                    icon={subjectDN ? <IconCertificate /> : <IconCertificateOff />}
                    tone={subjectDN ? "default" : "warning"}
                    title={msg("doLogIn")}
                />
            }
        >
            <form id="kc-x509-login-info" action={url.loginAction} method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
                <dl className="divide-y rounded-lg border bg-card/60 text-sm">
                    <div className="grid gap-1 px-4 py-3">
                        <dt className="text-xs text-muted-foreground">{msg("clientCertificate")}</dt>
                        <dd id="certificate_subjectDN" className={cn("break-all", subjectDN ? "font-mono" : "text-muted-foreground")}>
                            {subjectDN ? subjectDN : msg("noCertificate")}
                        </dd>
                    </div>
                    {isUserEnabled && (
                        <div className="grid gap-1 px-4 py-3">
                            <dt className="text-xs text-muted-foreground">{msg("doX509Login")}</dt>
                            <dd id="username" className="font-medium break-all">
                                {username}
                            </dd>
                        </div>
                    )}
                </dl>

                <div className={cn("grid gap-3", isUserEnabled && "grid-cols-2")}>
                    {isUserEnabled && (
                        <Button
                            type="submit"
                            variant="outline"
                            size="lg"
                            className="w-full"
                            name="cancel"
                            id="kc-cancel"
                            value={msgStr("doIgnore")}
                            loading={isSubmitting && submitterName === "cancel"}
                        >
                            {msgStr("doIgnore")}
                        </Button>
                    )}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        name="login"
                        id="kc-login"
                        value={msgStr("doContinue")}
                        loading={isSubmitting && submitterName === "login"}
                    >
                        {msgStr("doContinue")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
