import { ResumeSectionHeading } from "@inewlegend/website/src/features/resume/resume-section-heading.tsx";

export type ResumeAboutProps = {
    description: string;
};

export function ResumeAbout( { description }: ResumeAboutProps ) {
    return (
        <>
            <ResumeSectionHeading title="About" />
            <p className="text-justify text-[14px]">{ description }</p>
        </>
    );
}

