import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme";

export const TechChip = ( { tech, className = "" }: { tech: string, className?: string } ) => {
    return (
        <span
            className={ `px-1.5 py-0.5 rounded-[12px] border text-[10px] bg-blue-50 text-blue-800 border-blue-200 ${ className }` }
        >
            { tech }
        </span>
    );
};
