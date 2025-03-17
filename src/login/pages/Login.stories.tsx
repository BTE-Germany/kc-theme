import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
    title: "login/login.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory kcContext={{locale: {currentLanguageTag: "de"}}} />
};

export const WithInvalidCredential: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: {
                    username: "johndoe"
                },
                messagesPerField: {
                    // NOTE: The other functions of messagesPerField are derived from get() and
                    // existsError() so they are the only ones that need to mock.
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => {
                        const fieldNames = [fieldName, ...otherFieldNames];
                        return fieldNames.includes("username") || fieldNames.includes("password");
                    },
                    get: (fieldName: string) => {
                        if (fieldName === "username" || fieldName === "password") {
                            return "Invalid username or password.";
                        }
                        return "";
                    }
                }
            }}
        />
    )
};

export const WithoutRegistration: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { registrationAllowed: false }
            }}
        />
    )
};

export const WithoutRememberMe: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { rememberMe: false }
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

export const WithEmailAsUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { loginWithEmailAllowed: false }
            }}
        />
    )
};

export const WithPresetUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: { username: "max.mustermann@mail.com" }
            }}
        />
    )
};

export const WithTryAnotherWay: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {showTryAnotherWayLink: true}
            }}
        />
    )
};

export const WithImmutablePresetUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {
                    attemptedUsername: "max.mustermann@mail.com",
                    showUsername: true
                },
                locale: {currentLanguageTag: "de"},
                usernameHidden: true,
                message: {
                    type: "info",
                    summary: "Please re-authenticate to continue"
                }
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
                        {
                            loginUrl: "discord",
                            alias: "discord",
                            providerId: "discord",
                            displayName: "Discord",
                            iconClasses: "fa fa-discord"
                        },
                        {
                            loginUrl: "apple",
                            alias: "apple",
                            providerId: "apple",
                            displayName: "Apple",
                            iconClasses: "fa fa-apple"
                        },
                        {
                            loginUrl: "buildtheearth",
                            alias: "buildtheearth",
                            providerId: "buildtheearth",
                            displayName: "My BuildTheEarth",
                            iconClasses: "fa fa-bte"
                        }
                    ]
                }
            }}
        />
    )
};

export const WithoutPasswordField: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: { password: false }
            }}
        />
    )
};

export const WithErrorMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    summary: "The time allotted for the connection has elapsed.<br/>The login process will restart from the beginning.",
                    type: "error"
                }
            }}
        />
    )
};
