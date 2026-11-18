import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "webauthn-register.ftl" });

const meta = {
    title: "login/webauthn-register.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithoutAppInitiatedAction: Story = {
    render: () => <KcPageStory kcContext={{ isAppInitiatedAction: false }} />
};

export const WithRetry: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                isSetRetry: true,
                message: {
                    type: "error",
                    summary: "Failed to register your Passkey.<br/> The operation either timed out or was not allowed."
                }
            }}
        />
    )
};
