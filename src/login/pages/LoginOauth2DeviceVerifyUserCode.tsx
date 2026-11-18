import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconDevices } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function LoginOauth2DeviceVerifyUserCode(
    props: PageProps<Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconDevices />} title={msg("oauth2DeviceVerificationTitle")} />}
        >
            <form
                id="kc-user-verify-device-user-code-form"
                className="flex flex-col gap-5"
                action={url.oauth2DeviceVerificationAction}
                method="post"
                onSubmit={onSubmit}
            >
                <div className="grid gap-3">
                    <Label htmlFor="device-user-code" className="leading-snug font-normal text-muted-foreground">
                        {msg("verifyOAuth2DeviceUserCode")}
                    </Label>
                    <Input
                        id="device-user-code"
                        name="device_user_code"
                        type="text"
                        autoComplete="off"
                        autoCapitalize="characters"
                        autoCorrect="off"
                        spellCheck={false}
                        autoFocus
                        className="h-16 text-center font-mono text-2xl font-semibold tracking-[0.25em] uppercase md:text-2xl"
                    />
                </div>

                <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                    {msgStr("doSubmit")}
                </Button>
            </form>
        </Template>
    );
}
