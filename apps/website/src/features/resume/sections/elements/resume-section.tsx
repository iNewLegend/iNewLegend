import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme";

import { ResumeSectionHeading } from "@inewlegend/website/src/features/resume/sections/elements/resume-section-heading.tsx";

import type { ReactNode } from "react";

export type ResumeSectionProps = {
    title: string;
    children: ReactNode;
    className?: string;
    headingClassName?: string;
};

export function ResumeSection( {
    title,
    children,
    className = "",
    headingClassName
}: ResumeSectionProps ) {
    return (
        <div className={ `${ resumeTheme.components.section.container } ${ className }` }>
            <ResumeSectionHeading title={ title } className={ headingClassName } />
            { children }
        </div>
    );
}
