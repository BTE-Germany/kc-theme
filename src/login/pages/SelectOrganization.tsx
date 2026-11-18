import { useRef, useState, type MouseEvent } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { IconBuilding, IconChevronRight, IconLoader2 } from "@tabler/icons-react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PageHeader } from "../components/PageHeader";
import { useIsSubmitting } from "../components/useIsSubmitting";

export default function SelectOrganization(props: PageProps<Extract<KcContext, { pageId: "select-organization.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, user } = kcContext;

    const { msgStr } = i18n;

    const { isSubmitting, onSubmit } = useIsSubmitting();
    const [selectedAlias, setSelectedAlias] = useState<string>();
    const formRef = useRef<HTMLFormElement>(null);
    const organizationInputRef = useRef<HTMLInputElement>(null);

    const onOrganizationClick = (organizationAlias: string) => (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (isSubmitting || !organizationInputRef.current || !formRef.current) {
            return;
        }

        organizationInputRef.current.value = organizationAlias;
        setSelectedAlias(organizationAlias);

        if (typeof formRef.current.requestSubmit === "function") {
            formRef.current.requestSubmit();
            return;
        }

        formRef.current.submit();
    };

    const organizations = user.organizations ?? [];

    // The only built-in message for this page is a sentence ending in a colon ("Select an organization to proceed:"); drop it for the title.
    const title = msgStr("organization.select").replace(/[:：]\s*$/, "");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<PageHeader icon={<IconBuilding />} title={title} />}
        >
            <form ref={formRef} action={url.loginAction} method="post" onSubmit={onSubmit}>
                <ul id="kc-user-organizations" className="divide-y overflow-hidden rounded-lg border bg-card/60">
                    {organizations.map(({ alias, name }) => {
                        const isSelected = isSubmitting && selectedAlias === alias;

                        return (
                            <li key={alias}>
                                <button
                                    id={`organization-${alias}`}
                                    type="button"
                                    onClick={onOrganizationClick(alias)}
                                    aria-disabled={isSubmitting || undefined}
                                    aria-busy={isSelected || undefined}
                                    className="group flex min-h-14 w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors outline-none hover:bg-accent/60 focus-visible:bg-accent/60 focus-visible:ring-[3px] focus-visible:ring-ring/80 focus-visible:ring-inset disabled:cursor-default disabled:hover:bg-transparent"
                                >
                                    <span
                                        className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background/60 text-sm font-semibold text-muted-foreground uppercase"
                                        aria-hidden="true"
                                    >
                                        {(name ?? alias).charAt(0)}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-sm font-medium break-words">{name ?? alias}</span>
                                        {name !== undefined && (
                                            <span className="block font-mono text-xs break-all text-muted-foreground">{alias}</span>
                                        )}
                                    </span>
                                    {isSelected ? (
                                        <IconLoader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" />
                                    ) : (
                                        <IconChevronRight
                                            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-disabled:opacity-40"
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <input ref={organizationInputRef} type="hidden" name="kc.org" />
            </form>
        </Template>
    );
}
