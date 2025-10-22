import DOMPurify from "dompurify";

import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeTextBlock } from "@inewlegend/website/src/features/resume/sections/elements/resume-text-block.tsx";
import { ResumeTechStack } from "@inewlegend/website/src/features/resume/sections/elements/resume-tech-stack.tsx";
import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";

import type { TResumeExperienceProps } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export function ResumeExperience({ items, isCompact }: TResumeExperienceProps) {
    const decodeEntities = (input: string): string => {
        const el = document.createElement("textarea");
        el.innerHTML = input;
        return el.value;
    };

    return (
        <ResumeSection title="Experience">
            {items.map((exp, index) => (
                <div key={index} className={ resumeTheme.layout.spacing.item }>
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <div className={ `${ resumeTheme.text.sizes.sm } ${ resumeTheme.colors.primary }` }>{exp.title}</div>
                            <div className={ `${ resumeTheme.text.sizes.sm } ${ resumeTheme.colors.muted }` }>{exp.company} • {exp.location}</div>
                        </div>
                        <div className={ `${ resumeTheme.text.sizes.xs } ${ resumeTheme.colors.muted } whitespace-nowrap` }>{exp.period}</div>
                    </div>
                    {!isCompact && (
                        <div
                            className="mb-2"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decodeEntities(exp.description)) }}
                        />
                    )}
                    {isCompact && exp.compactDescription && (
                        <div
                            className="mb-2"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decodeEntities(exp.compactDescription)) }}
                        />
                    )}
                    <ResumeTechStack 
                        technologies={exp.technologies} 
                        chipClassName="text-xs"
                    />
                </div>
            ))}
        </ResumeSection>
    );
}

