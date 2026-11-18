import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-recovery-authn-code-config.ftl" });

const meta = {
    title: "login/login-recovery-authn-code-config.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

const generatedRecoveryAuthnCodesList = [
    "4F7KQ2M9XH3B",
    "Z8C1RT6WNP4D",
    "M2VJ9L5QKX7E",
    "B6HN3Y8TCF1G",
    "Q9WX2K4ZRM5J",
    "T3PD7B1VHN8L",
    "K5RF8M2CXQ9W",
    "N1GZ6J4TBY3H",
    "H7LQ5X9DKR2V",
    "C4YB1N8WMF6T",
    "X2TK7R3HQJ9P",
    "J8MV4C6ZLN1B"
];

const recoveryAuthnCodesConfigBean = {
    generatedRecoveryAuthnCodesList,
    generatedRecoveryAuthnCodesAsString: generatedRecoveryAuthnCodesList.join(","),
    generatedAt: Date.UTC(2026, 10, 18, 9, 30)
};

export const WithTwelveCodes: Story = {
    render: () => <KcPageStory kcContext={{ recoveryAuthnCodesConfigBean }} />
};

export const WithAppInitiatedAction: Story = {
    render: () => <KcPageStory kcContext={{ recoveryAuthnCodesConfigBean, isAppInitiatedAction: true }} />
};
