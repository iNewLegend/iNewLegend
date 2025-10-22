import DOMPurify from "dompurify";

import { TechChip } from "@inewlegend/website/src/features/resume/ui/tech-chip.tsx";
import { ResumeSectionHeading } from "@inewlegend/website/src/features/resume/sections/elements/resume-section-heading.tsx";

import type { TResumeExperienceProps } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export function ResumeExperience( { items, isCompact }: TResumeExperienceProps ) {
    const decodeEntities = ( input: string ): string => {
        const el = document.createElement( "textarea" );
        el.innerHTML = input;
        return el.value;
    };

    return (
        <>
            <ResumeSectionHeading title="Experience" />
            { items.map( ( exp, index ) => (
                <div key={ index } className="pb-3 border-b-1 border-dashed mt-0.5">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <div className="text-sm text-gray-900">{ exp.title }</div>
                            <div className="text-sm text-gray-500">{ exp.company } • { exp.location }</div>
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">{ exp.period }</div>
                    </div>
                    { !isCompact && (
                        <p
                            className="text-justify text-[15px] text-gray-800 mb-2"
                            dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize( decodeEntities( exp.description ) ) } }
                        />
                    ) }
                    { isCompact && exp.compactDescription && (
                        <p
                            className="text-[14px] text-gray-700 mb-2"
                            dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize( decodeEntities( exp.compactDescription ) ) } }
                        />
                    ) }
                    <div className="flex flex-wrap gap-1.5">
                        { exp.technologies.map( ( tech, index ) => (
                            <TechChip className="text-[10px]" key={ index } tech={ tech } />
                        ) ) }
                    </div>
                </div>
            ) ) }
        </>
    );
}

