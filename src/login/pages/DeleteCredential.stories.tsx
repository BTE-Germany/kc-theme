import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "delete-credential.ftl" });

const meta = {
    title: "login/delete-credential.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithPasskeyLabel: Story = {
    render: () => <KcPageStory kcContext={{ credentialLabel: "YubiKey 5C NFC" }} />
};

export const WithLongLabel: Story = {
    render: () => <KcPageStory kcContext={{ credentialLabel: "max.mustermann-Pixel-8-Pro-Passkey-2026-11-18T09:41:00Z" }} />
};
