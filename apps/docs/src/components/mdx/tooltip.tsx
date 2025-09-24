import { Tooltip as UITooltip } from "@inewlegend/docs/src/components/ui/tooltip";

type Props = {
    text: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    children: React.ReactNode;
};

export default function Tooltip({ text, side, align, children }: Props) {
    return (
        <UITooltip content={text} side={side} align={align}>
            {children}
        </UITooltip>
    );
}

