import DOMPurify from "dompurify";

import { resumeTheme } from "@inewlegend/website/src/features/resume/theme.ts";
import { ResumeSectionHeading } from "@inewlegend/website/src/features/resume/section-heading.tsx";

import type { TResumeExperienceProps } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export function ResumeExperience( { items, isCompact }: TResumeExperienceProps ) {
    const decodeEntities = ( input: string ): string => {
        const el = document.createElement( "textarea" );
        el.innerHTML = input;
        return el.value;
    };

    return (
        <div>
            <ResumeSectionHeading title="Experience" />
            {items.map( ( exp, index ) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <div className="font-sm text-gray-900">{exp.title}</div>
                            <div className="text-sm text-gray-500">{exp.company} • {exp.location}</div>
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">{exp.period}</div>
                    </div>
                    { !isCompact && (
                        <p
                            className="text-justify text-[15px] text-gray-800 mb-2"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( decodeEntities( exp.description ) ) }}
                        />
                    ) }
                    { isCompact && exp.compactDescription && (
                        <p
                            className="text-[13px] text-gray-700 mb-2"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize( decodeEntities( exp.compactDescription ) ) }}
                        />
                    ) }
                    <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map( ( tech, techIndex ) => (
                            <span key={techIndex} className={`px-2 py-0.5 rounded-full border text-[11px] ${ resumeTheme.techChip }`}>
                                {tech}
                            </span>
                        ) )}
                    </div>
                </div>
            ) )}
        </div>
    );
}

