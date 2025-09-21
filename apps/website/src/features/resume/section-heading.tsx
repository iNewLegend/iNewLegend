import { resumeTheme } from "@inewlegend/website/src/features/resume/theme.ts";

export type ResumeSectionHeadingProps = {
    title: string;
    className?: string;
};

export function ResumeSectionHeading( { title, className }: ResumeSectionHeadingProps ) {
    return (
        <h2 className={`text-sm font-semibold tracking-wider uppercase ${ resumeTheme.section.headingText } flex items-center gap-2 mb-3 ${ className ?? "" }`}>
            <span className={`inline-block h-4 w-1.5 rounded ${ resumeTheme.section.accentBar } print:hidden`}></span>
            <span className="hidden print:inline-block font-bold text-[hsl(var(--resume-accent-hsl))] mr-1" aria-hidden="true">|</span>
            {title}
        </h2>
    );
}

