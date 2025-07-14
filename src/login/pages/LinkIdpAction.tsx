import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import {

    IconArrowRight, IconBox,
    IconBrandApple,
    IconBrandDiscord, IconBrandGithub,
    IconBrandGoogle, IconCancel,
     IconWorld
} from "@tabler/icons-react";
import { Button } from "@mantine/core";

const getSocialIcon = (provider: string) => {
    switch (provider) {
        case "discord":
            return <IconBrandDiscord size={30} />;
        case "google":
            return <IconBrandGoogle size={30} />;
        case "apple":
            return <IconBrandApple size={30} />;
        case "github":
            return <IconBrandGithub size={30} />;
        case "buildtheearth":
            return <IconWorld size={30} />;
        default:
            return <IconBox size={30} />;
    }
};

export default function LinkIdpAction(props: PageProps<Extract<KcContext, { pageId: "link-idp-action.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msgStr, msg } = i18n;

    const { url, idpDisplayName } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
            <div>
                <div className={"flex flex-row gap-8 items-center mb-4"}>
                    <div className={"w-12 h-12 flex justify-center items-center rounded-3xl bg-neutral-600"}>
                        {getSocialIcon(idpDisplayName.toLowerCase())}
                    </div>
                    <div className={"flex flex-row gap-2"}>
                        <div className={"w-2 h-2 flex rounded-full bg-neutral-600 animate-pulse "}></div>
                        <div className={"w-2 h-2 flex rounded-full bg-neutral-600 animate-pulse animation-delay-200"}></div>
                        <div className={"w-2 h-2 flex rounded-full bg-neutral-600 animate-pulse animation-delay-400"}></div>
                    </div>
                    <div>
                        <img src="https://cdn.bte-germany.de/general/logos/Logo.png" alt="" className={"w-12"} />
                    </div>
                </div>
                <span
                    dangerouslySetInnerHTML={{
                        __html: msgStr("linkIdpActionTitle", idpDisplayName)
                    }}
                />
            </div>

            }
        >
            {msgStr("linkIdpActionMessage", idpDisplayName)}

            <form action={url.loginAction} method={"POST"} className={"w-full mt-12"}>
                <div className={"flex flex-row gap-4 w-full"}>
                    <Button
                        type="submit"
                        leftSection={<IconCancel size={16} />}
                        variant={"light"}
                        name="cancel-aia"
                        id="cancel-aia"
                        value="cancel-aia"
                    >
                        {msg("doCancel")}
                    </Button>
                    <Button
                        type="submit"
                        leftSection={<IconArrowRight size={16} />}
                        name="continue"
                        id="continue"
                        value="continue"
                    >
                        {msg("doContinue")}
                    </Button>

                </div>
            </form>
        </Template>
    );
}
