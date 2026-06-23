import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";
import { useResumeAts } from "@inewlegend/website/src/features/resume/resume-ats-context.ts";

export type ResumeListGridProps = {
    items: string[];
    className?: string;
};

export function ResumeListGrid( { items, className = "" }: ResumeListGridProps ) {
    const ats = useResumeAts();
    const gridClass = ats ? resumeTheme.layout.grid.listAts : resumeTheme.layout.grid.list;

    return (
        <ul className={ `${ gridClass } ${ resumeTheme.colors.secondary } ${ className }` }>
            { items.map( ( item, index ) => (
                <li key={ index } className={ `break-inside-avoid ${ resumeTheme.text.sizes.md }` }>
                    { item }.
                </li>
            ) ) }
        </ul>
    );
}
