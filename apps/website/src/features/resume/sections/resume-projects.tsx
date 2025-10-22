import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeTextBlock } from "@inewlegend/website/src/features/resume/sections/elements/resume-text-block.tsx";
import { ResumeTechStack } from "@inewlegend/website/src/features/resume/sections/elements/resume-tech-stack.tsx";

import type { TResumeProjectsProps } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export function ResumeProjects( { items, limit }: TResumeProjectsProps ) {
    const visible = typeof limit === "number" ? items.slice( 0, limit ) : items;

    return (
        <ResumeSection title="Projects">
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
                    <ResumeTextBlock size="lg" className="mb-2">{ project.description }</ResumeTextBlock>
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
                    <ResumeTechStack technologies={ project.technologies } className="mt-2" />
                </div>
            ) ) }
        </ResumeSection>
    );
}

