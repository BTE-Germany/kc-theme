import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-x509-info.ftl" });

const meta = {
    title: "login/login-x509-info.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithLongSubjectDN: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                x509: {
                    formData: {
                        subjectDN:
                            "EMAILADDRESS=max.mustermann@bte-germany.de, CN=Max Mustermann, OU=Build Team Nordrhein-Westfalen, O=BuildTheEarth Germany e.V., L=Koeln, ST=Nordrhein-Westfalen, C=DE",
                        isUserEnabled: true,
                        username: "max.mustermann@bte-germany.de"
                    }
                }
            }}
        />
    )
};

export const WithUserDisabled: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                x509: {
                    formData: {
                        subjectDN: "CN=Max Mustermann, O=BuildTheEarth Germany e.V., C=DE",
                        isUserEnabled: false
                    }
                }
            }}
        />
    )
};

export const WithoutCertificate: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                x509: {
                    formData: {
                        subjectDN: undefined,
                        isUserEnabled: false,
                        username: undefined
                    }
                }
            }}
        />
    )
};
