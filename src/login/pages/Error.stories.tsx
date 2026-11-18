import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "error.ftl" });

const meta = {
    title: "login/error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithoutBackToApplication: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                client: { baseUrl: undefined },
                message: {
                    type: "error",
                    summary: "Cookie not found. Please make sure cookies are enabled in your browser."
                }
            }}
        />
    )
};

export const WithSkipLink: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                skipLink: true,
                message: {
                    type: "error",
                    summary: "Invalid parameter: redirect_uri"
                }
            }}
        />
    )
};

export const WithLongMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary:
                        "Action expired. Please continue with login now.<br/>If the problem persists, contact the administrator at https://bte-germany.de/contact/very-long-support-url-without-any-spaces-to-test-wrapping"
                }
            }}
        />
    )
};
