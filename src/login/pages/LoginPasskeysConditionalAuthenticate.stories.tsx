import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-passkeys-conditional-authenticate.ftl" });

const meta = {
    title: "login/login-passkeys-conditional-authenticate.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

const authenticators = [
    {
        credentialId: "cred-1",
        label: "MacBook Pro Touch ID",
        createdAt: "Mar 4, 2026, 10:12:45 AM",
        transports: { iconClass: "kcWebAuthnInternal", displayNameProperties: ["Internal"] }
    },
    {
        credentialId: "cred-2",
        label: "YubiKey 5C NFC (spare key, stored in the office safe)",
        createdAt: "Jan 21, 2025, 6:40:02 PM",
        transports: { iconClass: "kcWebAuthnUSB", displayNameProperties: ["USB", "NFC"] }
    },
    {
        credentialId: "cred-3",
        label: "Android phone",
        createdAt: "Nov 2, 2026, 8:03:19 AM",
        transports: { iconClass: "kcWebAuthnBLE", displayNameProperties: ["Bluetooth"] }
    }
];

export const WithAuthenticators: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                authenticators: { authenticators },
                shouldDisplayAuthenticators: true
            }}
        />
    )
};

export const WithUsernameError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: { username: "max.mustermann" },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => [fieldName, ...otherFieldNames].includes("username"),
                    get: (fieldName: string) => (fieldName === "username" ? "Invalid username or password." : "")
                }
            }}
        />
    )
};

export const WithoutRegistration: Story = {
    render: () => <KcPageStory kcContext={{ realm: { registrationAllowed: false } }} />
};
