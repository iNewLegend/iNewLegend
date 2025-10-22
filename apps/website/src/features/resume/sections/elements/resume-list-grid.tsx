import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";

export type ResumeListGridProps = {
    items: string[];
    className?: string;
};

export function ResumeListGrid( { items, className = "" }: ResumeListGridProps ) {
    return (
        <ul className={ `${ resumeTheme.layout.grid.list } ${ resumeTheme.colors.secondary } ${ className }` }>
            { items.map( ( item, index ) => (
                <li key={ index } className={ `break-inside-avoid ${ resumeTheme.text.sizes.sm }` }>
                    { item }.
                </li>
            ) ) }
        </ul>
    );
}
