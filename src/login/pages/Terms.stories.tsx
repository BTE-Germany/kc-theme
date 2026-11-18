import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "terms.ftl" });

const meta = {
    title: "login/terms.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithRealmTerms: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                "x-keycloakify": {
                    messages: {
                        termsText: [
                            "<h2>1. Scope</h2>",
                            "<p>These terms apply to all services of BuildTheEarth Germany e.V., including the website, the Minecraft server and the Discord server.</p>",
                            "<h2>2. Your account</h2>",
                            "<p>You are responsible for keeping your login credentials secret. Please notify us immediately if you suspect that someone else has access to your account.</p>",
                            "<ul><li>One account per person.</li><li>Usernames must not be offensive or impersonate others.</li><li>Accounts that are inactive for more than three years may be deleted.</li></ul>",
                            "<h2>3. Builds and content</h2>",
                            "<p>Builds you create on our servers may be shown on our website and social media channels, crediting your username. You keep the rights to your own screenshots and media.</p>",
                            "<h2>4. Code of conduct</h2>",
                            "<p>Be respectful. Harassment, hate speech, griefing and cheating lead to a temporary or permanent ban.</p>",
                            "<h2>5. Privacy</h2>",
                            '<p>We process your data as described in our <a href="https://bte-germany.de/privacy">privacy policy</a>.</p>',
                            "<h2>6. Changes</h2>",
                            "<p>We may update these terms. If we do, we will ask you to accept the new version the next time you sign in.</p>"
                        ].join("")
                    }
                }
            }}
        />
    )
};
