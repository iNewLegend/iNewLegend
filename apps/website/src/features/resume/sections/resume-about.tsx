import { ResumeSectionHeading } from "@inewlegend/website/src/features/resume/resume-section-heading.tsx";

export type ResumeAboutProps = {
    description: string;
    whatIDoTitle: string;
    whatIDoItems: string[];
    showAbout: boolean;
};

export function ResumeAbout( { description, whatIDoTitle, whatIDoItems, showAbout }: ResumeAboutProps ) {
    return (
        <div>
            {showAbout && (
                <>
                    <ResumeSectionHeading title="About" />
                    <p className="mb-3 text-justify">{description}</p>
                </>
            )}
            <ResumeSectionHeading title={whatIDoTitle} />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-sm leading-snug text-gray-800 list-none m-0 p-0">
                {whatIDoItems.map( ( item, index ) => (
                    <li key={index} className="break-inside-avoid text-[12px]">{item}.</li>
                ) ) }
            </ul>
        </div>
    );
}

