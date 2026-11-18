import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-password.ftl" });

const meta = {
    title: "login/login-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithAttemptedUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {
                    attemptedUsername: "max.mustermann@mail.com",
                    showUsername: true
                }
            }}
        />
    )
};

export const WithPasswordError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {
                    attemptedUsername: "max.mustermann@mail.com",
                    showUsername: true
                },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => [fieldName, ...otherFieldNames].includes("password"),
                    get: (fieldName: string) => (fieldName === "password" ? "Invalid password." : "")
                }
            }}
        />
    )
};

export const WithoutPasswordReset: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { resetPasswordAllowed: false }
            }}
        />
    )
};

export const WithPasskey: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {
                    attemptedUsername: "max.mustermann@mail.com",
                    showUsername: true
                },
                enableWebAuthnConditionalUI: true
            }}
        />
    )
};

export const WithTryAnotherWay: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {
                    attemptedUsername: "max.mustermann@mail.com",
                    showUsername: true,
                    showTryAnotherWayLink: true
                }
            }}
        />
    )
};
