import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-oauth-grant.ftl" });

const meta = {
    title: "login/login-oauth-grant.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithClientDetails: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                client: {
                    clientId: "bte-map",
                    name: "BTE Germany Map",
                    attributes: {
                        logoUri: "https://cdn.bte-germany.de/general/logos/Logo.png",
                        tosUri: "https://bte-germany.de/legal",
                        policyUri: "https://bte-germany.de/privacy"
                    }
                },
                oauth: {
                    clientScopesRequested: [
                        { consentScreenText: "${profileScopeConsentText}" },
                        { consentScreenText: "${emailScopeConsentText}" },
                        { consentScreenText: "${rolesScopeConsentText}" },
                        { consentScreenText: "${organizationScopeConsentText}" },
                        { consentScreenText: "${offlineAccessScopeConsentText}" }
                    ]
                }
            }}
        />
    )
};

export const WithOnlyPrivacyPolicy: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                client: {
                    clientId: "bte-discord-bot",
                    name: "BTE Discord Bot",
                    attributes: {
                        policyUri: "https://bte-germany.de/privacy"
                    }
                }
            }}
        />
    )
};

export const WithDynamicScope: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                oauth: {
                    clientScopesRequested: [
                        { consentScreenText: "${profileScopeConsentText}" },
                        { consentScreenText: "Access to build region", dynamicScopeParameter: "region:nordrhein-westfalen-koeln-innenstadt-0042" }
                    ]
                }
            }}
        />
    )
};

export const WithLongClientId: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                client: {
                    clientId: "urn:bte-germany:services:build-team-application-portal-production",
                    attributes: {}
                }
            }}
        />
    )
};
