import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "link-idp-action.ftl" });

const meta = {
    title: "login/link-idp-action.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory kcContext={{ idpDisplayName: "Discord" }} />
};

export const AppInitiatedAction: Story = {
    render: () => <KcPageStory kcContext={{ idpDisplayName: "Microsoft", isAppInitiatedAction: true }} />
};

export const WithLongProviderName: Story = {
    render: () => <KcPageStory kcContext={{ idpDisplayName: "BuildTheEarth Germany Community Single Sign-On" }} />
};
