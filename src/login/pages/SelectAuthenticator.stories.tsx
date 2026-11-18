import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "select-authenticator.ftl" });

const meta = {
    title: "login/select-authenticator.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithManyOptions: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {
                    authenticationSelections: [
                        {
                            authExecId: "a1",
                            displayName: "auth-username-password-form-display-name",
                            helpText: "auth-username-password-form-help-text",
                            iconCssClass: "kcAuthenticatorPasswordClass"
                        },
                        {
                            authExecId: "a2",
                            displayName: "otp-display-name",
                            helpText: "otp-help-text",
                            iconCssClass: "kcAuthenticatorOTPClass"
                        },
                        {
                            authExecId: "a3",
                            displayName: "webauthn-passwordless-display-name",
                            helpText: "webauthn-passwordless-help-text",
                            iconCssClass: "kcAuthenticatorWebAuthnPasswordlessClass"
                        },
                        {
                            authExecId: "a4",
                            displayName: "auth-recovery-authn-code-form-display-name",
                            helpText: "auth-recovery-authn-code-form-help-text",
                            iconCssClass: "kcAuthenticatorDefaultClass"
                        },
                        {
                            authExecId: "a5",
                            displayName: "auth-x509-client-username-form-display-name",
                            helpText: "auth-x509-client-username-form-help-text",
                            iconCssClass: "kcAuthenticatorDefaultClass"
                        }
                    ]
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
                    showUsername: true
                }
            }}
        />
    )
};
