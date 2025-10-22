import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeTextBlock } from "@inewlegend/website/src/features/resume/sections/elements/resume-text-block.tsx";
import { ResumeTechStack } from "@inewlegend/website/src/features/resume/sections/elements/resume-tech-stack.tsx";
import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";

import type { TResumeProjectItem, TResumeProjectsProps } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export type TResumeCompactProjectsProps = {
    items: TResumeProjectItem[];
    limit?: number;
};

/**
 * Compact variant that utilizes both page height and width using CSS multi-columns.
 * Items flow vertically and continue in the next column, tightly packing content.
 */
export function ResumeCompactProjects({ items, limit }: TResumeCompactProjectsProps) {
    const visible = typeof limit === "number" ? items.slice(0, limit) : items;

    return (
        <ResumeSection title="Projects">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {visible.map((project, index) => (
                    <div
                        key={index}
                        className={ resumeTheme.layout.spacing.compact }
                    >
                        <div className="flex justify-between items-start mb-1">
                            <a
                                className={ `${ resumeTheme.text.weights.semibold } ${ resumeTheme.text.sizes.xs } ${ resumeTheme.colors.accent } hover:underline` }
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {project.title}
                            </a>
                        </div>

                        <ResumeTextBlock size="xs" className="mb-2">
                            {project.description}
                        </ResumeTextBlock>

                        <ResumeTechStack
                            technologies={project.technologies}
                            className="gap-0.5 pl-0.2 pb-0.2"
                        />
                    </div>
                ))}
            </div>
        </ResumeSection>
    );
}
