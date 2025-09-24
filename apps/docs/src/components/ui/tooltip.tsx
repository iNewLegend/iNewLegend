import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

type TooltipProps = {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    delayDuration?: number;
};

export function Tooltip({ content, children, side = "top", align = "center", delayDuration = 150 }: TooltipProps) {
    return (
        <RadixTooltip.Provider delayDuration={delayDuration}>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>
                    <span className="inline-flex cursor-help align-baseline">{children}</span>
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        side={side}
                        align={align}
                        className="tw-tooltip"
                    >
                        {content}
                        <RadixTooltip.Arrow className="tw-tooltip-arrow" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
}

