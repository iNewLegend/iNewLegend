import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";

import type { TResumeEducationProps } from "@inewlegend/website/src/features/resume/resume.definitions.ts";

export function ResumeEducation( { items }: TResumeEducationProps ) {
    if ( ! items?.length ) {
        return null;
    }

    return (
        <ResumeSection title="Education">
            { items.map( ( edu, index ) => (
                <div key={ index } className={ `${ resumeTheme.layout.spacing.item } last:!border-b-0` }>
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <div className={ `${ resumeTheme.text.sizes.sm } ${ resumeTheme.colors.primary }` }>{ edu.credential }</div>
                            <div className={ `${ resumeTheme.text.sizes.sm } ${ resumeTheme.colors.muted }` }>{ edu.institution }</div>
                        </div>
                        <div className={ `${ resumeTheme.text.sizes.xs } ${ resumeTheme.colors.muted } whitespace-nowrap` }>{ edu.period }</div>
                    </div>
                    { edu.description && (
                        <div className={ `mb-1 ${ resumeTheme.text.sizes.md }` }>{ edu.description }</div>
                    ) }
                </div>
            ) ) }
        </ResumeSection>
    );
}
