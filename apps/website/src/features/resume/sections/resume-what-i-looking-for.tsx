import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeListGrid } from "@inewlegend/website/src/features/resume/sections/elements/resume-list-grid.tsx";

export type ResumeWhatILookingForProps = {
    whatILookingForTitle: string;
    whatILookingForItems: string[];
};

export function ResumeWhatILookingFor( { whatILookingForTitle, whatILookingForItems }: ResumeWhatILookingForProps ) {
    return (
        <ResumeSection title={ whatILookingForTitle }>
            <ResumeListGrid items={ whatILookingForItems } />
        </ResumeSection>
    );
}

