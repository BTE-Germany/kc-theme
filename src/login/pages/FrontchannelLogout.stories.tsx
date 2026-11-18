import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "frontchannel-logout.ftl" });

const meta = {
    title: "login/frontchannel-logout.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithManyClients: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                logout: {
                    clients: [
                        { name: "BTE Germany Website", frontChannelLogoutUrl: "about:blank" },
                        { name: "BTE Germany Map", frontChannelLogoutUrl: "about:blank" },
                        { name: "Build Team Application Portal", frontChannelLogoutUrl: "about:blank" },
                        { name: "BuildTheEarth Germany Community Discord Integration Service", frontChannelLogoutUrl: "about:blank" }
                    ]
                }
            }}
        />
    )
};
