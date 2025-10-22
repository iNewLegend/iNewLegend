import DOMPurify from "dompurify";

import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeTextBlock } from "@inewlegend/website/src/features/resume/sections/elements/resume-text-block.tsx";
import { ResumeTechStack } from "@inewlegend/website/src/features/resume/sections/elements/resume-tech-stack.tsx";

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
                <div key={index} className="pb-3 border-b-1 border-dashed mt-0.5">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <div className="text-sm text-gray-900">{exp.title}</div>
                            <div className="text-sm text-gray-500">{exp.company} • {exp.location}</div>
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">{exp.period}</div>
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
                        chipClassName="text-[10px]"
                    />
                </div>
            ))}
        </ResumeSection>
    );
}

