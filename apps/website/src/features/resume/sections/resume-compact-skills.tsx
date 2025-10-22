import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeTextBlock } from "@inewlegend/website/src/features/resume/sections/elements/resume-text-block.tsx";

export type ResumeCompactSkill = {
    title: string;
    description: string;
};

export type ResumeCompactSkillsProps = {
    skills: ResumeCompactSkill[];
};

export function ResumeCompactSkills({ skills }: ResumeCompactSkillsProps) {
    return (
        <ResumeSection title="Skills">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 pb-2">
                {skills.map((s, idx) => (
                    <div key={idx} className="">
                        <div className="text-xs font-medium text-gray-500 mb-1">{s.title}</div>
                        <ResumeTextBlock size="sm" justify={false}>{s.description}</ResumeTextBlock>
                    </div>
                ))}
            </div>
        </ResumeSection>
    );
}

