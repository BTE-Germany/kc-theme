import { useState } from "react";
import { Group, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./LanguagePicker.module.css";
import { I18n } from "../i18n.ts";
import { KcContext } from "../KcContext.ts";


export function LanguagePicker({ i18n, kcContext }: { i18n: I18n, kcContext: KcContext }) {

    const { getChangeLocaleUrl, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { locale } = kcContext;


    const [opened, setOpened] = useState(false);

    const items = locale?.supported.map(({ languageTag }) => (
        <Menu.Item
            leftSection={<img src={`https://cdn.bte-germany.de/general/flags/${languageTag}.svg`}
                              className={"w-5 h-5 rounded-full"} />}
            component={"a"}
            href={getChangeLocaleUrl(languageTag)}
            key={languageTag}
        >
            {labelBySupportedLanguageTag[languageTag]}
        </Menu.Item>
    ));

    return (
        <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius="md"
            width="target"
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
                    <Group gap="xs">
                        <img src={`https://cdn.bte-germany.de/general/flags/${currentLanguageTag}.svg`}
                             className={"w-5 h-5 rounded-full"} />
                        <span className={classes.label}>{labelBySupportedLanguageTag[currentLanguageTag]}</span>
                    </Group>
                    <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
    );
}