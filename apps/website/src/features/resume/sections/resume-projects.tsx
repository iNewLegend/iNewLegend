import { TechChip } from "@inewlegend/website/src/features/resume/ui/tech-chip.tsx";

import { ResumeSectionHeading } from "@inewlegend/website/src/features/resume/resume-section-heading.tsx";

export type ResumeProjectItem = {
    title: string;
    description: string;
    technologies: string[];
    github?: string;
};

export type ResumeProjectsProps = {
    items: ResumeProjectItem[];
    limit?: number;
};

export function ResumeProjects( { items, limit }: ResumeProjectsProps ) {
    const visible = typeof limit === "number" ? items.slice( 0, limit ) : items;

    return (
        <>
            <ResumeSectionHeading title="Projects" />
            { visible.map( ( project, index ) => (
                <div key={ index } className="mb-5 pb-4">
                    <div className="flex justify-between items-start mb-1">
                        <a
                            className="font-semibold text-gray-900 hover:underline"
                            href={ project.github }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            { project.title }
                        </a>
                    </div>
                    <p className="text-justify text-[15px] text-gray-800 mb-2">{ project.description }</p>
                    <div className="flex leading-0 gap-2">
                        <div>
                            { project.github && (
                                <div>
                                    <span className="text-xs text-gray-500">github: </span>
                                    <a className="text-xs text-blue-700 hover:underline" href={ project.github } target="_blank" rel="noopener noreferrer">{ project.github }</a>
                                </div>
                            ) }
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        { project.technologies.map( ( tech, index ) => (
                            <TechChip key={ index } tech={ tech } />
                        ) ) }
                    </div>
                </div>
            ) ) }
        </>
    );
}

/**
 * Compact variant that utilizes both page height and width using CSS multi-columns.
 * Items flow vertically and continue in the next column, tightly packing content.
 */
export function ResumeCompactProjects( { items, limit }: ResumeProjectsProps ) {
    const visible = typeof limit === "number" ? items.slice( 0, limit ) : items;

    return (
        <div>
            <ResumeSectionHeading title="Projects" />
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                { visible.map( ( project, index ) => (
                    <div
                        key={ index }
                        className="mb-4 break-inside-avoid border-l-1 border-b-1 p-1 border-dashed rounded-[10px]"
                    >
                        <div className="flex justify-between items-start mb-1">
                            <a
                                className="font-semibold text-xs text-gray-900 hover:underline"
                                href={ project.github }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                { project.title }
                            </a>
                        </div>

                        <p className="text-justify text-[11px] text-gray-800 mb-2">
                            { project.description }
                        </p>

                        <span className="text-xs text-gray-500">Links: </span>
                        { project.github && (
                            <a
                                className="text-xs text-blue-700 hover:underline mb-2 inline-block"
                                href={ project.github }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github
                            </a>
                        ) }
                        <div className="flex flex-wrap gap-0.5 pl-0.2 pb-0.2">
                            { project.technologies.map( ( tech, index ) => (
                                <TechChip key={ index } tech={ tech } />
                            ) ) }
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}

