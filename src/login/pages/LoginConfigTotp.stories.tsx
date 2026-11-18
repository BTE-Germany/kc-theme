import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-config-totp.ftl" });

const meta = {
    title: "login/login-config-totp.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithManualSetup: Story = {
    render: () => <KcPageStory kcContext={{ mode: "manual" }} />
};

export const WithCounterBasedManualSetup: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                mode: "manual",
                totp: {
                    policy: {
                        algorithm: "HmacSHA256",
                        digits: 8,
                        lookAheadWindow: 1,
                        type: "hotp",
                        initialCounter: 0,
                        getAlgorithmKey: () => "SHA256"
                    }
                }
            }}
        />
    )
};

export const WithAllSupportedApps: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                totp: {
                    supportedApplications: ["totpAppFreeOTPName", "totpAppGoogleName", "totpAppMicrosoftAuthenticatorName"]
                }
            }}
        />
    )
};

export const WithErrors: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                totp: {
                    otpCredentials: [{ id: "otp-1", userLabel: "Pixel 8" }]
                },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) =>
                        [fieldName, ...otherFieldNames].some(name => name === "totp" || name === "userLabel"),
                    get: (fieldName: string) => {
                        if (fieldName === "totp") {
                            return "Invalid authenticator code.";
                        }
                        if (fieldName === "userLabel") {
                            return "Please specify device name.";
                        }
                        return "";
                    }
                }
            }}
        />
    )
};

export const WithRequiredActionMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "warning",
                    summary: "You need to set up Mobile Authenticator to activate your account."
                }
            }}
        />
    )
};

export const WithAppInitiatedAction: Story = {
    render: () => <KcPageStory kcContext={{ isAppInitiatedAction: true }} />
};
