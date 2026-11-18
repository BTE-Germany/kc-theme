import { useEffect, useId, useRef, useState } from "react";
import { IconCheck, IconChevronDown, IconWorld } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { I18n } from "../i18n";

/** Compact language menu. Hidden when the realm has only one language enabled. */
export function LanguageSwitcher(props: { i18n: I18n }) {
    const { i18n } = props;

    const { currentLanguage, enabledLanguages, msgStr } = i18n;

    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                buttonRef.current?.focus();
            }
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);

        // Move focus into the menu so keyboard users can pick a language right away.
        rootRef.current
            ?.querySelector<HTMLAnchorElement>('[aria-current="true"], a')
            ?.focus();

        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    if (enabledLanguages.length <= 1) {
        return null;
    }

    const onMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
            return;
        }

        event.preventDefault();

        const items = Array.from(
            event.currentTarget.querySelectorAll<HTMLAnchorElement>("a")
        );
        const index = items.indexOf(document.activeElement as HTMLAnchorElement);
        const next =
            event.key === "ArrowDown"
                ? (index + 1) % items.length
                : (index - 1 + items.length) % items.length;

        items[next]?.focus();
    };

    return (
        <div ref={rootRef} id="kc-locale" className="relative">
            <button
                ref={buttonRef}
                type="button"
                id="kc-current-locale-link"
                aria-label={`${msgStr("changeLanguage")}: ${currentLanguage.label}`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={menuId}
                onClick={() => setIsOpen(open => !open)}
                className="flex h-9 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-accent/60 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
                <IconWorld className="size-4" aria-hidden="true" />
                <span>{currentLanguage.label}</span>
                <IconChevronDown
                    className={cn(
                        "size-3.5 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                />
            </button>
            {isOpen && (
                <ul
                    id={menuId}
                    aria-labelledby="kc-current-locale-link"
                    onKeyDown={onMenuKeyDown}
                    className="absolute right-0 z-50 mt-1.5 max-h-80 min-w-44 origin-top-right overflow-y-auto rounded-lg border bg-popover p-1 shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-150"
                >
                    {enabledLanguages.map(({ languageTag, label, href }) => {
                        const isCurrent = languageTag === currentLanguage.languageTag;

                        return (
                            <li key={languageTag}>
                                <a
                                    href={href}
                                    lang={languageTag}
                                    aria-current={isCurrent || undefined}
                                    className={cn(
                                        "flex items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none transition-colors hover:bg-accent focus-visible:bg-accent",
                                        isCurrent
                                            ? "text-foreground"
                                            : "text-popover-foreground"
                                    )}
                                >
                                    {label}
                                    {isCurrent && (
                                        <IconCheck
                                            className="size-4 text-foreground"
                                            aria-hidden="true"
                                        />
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
