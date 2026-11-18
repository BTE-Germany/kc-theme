import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "code.ftl" });

const meta = {
    title: "login/code.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithLongCode: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                code: {
                    success: true,
                    code: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d.6e7f8a9b-0c1d-4e2f-a3b4-c5d6e7f8a9b0.9f8e7d6c-5b4a-4321-8fed-cba987654321"
                }
            }}
        />
    )
};

export const WithError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                code: {
                    success: false,
                    error: "invalid_request"
                }
            }}
        />
    )
};
