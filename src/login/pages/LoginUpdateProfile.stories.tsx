import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-update-profile.ftl" });

const meta = {
    title: "login/login-update-profile.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithAppInitiatedAction: Story = {
    render: () => <KcPageStory kcContext={{ isAppInitiatedAction: true }} />
};

export const WithFieldErrors: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) =>
                        [fieldName, ...otherFieldNames].some(name => name === "email" || name === "firstName"),
                    get: (fieldName: string) => {
                        if (fieldName === "email") {
                            return "Email already exists.";
                        }
                        if (fieldName === "firstName") {
                            return "Please specify first name.";
                        }
                        return "";
                    }
                }
            }}
        />
    )
};

export const WithGlobalError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary: "Unexpected error when handling authentication request to identity provider."
                },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => [fieldName, ...otherFieldNames].includes("global"),
                    get: (fieldName: string) =>
                        fieldName === "global" ? "Unexpected error when handling authentication request to identity provider." : ""
                }
            }}
        />
    )
};
