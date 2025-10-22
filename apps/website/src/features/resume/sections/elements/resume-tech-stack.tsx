import { TechChip } from "@inewlegend/website/src/features/resume/ui/tech-chip.tsx";

export type ResumeTechStackProps = {
    technologies: string[];
    className?: string;
    chipClassName?: string;
};

export function ResumeTechStack( { technologies, className = "", chipClassName }: ResumeTechStackProps ) {
    return (
        <div className={ `flex flex-wrap gap-1.5 ${ className }` }>
            { technologies.map( ( tech, index ) => (
                <TechChip key={ index } tech={ tech } className={ chipClassName } />
            ) ) }
        </div>
    );
}
