import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "saml-post-form.ftl" });

const meta = {
    title: "login/saml-post-form.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

// The mock uses url "#", so the page shows an alert instead of submitting the form.
export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithSamlResponse: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                samlPost: {
                    url: "#",
                    SAMLResponse: "PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiPjwvc2FtbHA6UmVzcG9uc2U+",
                    relayState: "https://wiki.bte-germany.de/"
                }
            }}
        />
    )
};
