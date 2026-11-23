import {
    Fragment,
    useLayoutEffect,
    useRef,
    useState,
    type ChangeEvent,
    type ClipboardEvent,
    type ComponentProps,
    type MouseEvent
} from "react";
import { cn } from "@/lib/utils";

type OtpInputProps = Omit<
    ComponentProps<"input">,
    "type" | "value" | "defaultValue" | "onChange" | "maxLength" | "children"
> & {
    /** Number of digit boxes shown. */
    length?: number;
    /**
     * Maximum number of digits accepted. When it is larger than `length`, a box is added for every extra digit,
     * so a longer code still fits if the real code length is unknown (Keycloak does not tell the login page).
     */
    maxLength?: number;
};

const INTERCEPTED_INPUT_TYPES = new Set([
    "insertText",
    "insertReplacementText",
    "insertFromPaste",
    "insertFromDrop",
    "insertFromYank"
]);

type Edit = { value: string; selection: [number, number] };

/**
 * Inserts text into the code the way separate digit fields would behave. Returns null if the text has no digits (so a
 * typed letter never deletes the selected digit).
 *
 * - At least `length` digits (a pasted or autofilled code) replace the whole code.
 * - In a complete code, digits overwrite from the caret on and the next digit gets selected, so typing keeps overwriting.
 * - In an incomplete code, digits are inserted (replacing the selection), e.g. "1456" -> type "2", "3" before the 4.
 */
function insertDigits(
    current: string,
    start: number,
    end: number,
    text: string,
    length: number,
    maxLength: number
): Edit | null {
    const digits = text.replace(/\D/g, "");

    if (digits === "") {
        return null;
    }

    if (digits.length >= length) {
        const value = digits.slice(0, maxLength);

        return { value, selection: [value.length, value.length] };
    }

    const isComplete = current.length >= length;
    const replaceEnd = isComplete ? Math.max(end, start + digits.length) : end;
    const value = (current.slice(0, start) + digits + current.slice(replaceEnd)).slice(
        0,
        maxLength
    );
    const caret = Math.min(start + digits.length, value.length);
    const selectNext = (isComplete || end > start) && caret < value.length;

    return { value, selection: selectNext ? [caret, caret + 1] : [caret, caret] };
}

/**
 * One-time code input that shows one box per digit.
 *
 * Behind the boxes sits a single, invisible text input. It owns the value, the focus and the form field, so typing,
 * pasting (keyboard, context menu, long-press), SMS / password manager autofill and screen readers all work as with
 * a normal input. The boxes only mirror its value and caret.
 */
export function OtpInput(props: OtpInputProps) {
    const {
        length = 6,
        maxLength = length,
        className,
        onFocus,
        onBlur,
        onSelect,
        onMouseDown,
        onPointerDown,
        onClick,
        onPaste,
        onKeyDown,
        onPointerCancel,
        onContextMenu,
        "aria-invalid": ariaInvalid,
        ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const slotsRef = useRef<HTMLDivElement>(null);
    const pendingSelectionRef = useRef<[number, number] | null>(null);
    const pointerTypeRef = useRef<string>("mouse");
    // Set by a touch or pen pointerdown on the input, so clicks forwarded from the label do not move the caret.
    const isTapPendingRef = useRef(false);
    // Value and selection right before the browser applies an edit we could not intercept (used by onChange).
    const preEditRef = useRef<Edit | null>(null);

    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [selection, setSelection] = useState<[number, number]>([0, 0]);

    const isInvalid = ariaInvalid === true || ariaInvalid === "true";
    const slotCount = Math.min(Math.max(length, value.length), maxLength);
    // Split the code in two halves (e.g. 123-456). Not once extra boxes were added, so the row does not jump around.
    const separatorIndex =
        slotCount === length && length >= 6 && length % 2 === 0 ? length / 2 : undefined;

    // Re-apply the caret after React wrote a sanitized value back to the input (which would move the caret to the end).
    useLayoutEffect(() => {
        const pendingSelection = pendingSelectionRef.current;
        const input = inputRef.current;

        if (pendingSelection === null || input === null) {
            return;
        }

        pendingSelectionRef.current = null;

        if (document.activeElement === input) {
            input.setSelectionRange(...pendingSelection);
        }
    });

    const applyEdit = (edit: Edit) => {
        pendingSelectionRef.current = edit.selection;
        setValue(edit.value);
        setSelection(edit.selection);
    };

    const getInputSelection = (input: HTMLInputElement): [number, number] => [
        input.selectionStart ?? input.value.length,
        input.selectionEnd ?? input.value.length
    ];

    // Typed and dropped text is handled before the browser inserts it, so the code is edited like separate fields would
    // be (see insertDigits). Text the browser does not let us intercept is handled in onChange.
    useLayoutEffect(() => {
        const input = inputRef.current;

        if (input === null) {
            return;
        }

        const handleBeforeInput = (event: InputEvent) => {
            // Remember the state before an insertion, in case the browser applies it itself (handled in onChange).
            preEditRef.current = event.inputType.startsWith("insert")
                ? { value: input.value, selection: getInputSelection(input) }
                : null;

            if (
                !event.cancelable ||
                event.isComposing ||
                !INTERCEPTED_INPUT_TYPES.has(event.inputType)
            ) {
                return;
            }

            const text = event.data ?? event.dataTransfer?.getData("text/plain");

            // Without the text, let the browser insert it; onChange handles the result.
            if (text === null || text === undefined) {
                return;
            }

            event.preventDefault();
            preEditRef.current = null;

            const edit = insertDigits(
                input.value,
                ...getInputSelection(input),
                text,
                length,
                maxLength
            );

            if (edit !== null) {
                applyEdit(edit);
            }
        };

        input.addEventListener("beforeinput", handleBeforeInput);

        return () => input.removeEventListener("beforeinput", handleBeforeInput);
    }, [length, maxLength]);

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        onPaste?.(event);

        const text = event.clipboardData.getData("text/plain");

        if (event.defaultPrevented || text === "") {
            return;
        }

        event.preventDefault();

        const input = event.currentTarget;
        const edit = insertDigits(
            input.value,
            ...getInputSelection(input),
            text,
            length,
            maxLength
        );

        if (edit !== null) {
            applyEdit(edit);
        }
    };

    const syncSelection = () => {
        const input = inputRef.current;

        if (input !== null) {
            // A snapshot from an earlier edit that changed nothing must not outlive a caret move.
            preEditRef.current = null;
            setSelection(getInputSelection(input));
        }
    };

    // Fallback for edits the browser already applied (non-cancelable input, IME composition, deletions).
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        const rawValue = input.value;
        const nativeEvent = event.nativeEvent as InputEvent;
        // Prefer the state captured in beforeinput; edits without one (e.g. some autofill) use the last known selection.
        const preEdit = preEditRef.current ?? {
            value,
            selection: [
                Math.min(selection[0], value.length),
                Math.min(selection[1], value.length)
            ]
        };

        preEditRef.current = null;

        // For a plain insertion, recover the inserted text from the previous value and selection, and apply it like an
        // intercepted one (so a pasted code still replaces the old one instead of being mixed with it).
        if (!nativeEvent.isComposing && nativeEvent.inputType?.startsWith("insert")) {
            const {
                value: previous,
                selection: [start, end]
            } = preEdit;
            const insertedLength = rawValue.length - (previous.length - (end - start));

            if (
                insertedLength > 0 &&
                rawValue.slice(0, start) === previous.slice(0, start) &&
                rawValue.slice(start + insertedLength) === previous.slice(end)
            ) {
                applyEdit(
                    insertDigits(
                        previous,
                        start,
                        end,
                        rawValue.slice(start, start + insertedLength),
                        length,
                        maxLength
                    ) ?? preEdit
                );
                return;
            }
        }

        // Otherwise keep the digits, so e.g. "123 456" still works.
        const rawCaret = input.selectionStart ?? rawValue.length;
        const digits = rawValue.replace(/\D/g, "").slice(0, maxLength);
        const caret = Math.min(
            rawValue.slice(0, rawCaret).replace(/\D/g, "").length,
            digits.length
        );

        applyEdit({ value: digits, selection: [caret, caret] });
    };

    // Clicking or tapping a box puts the caret there (or selects its digit) instead of wherever the invisible text is.
    const selectSlotAt = (clientX: number) => {
        const input = inputRef.current;
        const slots = slotsRef.current?.querySelectorAll<HTMLElement>("[data-otp-slot]");

        if (input === null || slots === undefined || slots.length === 0) {
            return;
        }

        let index = slots.length - 1;

        for (let i = 0; i < slots.length; i++) {
            if (clientX < slots[i].getBoundingClientRect().right) {
                index = i;
                break;
            }
        }

        const start = Math.min(index, input.value.length);
        const end = start < input.value.length ? start + 1 : start;

        input.setSelectionRange(start, end);
        setSelection([start, end]);
    };

    // Mouse: take over on mousedown, before the browser places the caret. Double clicks and shift-click range selection
    // stay native.
    const handleMouseDown = (event: MouseEvent<HTMLInputElement>) => {
        onMouseDown?.(event);

        if (
            pointerTypeRef.current !== "mouse" ||
            event.defaultPrevented ||
            event.button !== 0 ||
            event.detail > 1 ||
            event.shiftKey
        ) {
            return;
        }

        event.preventDefault();
        inputRef.current?.focus();
        selectSlotAt(event.clientX);
    };

    // Touch and pen: let the browser focus the input natively (keyboard, paste menu, SMS code suggestions), then move the
    // caret to the tapped box once the tap is complete. Long presses do not fire a click, so they stay native.
    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
        onClick?.(event);

        const isTap = isTapPendingRef.current;

        isTapPendingRef.current = false;

        if (!isTap || event.defaultPrevented || event.shiftKey) {
            return;
        }

        selectSlotAt(event.clientX);
    };

    const [selectionStart, selectionEnd] = selection;
    const hasRangeSelection = selectionEnd > selectionStart;
    const caretSlot = Math.min(selectionStart, slotCount - 1);

    return (
        <div dir="ltr" className={cn("group relative", className)}>
            <div
                ref={slotsRef}
                aria-hidden="true"
                className={cn(
                    "flex items-center gap-1.5 sm:gap-2",
                    isInvalid && "animate-shake"
                )}
            >
                {Array.from({ length: slotCount }, (_, index) => {
                    const digit = value[index];
                    const isActive =
                        isFocused &&
                        (hasRangeSelection
                            ? index >= selectionStart && index < selectionEnd
                            : index === caretSlot);
                    const showCaret =
                        isActive && !hasRangeSelection && digit === undefined;
                    // A caret on a filled box of an incomplete code inserts before that digit; show it at the left edge.
                    const showInsertCaret =
                        isActive &&
                        !hasRangeSelection &&
                        digit !== undefined &&
                        value.length < length;
                    // A caret after the last digit (e.g. after End) is shown at the right edge of the last box.
                    const showTrailingCaret =
                        isActive &&
                        !hasRangeSelection &&
                        digit !== undefined &&
                        selectionStart >= slotCount;

                    return (
                        <Fragment key={index}>
                            {index === separatorIndex && (
                                <span className="h-0.5 w-2 shrink-0 rounded-full bg-muted-foreground/60 forced-colors:bg-[color:CanvasText]" />
                            )}
                            <div
                                data-otp-slot=""
                                data-active={isActive || undefined}
                                className={cn(
                                    "relative flex h-12 min-w-0 flex-1 items-center justify-center rounded-md border border-input-border bg-input/30 shadow-xs sm:h-14",
                                    "font-mono text-xl font-medium text-foreground tabular-nums sm:text-2xl",
                                    "transition-[background-color,border-color,box-shadow] duration-200",
                                    "group-hover:border-foreground/60",
                                    isInvalid &&
                                        "border-red-500 group-hover:border-red-500",
                                    // Same focus style as the other inputs (see components/ui/input.tsx).
                                    isActive && "bg-input/50 inset-ring-1 ring-4",
                                    isActive &&
                                        !isInvalid &&
                                        "border-ring inset-ring-ring ring-ring/25 group-hover:border-ring",
                                    isActive &&
                                        isInvalid &&
                                        "inset-ring-red-500 ring-red-500/40",
                                    isActive &&
                                        "forced-colors:outline-2 forced-colors:outline-offset-2 forced-colors:outline-[color:CanvasText] forced-colors:outline-solid"
                                )}
                            >
                                {digit !== undefined && (
                                    <span key={digit} className="animate-digit-in">
                                        {digit}
                                    </span>
                                )}
                                {showInsertCaret && (
                                    <span className="absolute inset-y-2.5 left-1.5 w-px animate-caret-blink bg-foreground sm:inset-y-3 forced-colors:bg-[color:CanvasText]" />
                                )}
                                {showTrailingCaret && (
                                    <span className="absolute inset-y-2.5 right-1.5 w-px animate-caret-blink bg-foreground sm:inset-y-3 forced-colors:bg-[color:CanvasText]" />
                                )}
                                {showCaret && (
                                    <span className="h-6 w-px animate-caret-blink bg-foreground sm:h-7 forced-colors:bg-[color:CanvasText]" />
                                )}
                            </div>
                        </Fragment>
                    );
                })}
            </div>
            <input
                {...rest}
                ref={inputRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                value={value}
                aria-invalid={ariaInvalid}
                onChange={handleChange}
                onKeyDown={event => {
                    onKeyDown?.(event);
                    syncSelection();
                }}
                onPaste={handlePaste}
                onPointerDown={event => {
                    onPointerDown?.(event);
                    pointerTypeRef.current = event.pointerType;
                    isTapPendingRef.current = event.pointerType !== "mouse";
                }}
                onMouseDown={handleMouseDown}
                onClick={handleClick}
                onSelect={event => {
                    onSelect?.(event);
                    syncSelection();
                }}
                onFocus={event => {
                    onFocus?.(event);
                    setIsFocused(true);
                    syncSelection();
                }}
                onPointerCancel={event => {
                    onPointerCancel?.(event);
                    isTapPendingRef.current = false;
                }}
                onContextMenu={event => {
                    onContextMenu?.(event);
                    isTapPendingRef.current = false;
                }}
                onBlur={event => {
                    onBlur?.(event);
                    isTapPendingRef.current = false;
                    setIsFocused(false);
                }}
                className="kc-otp-input absolute inset-0 size-full cursor-text"
            />
        </div>
    );
}
