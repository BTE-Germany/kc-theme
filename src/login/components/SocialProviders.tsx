import {
    IconBrandApple,
    IconBrandDiscord,
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandGitlab,
    IconBrandGoogleFilled,
    IconBrandLinkedin,
    IconBrandMinecraft,
    IconBrandWindows,
    IconBrandX,
    IconKey
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type Provider = NonNullable<
    NonNullable<Extract<KcContext, { pageId: "login.ftl" }>["social"]>["providers"]
>[number];

const iconByProviderId: Record<string, typeof IconKey> = {
    google: IconBrandGoogleFilled,
    github: IconBrandGithub,
    gitlab: IconBrandGitlab,
    apple: IconBrandApple,
    discord: IconBrandDiscord,
    microsoft: IconBrandWindows,
    facebook: IconBrandFacebook,
    linkedin: IconBrandLinkedin,
    "linkedin-openid-connect": IconBrandLinkedin,
    twitter: IconBrandX,
    minecraft: IconBrandMinecraft
};

/** "or continue with" divider followed by one button per identity provider. */
export function SocialProviders(props: {
    providers: Provider[] | undefined;
    i18n: I18n;
    showDivider?: boolean;
}) {
    const { providers, i18n, showDivider = true } = props;

    const { msg } = i18n;

    if (providers === undefined || providers.length === 0) {
        return null;
    }

    return (
        <div id="kc-social-providers" className="mt-6 w-full">
            {showDivider && (
                <div className="mb-5 flex items-center gap-3 text-xs text-muted-foreground uppercase">
                    <span className="h-px flex-1 bg-border" />
                    <span className="tracking-wider">{msg("orContinueWith")}</span>
                    <span className="h-px flex-1 bg-border" />
                </div>
            )}
            <ul className={cn("grid gap-2.5", providers.length > 3 && "sm:grid-cols-2")}>
                {providers.map(provider => {
                    const Icon =
                        iconByProviderId[provider.alias] ??
                        iconByProviderId[provider.providerId] ??
                        IconKey;

                    return (
                        <li key={provider.alias}>
                            <Button asChild variant="outline" className="w-full">
                                <a
                                    id={`social-${provider.alias}`}
                                    href={provider.loginUrl}
                                >
                                    <Icon className="size-[18px]" aria-hidden="true" />
                                    <span className="truncate">
                                        {provider.displayName}
                                    </span>
                                </a>
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
