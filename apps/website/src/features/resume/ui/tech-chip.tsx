import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme";

export const TechChip = ( { tech, className = "" }: { tech: string, className?: string } ) => {
    return (
        <span
            className={ `px-1.5 py-0.5 rounded-[12px] ${ resumeTheme.components.techChip } ${ className }` }
        >
            { tech }
        </span>
    );
};
