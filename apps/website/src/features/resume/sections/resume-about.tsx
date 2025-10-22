import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeTextBlock } from "@inewlegend/website/src/features/resume/sections/elements/resume-text-block.tsx";

export type ResumeAboutProps = {
    description: string;
};

export function ResumeAbout( { description }: ResumeAboutProps ) {
    return (
        <ResumeSection title="About">
            <ResumeTextBlock size="md">{ description }</ResumeTextBlock>
        </ResumeSection>
    );
}

