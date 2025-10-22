import { ResumeSection } from "@inewlegend/website/src/features/resume/sections/elements/resume-section.tsx";
import { ResumeTextBlock } from "@inewlegend/website/src/features/resume/sections/elements/resume-text-block.tsx";
import { resumeTheme } from "@inewlegend/website/src/features/resume/resume-theme.ts";

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
            <div className={ resumeTheme.layout.grid.compactSkills }>
                {skills.map((s, idx) => (
                    <div key={idx} className="">
                        <div className={ `${ resumeTheme.text.sizes.xs } ${ resumeTheme.text.weights.medium } ${ resumeTheme.colors.muted } mb-1` }>{s.title}</div>
                        <ResumeTextBlock size="sm" justify={false}>{s.description}</ResumeTextBlock>
                    </div>
                ))}
            </div>
        </ResumeSection>
    );
}

