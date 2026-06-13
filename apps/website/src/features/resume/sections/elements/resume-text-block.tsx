import type { ReactNode } from "react";
import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";

export type ResumeTextBlockProps = {
    children: ReactNode;
    size?: "xs" | "sm" | "md" | "lg";
    className?: string;
    justify?: boolean;
};

export function ResumeTextBlock( {
    children,
    size = "md",
    className = "",
    justify = true
}: ResumeTextBlockProps ) {
    const justifyClass = justify ? "text-justify" : "";

    return (
        <p className={ `${ justifyClass } ${ resumeTheme.text.sizes[ size ] } ${ resumeTheme.colors.secondary } ${ className }` }>
            { children }
        </p>
    );
}
