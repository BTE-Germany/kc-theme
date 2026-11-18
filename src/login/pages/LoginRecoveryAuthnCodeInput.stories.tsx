import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-recovery-authn-code-input.ftl" });

const meta = {
    title: "login/login-recovery-authn-code-input.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithInvalidCode: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                recoveryAuthnCodesInputBean: { codeNumber: 7 },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => [fieldName, ...otherFieldNames].includes("recoveryCodeInput"),
                    get: (fieldName: string) => (fieldName === "recoveryCodeInput" ? "Invalid recovery authentication code" : "")
                }
            }}
        />
    )
};
