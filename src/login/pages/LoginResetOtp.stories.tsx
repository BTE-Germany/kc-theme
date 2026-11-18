import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-reset-otp.ftl" });

const meta = {
    title: "login/login-reset-otp.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithTwoCredentials: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                configuredOtpCredentials: {
                    userOtpCredentials: [
                        { id: "otp-1", userLabel: "Pixel 8" },
                        { id: "otp-2", userLabel: "Old iPhone (replaced in 2024, please remove this one)" }
                    ],
                    selectedCredentialId: "otp-1"
                }
            }}
        />
    )
};

export const WithMissingSelection: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary: "Please choose an OTP configuration."
                }
            }}
        />
    )
};
