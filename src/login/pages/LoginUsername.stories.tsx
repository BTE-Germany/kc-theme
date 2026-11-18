import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-username.ftl" });

const meta = {
    title: "login/login-username.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithUsernameError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: { username: "max.mustermann" },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => [fieldName, ...otherFieldNames].includes("username"),
                    get: (fieldName: string) => (fieldName === "username" ? "Invalid username." : "")
                }
            }}
        />
    )
};

export const WithErrorMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    summary: "Your login attempt timed out. Login will start from the beginning.",
                    type: "error"
                }
            }}
        />
    )
};

export const WithPresetUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: { username: "max.mustermann@mail.com", rememberMe: "on" }
            }}
        />
    )
};

export const WithUsernameOnly: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { loginWithEmailAllowed: false }
            }}
        />
    )
};

export const WithEmailAsUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { loginWithEmailAllowed: true, registrationEmailAsUsername: true }
            }}
        />
    )
};

export const WithoutRegistrationAndRememberMe: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { registrationAllowed: false, rememberMe: false }
            }}
        />
    )
};

export const WithPasskey: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                enableWebAuthnConditionalUI: true,
                authenticators: { authenticators: [] }
            }}
        />
    )
};

export const WithSocialProviders: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                social: {
                    displayInfo: true,
                    providers: [
                        { loginUrl: "google", alias: "google", providerId: "google", displayName: "Google", iconClasses: "fa fa-google" },
                        { loginUrl: "discord", alias: "discord", providerId: "discord", displayName: "Discord", iconClasses: "fa fa-discord" },
                        { loginUrl: "github", alias: "github", providerId: "github", displayName: "GitHub", iconClasses: "fa fa-github" },
                        {
                            loginUrl: "microsoft",
                            alias: "microsoft",
                            providerId: "microsoft",
                            displayName: "Microsoft",
                            iconClasses: "fa fa-windows"
                        }
                    ]
                }
            }}
        />
    )
};

export const WithoutPasswordForm: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { password: false }
            }}
        />
    )
};
