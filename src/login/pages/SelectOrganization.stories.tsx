import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "select-organization.ftl" });

const meta = {
    title: "login/select-organization.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithTwoOrganizations: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                user: {
                    organizations: [
                        { alias: "bte-nrw", name: "Build Team Nordrhein-Westfalen" },
                        { alias: "bte-bayern", name: "Build Team Bayern" }
                    ]
                }
            }}
        />
    )
};

export const WithLongNames: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                user: {
                    organizations: [
                        { alias: "bte-germany-staff-and-moderation", name: "BuildTheEarth Germany Staff, Moderation and Community Management" },
                        { alias: "bte-baden-wuerttemberg-rheinland-pfalz-saarland" }
                    ]
                }
            }}
        />
    )
};
