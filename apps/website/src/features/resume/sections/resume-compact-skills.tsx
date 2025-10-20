import { ResumeSectionHeading } from "@inewlegend/website/src/features/resume/resume-section-heading.tsx";

export type ResumeCompactSkill = {
    title: string;
    description: string;
};

export type ResumeCompactSkillsProps = {
    skills: ResumeCompactSkill[];
};

export function ResumeCompactSkills( { skills }: ResumeCompactSkillsProps ) {
    return (
        <div className="">
            <ResumeSectionHeading title="Skills" />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                { skills.map( ( s, idx ) => (
                    <div key={ idx } className="">
                        <div className="text-xs font-medium text-gray-500 mb-1">{ s.title }</div>
                        <div className="text-gray-800 text-sm">{ s.description }</div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}

