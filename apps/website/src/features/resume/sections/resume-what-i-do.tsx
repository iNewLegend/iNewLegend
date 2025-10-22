import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeListGrid } from "@inewlegend/website/src/features/resume/sections/elements/resume-list-grid.tsx";

export type ResumeWhatIDoProps = {
    whatIDoTitle: string;
    whatIDoItems: string[];
};

export function ResumeWhatIDo( { whatIDoTitle, whatIDoItems }: ResumeWhatIDoProps ) {
    return (
        <ResumeSection title={ whatIDoTitle }>
            <ResumeListGrid items={ whatIDoItems } />
        </ResumeSection>
    );
}

