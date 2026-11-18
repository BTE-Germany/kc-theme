import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-otp.ftl" });

const meta = {
    title: "login/login-otp.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithSingleCredential: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                otpLogin: {
                    userOtpCredentials: [{ id: "otp-1", userLabel: "Pixel 8" }]
                }
            }}
        />
    )
};

export const WithSelectedCredential: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                otpLogin: {
                    userOtpCredentials: [
                        { id: "otp-1", userLabel: "Pixel 8" },
                        { id: "otp-2", userLabel: "iPad Pro (Aegis Authenticator, backup device in the office drawer)" },
                        { id: "otp-3", userLabel: "YubiKey 5 NFC" }
                    ],
                    selectedCredentialId: "otp-2"
                }
            }}
        />
    )
};

export const WithInvalidCode: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => [fieldName, ...otherFieldNames].includes("totp"),
                    get: (fieldName: string) => (fieldName === "totp" ? "Invalid authenticator code." : "")
                }
            }}
        />
    )
};

export const WithAttemptedUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {
                    attemptedUsername: "max.mustermann@bte-germany.de",
                    showUsername: true,
                    showTryAnotherWayLink: true
                }
            }}
        />
    )
};
