import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "webauthn-error.ftl" });

const meta = {
    title: "login/webauthn-error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithErrorMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary: "Failed to authenticate by the Passkey.<br/> The operation either timed out or was not allowed."
                }
            }}
        />
    )
};

export const WithoutAppInitiatedAction: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                isAppInitiatedAction: false,
                message: {
                    type: "error",
                    summary: "Passkey authentication result is invalid.<br/> Unknown credential."
                }
            }}
        />
    )
};
